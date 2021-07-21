import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { DEVICE_URL, REGEX_DEVICE } from 'utility/constants';
import {
    buildDataDaily,
    getLastMonthStartEnd,
    getNextMonth,
    getPreviousMonths,
} from 'utility/utilityFunctions';
import PreviousNext from 'components/forms/PreviousNext';
import SimpleChart from './Chart';

const { start, end } = getLastMonthStartEnd();

function DailyTotal({ device }) {
    const [month, setMonth] = useState({});
    const [search, setSearch] = useState({ start, end });

    const intl = useIntl();
    const chartTitle = intl.formatMessage(
        { id: 'chart.title.last-month-total-day' },
        { start: search.start, end: search.end }
    );

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
            const chart = buildDataDaily(data.feeds, device);
            setMonth(chart);
            return data;
        }
        if (search.start && search.end) {
            fetchDeviceData(search.start, search.end);
        }
    }, [search.start, search.end]);

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
                    <PreviousNext
                        previousAction={handlePreviousMonth}
                        nextAction={handleNextMonth}
                        start={search.start}
                        end={search.end}
                    />
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
