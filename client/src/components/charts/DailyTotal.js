import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { DEVICE_URL, REGEX_DEVICE } from 'utility/constants';
import { buildDataDaily, getLastMonthStartEnd } from 'utility/utilityFunctions';
import SimpleChart from './Chart';

const { start, end } = getLastMonthStartEnd();

function DailyTotal({ device }) {
    const [month, setMonth] = useState({});

    const intl = useIntl();
    const chartTitle = intl.formatMessage(
        { id: 'chart.title.last-month-total-day' },
        { start, end }
    );
    async function fetchDeviceData() {
        // replace with channelID
        const apiEndPoint =
            DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) +
            `&start=${start}&end=${end}`;

        // fetch data from a url endpoint
        const response = await axios.get(apiEndPoint);
        const { data } = response;
        const chart = buildDataDaily(data.feeds, device);
        setMonth(chart);
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
                            <FormattedMessage
                                id="chart.title.last-month-total-day"
                                values={{ start, end }}
                            />
                        </h3>
                    </div>
                    <SimpleChart
                        data={month}
                        name="DailyTotal"
                        title={chartTitle}
                    />
                </div>
            </div>
        </div>
    );
}

export default DailyTotal;
