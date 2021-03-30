import axios from 'axios';
import Loading from 'components/Loading';
import { useEffect, useRef, useState } from 'react';
import { DEVICE_URL, REGEX_DEVICE } from 'utility/constants';
import {
    buildPeakTime,
    getDatesBetweenDates,
    getLastMonthStartEnd,
    replaceWeekendDays,
} from 'utility/utilityFunctions';
import SimpleChart from './Chart';

const { start, end } = getLastMonthStartEnd();

function PeakCount({ device }) {
    // initialize dataset with empty object
    const [datasets, setDatasets] = useState([]);

    const chartRef = useRef(null);
    const chartName = `chart-peak-time`;

    const labels = getDatesBetweenDates(start, end);

    async function fetchDeviceData() {
        // replace with channelID
        const apiEndPoint =
            DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) +
            `&start=${start}&end=${end}`;

        // fetch data from a url endpoint
        const response = await axios.get(apiEndPoint);
        const { data } = response;
        const builtDataset = buildPeakTime(data.feeds, labels);
        setDatasets(builtDataset);
    }

    useEffect(() => {
        fetchDeviceData();
    }, []);

    if (!datasets) {
        return <Loading />;
    }

    const data = {
        datasets,
        labels: replaceWeekendDays(labels),
    };

    const options = {
        maintainAspectRatio: true,
        scales: {
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnArea: false,
                    },
                },
            ],
        },
    };

    return (
        <div className="row">
            <div className="col-sm">
                <div className="chart-wrapper">
                    <div className="sr-only">
                        <h3 className="d-inline">Peak time</h3>
                        <span className="text-muted">
                            <small>
                                ({start} - {end})
                            </small>
                        </span>
                    </div>
                    <SimpleChart
                        data={data}
                        name="peak-count"
                        doubleAxes
                        title={`Peak time (${start} - ${end})`}
                    />
                </div>
            </div>
        </div>
    );
}

export default PeakCount;