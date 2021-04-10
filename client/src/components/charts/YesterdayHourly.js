import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { DEVICE_URL, REGEX_DEVICE } from 'utility/constants';
import {
    buildDataHourly,
    getYesterdayStartEnd,
} from 'utility/utilityFunctions';
import SimpleChart from './Chart';

const { start: yesterdayStart, end: yesterdayEnd } = getYesterdayStartEnd();

function YesterdayHourly({ device }) {
    const [yesterday, setYesterday] = useState({});

    const intl = useIntl();
    const chartTitle = intl.formatMessage({
        id: 'title.hourly-counts-yesterday',
    });

    async function fetchDeviceData() {
        // replace with channelID
        const apiEndPoint =
            DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) +
            `&start=${yesterdayStart}&end=${yesterdayEnd}`;

        // fetch data from a url endpoint
        const response = await axios.get(apiEndPoint);
        const { data } = response;
        const chart = buildDataHourly(data.feeds, device);
        setYesterday(chart);
        return data;
    }

    useEffect(() => {
        fetchDeviceData();
    }, []);

    return (
        <div className="row">
            <div className="col-sm">
                <div className="chart-wrapper">
                    <div className="sr-only">
                        <h3 className="d-inline">
                            <FormattedMessage id="title.hourly-counts-yesterday" />
                        </h3>
                    </div>
                    <SimpleChart
                        data={yesterday}
                        name="YesterdayHourly"
                        title={chartTitle}
                    />
                </div>
            </div>
        </div>
    );
}

export default YesterdayHourly;
