import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchHourlyAverageCounts,
    selectDeviceHourlyAverage
} from 'store/chartsSlide';
import {
    getLastMonthStartEnd,
    getNextMonth,
    getPreviousMonth
} from 'utility/utilityFunctions';
import PreviousNext from '../forms/PreviousNext';
import SimpleChart from './Chart';

const { start, end } = getLastMonthStartEnd();

function HourlyAverage({ device }) {
    const [search, setSearch] = useState({ start, end });

    const dispatch = useDispatch();
    const channelId = device.properties.channelId;

    const hourlyAverage = useSelector(selectDeviceHourlyAverage(channelId));

    const intl = useIntl();
    const chartTitle = intl.formatMessage(
        { id: 'chart.title.last-month-hourly-average' },
        { start: search.start, end: search.end }
    );

    useEffect(() => {
        if (device && search.start && search.end) {
            dispatch(
                fetchHourlyAverageCounts({
                    device,
                    start: search.start,
                    end: search.end,
                })
            );
        }
    }, [device, search.start, search.end]);

    if (!hourlyAverage) {
        return null;
    }

    const handlePreviousMonth = () => {
        setSearch(getPreviousMonth(new Date(search.start)));
    };

    const handleNextMonth = () => {
        setSearch(getNextMonth(new Date(search.start)));
    };

    // create a new object to be override by the chartJs
    const chartData = JSON.parse(JSON.stringify(hourlyAverage));

    return (
        <div className="row">
            <div className="col-sm">
                <div className="chart-wrapper">
                    <div className="sr-only">
                        <h3 className="d-inline">
                            <FormattedMessage id="chart.title.last-month-hourly-average" />
                        </h3>
                    </div>
                    <PreviousNext
                        previousAction={handlePreviousMonth}
                        nextAction={handleNextMonth}
                        start={search.start}
                        end={search.end}
                    />
                    <SimpleChart
                        data={chartData}
                        name="HourlyAverage"
                        title={chartTitle}
                    />
                </div>
            </div>
        </div>
    );
}

export default HourlyAverage;
