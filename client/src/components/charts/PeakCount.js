import axios from 'axios';
import Loading from 'components/Loading';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { DEVICE_URL, REGEX_DEVICE } from 'utility/constants';
import {
    buildPeakTime,
    getDatesBetweenDates,
    getLastMonthStartEnd,
    getNextMonth,
    getPreviousMonths,
    replaceWeekendDays,
} from 'utility/utilityFunctions';
import PreviousNext from 'components/forms/PreviousNext';
import SimpleChart from './Chart';

const { start, end } = getLastMonthStartEnd();

function PeakCount({ device }) {
    // initialize dataset with empty object
    const [datasets, setDatasets] = useState([]);
    const [search, setSearch] = useState({ start, end });

    const chartRef = useRef(null);
    const chartName = `chart-peak-time`;

    const intl = useIntl();
    const chartTitle = intl.formatMessage(
        { id: 'chart.title.peak-time' },
        { start: search.start, end: search.end }
    );
    const labels = getDatesBetweenDates(search.start, search.end);

    const handlePreviousMonth = () => {
        setSearch(getPreviousMonths(new Date(search.start)));
    };

    const handleNextMonth = () => {
        setSearch(getNextMonth(new Date(search.start)));
    };

    useEffect(() => {
        async function fetchDeviceData(start, end) {
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
        if (search.start && search.end) {
            fetchDeviceData(search.start, search.end);
        }
    }, [search.start, search.end]);

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
                        <h3 className="d-inline">
                            <FormattedMessage id="chart.title.peak-time" />
                        </h3>
                    </div>
                    <PreviousNext
                        previousAction={handlePreviousMonth}
                        nextAction={handleNextMonth}
                        start={search.start}
                        end={search.end}
                    />
                    <SimpleChart
                        data={data}
                        name="peak-count"
                        doubleAxes
                        title={chartTitle}
                    />
                </div>
            </div>
        </div>
    );
}

export default PeakCount;
