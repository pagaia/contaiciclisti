import axios from 'axios';
import { Fragment, useEffect } from 'react';
import {
    buildHourlyCompare,
    deepEqual,
    formatDate,
} from 'utility/utilityFunctions';
import PropTypes from 'prop-types';
import { DEVICE_URL, REGEX_DEVICE } from 'utility/constants';
import { format } from 'date-fns';
import SimpleChart from './Chart';
import { useSelector, useDispatch } from 'react-redux';
import { selectHourlyCompare, receiveHourlyCompare } from 'store/chartsSlide';
import { FormattedMessage, useIntl } from 'react-intl';

function HourlyCompare({ search }) {
    const hourlyCompareState = useSelector(selectHourlyCompare);
    const dispatch = useDispatch();

    const devices = Object.values(search.devices);
    const { day } = search;

    const simpleSearch = {
        devices: devices.map((device) => device.properties.channelId),
        day: format(day, 'yyyy-MM-dd'),
    };

    const intl = useIntl();
    const chartTitle = intl.formatMessage(
        { id: 'chart.title.counts-on-day' },
        { day: formatDate(day) }
    );

    // label for day hours
    const labels = [...Array(24).keys()];

    useEffect(() => {
        const newDatasets = [];

        if (day) {
            const start = format(day, 'yyyy-MM-dd');
            const end = format(day, 'yyyy-MM-dd 23:59');

            async function fetchData(device, idx) {
                // replace with channelID
                const apiEndPoint =
                    DEVICE_URL.replace(
                        REGEX_DEVICE,
                        device.properties.channelId
                    ) + `&start=${start}&end=${end}`;

                // fetch data from a url endpoint
                const response = await axios.get(apiEndPoint);
                const { data } = response;

                const builtDataset = buildHourlyCompare(
                    data.feeds,
                    device,
                    labels
                );
                newDatasets[idx] = builtDataset;
                return data;
            }

            // fetch data if not loaded yet
            if (
                !hourlyCompareState ||
                !hourlyCompareState.results ||
                !deepEqual(hourlyCompareState.search, simpleSearch)
            ) {
                // initialize the array for all chart lines
                dispatch(
                    receiveHourlyCompare({
                        search: simpleSearch,
                        results: Array(devices.length).fill(null),
                    })
                );

                // fetch data per each device
                devices.map((device, idx) => {
                    fetchData(device, idx).then(() => {
                        dispatch(
                            receiveHourlyCompare({
                                search: simpleSearch,
                                results: [...newDatasets],
                            })
                        );
                    });
                });
            }
        }
    }, [search]);

    const datasets = hourlyCompareState?.results
        ? JSON.parse(
              JSON.stringify(
                  hourlyCompareState.results.filter((element) => element)
              )
          )
        : [];
    const data = {
        labels,
        datasets,
    };

    return (
        <Fragment>
            <div className="sr-only">
                <h3>
                    <FormattedMessage
                        id="chart.title.counts-on-day"
                        values={{ day: formatDate(day) }}
                    />
                </h3>
            </div>
            <div className="chart-wrapper">
                <SimpleChart
                    data={data}
                    name="HourlyCompare"
                    title={chartTitle}
                />
            </div>
        </Fragment>
    );
}

HourlyCompare.propTypes = {
    device: PropTypes.shape({
        name: PropTypes.string,
        channelId: PropTypes.number,
        bgColor: PropTypes.string,
        borderColor: PropTypes.string,
    }),
    day: PropTypes.instanceOf(Date),
};
export default HourlyCompare;
