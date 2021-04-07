import axios from 'axios';
import React, { useEffect } from 'react';
import {
    buildDataDailyAverage,
    getLastMonthStartEnd,
} from 'utility/utilityFunctions';
import PropTypes from 'prop-types';
import { DEVICE_FIELDS, REGEX_FIELD, REGEX_DEVICE } from 'utility/constants';
import SimpleChart from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { receiveDailyAverage, selectDailyAverage } from 'store/chartsSlide';
import { selectDevices } from 'store/devicesSlide';
import { FormattedMessage } from 'react-intl';

const { start, end } = getLastMonthStartEnd();

function DailyAverage(props) {
    const dailyAverage = useSelector(selectDailyAverage);
    const devices = useSelector(selectDevices);

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
                ).replace(REGEX_FIELD, '3') + `?start=${start}&end=${end}`;

            // fetch data from a url endpoint
            const response = await axios.get(apiEndPoint);
            const { data } = response;

            const builtDataset = buildDataDailyAverage(data.feeds, device);
            newDatasets[idx] = builtDataset;

            return builtDataset;
        }

        if (!dailyAverage?.length && devices?.length) {
            // initialize the array for all chart lines
            dispatch(receiveDailyAverage(Array(devices.length).fill(null)));

            // fetch data per each device
            devices.map((device, idx) => {
                fetchAverage(device, idx).then((data) => {
                    dispatch(receiveDailyAverage([...newDatasets]));
                });
            });
        }
    }, [devices]);

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
                        &nbsp;({start} - {end})
                    </small>
                </span>
            </div>
            <div className="chart-wrapper">
                <SimpleChart
                    data={data}
                    name="DailyAverage"
                    title={`Last month - (${start} - ${end})`}
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
