import axios from 'axios';
import React, { useEffect } from 'react';
import { buildDataDailyAverage, deepEqual } from 'utility/utilityFunctions';
import PropTypes from 'prop-types';
import { DEVICE_FIELDS, REGEX_FIELD, REGEX_DEVICE } from 'utility/constants';
import SimpleChart from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { receiveDailyAverage, selectDailyAverage } from 'store/chartsSlide';
import { FormattedMessage, useIntl } from 'react-intl';
import usePrevious from 'hooks/usePrevious';

function DailyAverage({ search }) {
    const dailyAverage = useSelector(selectDailyAverage);

    const prevSearch = usePrevious(search);

    const devices = Object.values(search.devices);
    const { startDate, endDate } = search;

    const intl = useIntl();
    const chartTitle = intl.formatMessage(
        { id: 'chart.title.last-month' },
        { start: startDate, end: endDate }
    );

    const dispatch = useDispatch();

    const labels = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    useEffect(() => {
        const newDatasets = [];

        async function fetchAverage(device, idx) {
            // replace with channelID
            const apiEndPoint =
                DEVICE_FIELDS.replace(
                    REGEX_DEVICE,
                    device.properties.channelId
                ).replace(REGEX_FIELD, '3') +
                `?start=${startDate}&end=${endDate}`;

            // fetch data from a url endpoint
            const response = await axios.get(apiEndPoint);
            const { data } = response;

            const builtDataset = buildDataDailyAverage(data.feeds, device);
            newDatasets[idx] = builtDataset;

            return builtDataset;
        }

        if (search && !deepEqual(search, prevSearch)) {
            // initialize the array for all chart lines
            dispatch(receiveDailyAverage(Array(devices.length).fill(null)));

            // fetch data per each device
            devices.map((device, idx) => {
                fetchAverage(device, idx).then((data) => {
                    dispatch(receiveDailyAverage([...newDatasets]));
                });
            });
        }
    }, [search, prevSearch]);

    const data = {
        labels,
        datasets: JSON.parse(
            JSON.stringify(dailyAverage.filter((element) => element))
        ),
    };

    if (!devices?.length) {
        return null;
    }

    return (
        <div>
            <div className="sr-only">
                <h3>
                    <FormattedMessage id="chart.last-month" />
                </h3>
                <span className="text-muted">
                    <small>
                        &nbsp;({startDate} - {endDate})
                    </small>
                </span>
            </div>
            <div className="chart-wrapper">
                <SimpleChart
                    data={data}
                    name="DailyAverage"
                    title={chartTitle}
                />
            </div>
        </div>
    );
}

DailyAverage.propTypes = {
    device: PropTypes.shape({
        name: PropTypes.string,
        channelId: PropTypes.number,
        bgColor: PropTypes.string,
        borderColor: PropTypes.string,
    }),
};
export default React.memo(DailyAverage);
