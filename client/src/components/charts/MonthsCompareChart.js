import axios from 'axios';
import { useLanguage } from 'hooks/useLanguage';
import PropTypes from 'prop-types';
import { Fragment, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { receiveDailyCompare, selectDailyCompare } from 'store/chartsSlide';
import { DEVICE_URL, REGEX_DEVICE } from 'utility/constants';
import { buildDailyMonthsCompare, deepEqual, replaceWeekendDays } from 'utility/utilityFunctions';
import SimpleChart from './Chart';

function MonthsCompareChart({ search, name }) {
    const dailyCompare = useSelector(selectDailyCompare);
    const dispatch = useDispatch();
    const [lang] = useLanguage();

    const { startDate, endDate, device } = search;

    const intl = useIntl();
    const chartTitle = intl.formatMessage(
        { id: 'chart.title.counts-between' },
        { startDate, endDate: endDate.substring(0, 10) }
    );

    let newDatasets = [];

    const labels = [...Array(31).keys()];

    // create an object with just list of channelId and start/end date
    const simpleSearch = {
        startDate,
        endDate,
        device,
    };

    useEffect(() => {
        async function fetchData(device, idx) {
            // replace with channelID
            const apiEndPoint =
                DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) +
                `&start=${startDate}&end=${endDate}`;

            // fetch data from a url endpoint
            const response = await axios.get(apiEndPoint);
            const { data } = response;

            const builtDataset = buildDailyMonthsCompare(data.feeds, labels, lang);
            newDatasets = builtDataset;
            return data;
        }

        // fetch data if not loaded yet
        if (
            !dailyCompare[name] ||
            !deepEqual(dailyCompare[name].search, simpleSearch) ||
            !dailyCompare[name].results
        ) {
            // initialize the array for all chart lines
            dispatch(
                receiveDailyCompare({
                    name: [name],
                    [name]: {
                        search: simpleSearch,
                        results: null,
                    },
                })
            );

            fetchData(device).then(() => {
                dispatch(
                    receiveDailyCompare({
                        name: [name],
                        [name]: {
                            search: simpleSearch,
                            results: newDatasets,
                        },
                    })
                );
            });
        }
    }, [search]);

    const datasets = dailyCompare[name]?.results
        ? JSON.parse(JSON.stringify(dailyCompare[name].results))
        : [];

    const data = {
        labels: replaceWeekendDays(labels),
        datasets,
    };

    return (
        <Fragment>
            <div className="sr-only">
                <h3>
                    <FormattedMessage
                        id="chart.title.counts-between"
                        values={{ startDate, endDate }}
                    />
                </h3>
            </div>
            <div className="chart-wrapper">
                <SimpleChart data={data} name={name} title={chartTitle} />
            </div>
        </Fragment>
    );
}

MonthsCompareChart.propTypes = {
    search: PropTypes.shape({
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        device: PropTypes.object,
    }),
    name: PropTypes.string,
};
export default MonthsCompareChart;
