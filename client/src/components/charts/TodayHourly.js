import axios from 'axios';
import { OpenNewWindow } from 'components/OpenNewWindow';
import { ROUTES } from 'config/routing/routes';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { DEVICE_URL, REGEX_DEVICE } from 'utility/constants';
import { buildDataHourly } from 'utility/utilityFunctions';
import SimpleChart from './Chart';

function TodayHourly({ device, singleChart }) {
    const [data, setData] = useState({});
    const today = new Date().toISOString().split('T')[0];

    const intl = useIntl();
    const chartTitle = intl.formatMessage({ id: 'title.hourly-counts-today' }, { today });

    async function fetchDeviceData() {
        // replace with channelID
        const apiEndPoint =
            DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) + `&start=${today}`;

        // fetch data from a url endpoint
        const response = await axios.get(apiEndPoint);
        const { data } = response;
        const chart = buildDataHourly(data.feeds, device);
        setData(chart);
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
                            <FormattedMessage id="title.hourly-counts-today" />
                        </h3>
                    </div>
                    <SimpleChart data={data} name="TodayHourly" title={chartTitle} />

                    <OpenNewWindow
                        singleChart={singleChart}
                        url={ROUTES.DEVICE_TODAY}
                        id={device?.properties?.channelId}
                    />
                </div>
            </div>
        </div>
    );
}

export default TodayHourly;
