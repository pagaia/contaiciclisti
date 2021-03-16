import axios from 'axios';
import { useEffect, useState } from 'react';
import { DEVICE_URL, REGEX_DEVICE } from 'utility/constants';
import {
    buildHourlyAverage,
    getLastMonthStartEnd,
} from 'utility/utilityFunctions';
import SimpleChart from './Chart';

const { start, end } = getLastMonthStartEnd();

function HourlyAverage({ device }) {
    // initialize dataset with empty object
    const [datasets, setDatasets] = useState({});

    async function fetchDeviceData() {
        // replace with channelID
        const apiEndPoint =
            DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) +
            `&start=${start}&end=${end}`;

        // fetch data from a url endpoint
        const response = await axios.get(apiEndPoint);
        const { data } = response;
        const builtDataset = buildHourlyAverage(data.feeds, device);
        setDatasets(builtDataset);
    }

    useEffect(() => {
        fetchDeviceData();
    }, []);

    if (!datasets.datasets) {
        return null;
    }
    return (
        <div className="row">
            <div className="col-sm">
                <div className="chart-wrapper">
                    <div className="sr-only">
                        <h3 className="d-inline">Last month</h3>
                        <span className="text-muted">
                            <small>
                                ({start} - {end})
                            </small>
                            <small> - hourly average</small>
                        </span>
                    </div>
                    <SimpleChart
                        data={datasets}
                        name="HourlyAverage"
                        title={`Last month  (${start} - ${end}) - hourly average`}
                    />
                </div>
            </div>
        </div>
    );
}

export default HourlyAverage;
