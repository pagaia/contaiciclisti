import axios from "axios";
import { Fragment, useEffect } from "react";
import {
  buildDailyCompare,
  getDatesBetweenDates,
  replaceWeekendDays,
  deepEqual,
  buildDailyTevereLevel,
} from "utility/utilityFunctions";
import PropTypes from "prop-types";
import { DEVICE_URL, REGEX_DEVICE } from "utility/constants";
import SimpleChart from "./Chart";
import { useDispatch, useSelector } from "react-redux";
import { receiveDailyCompare, selectDailyCompare } from "store/chartsSlide";
import { readRipettaLevel } from "utility/googleSheet";

function DailyCompare({ search, name }) {
  const dailyCompare = useSelector(selectDailyCompare);
  const dispatch = useDispatch();

  const devices = Object.values(search.devices);
  const { startDate, endDate } = search;
  const newDatasets = [];

  const labels = getDatesBetweenDates(startDate, endDate);

  // create an object with just list of channelId and start/end date
  const simpleSearch = {
    startDate: search.startDate,
    endDate: search.endDate,
    devices: devices.map((device) => device.properties.channelId),
  };

  useEffect(() => {
    async function fetchTevereLevel() {
      const response = await readRipettaLevel();
      const ripettaLevel = buildDailyTevereLevel(response, labels);
      newDatasets[devices.length + 1] = ripettaLevel;
    }
    fetchTevereLevel().then(() => {
      dispatch(
        receiveDailyCompare({
          name: [name],
          [name]: {
            search: simpleSearch,
            results: [...newDatasets],
          },
        })
      );
    });
  }, []);

  useEffect(() => {
    async function fetchData(device, idx) {
      // replace with channelID
      const apiEndPoint =
        DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) +
        `&start=${startDate}&end=${endDate}`;

      // fetch data from a url endpoint
      const response = await axios.get(apiEndPoint);
      const { data } = response;

      const builtDataset = buildDailyCompare(data.feeds, device, labels);
      newDatasets[idx] = builtDataset;

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
            results: Array(devices.length + 1).fill(null),
          },
        })
      );

      // fetch data per each device
      devices.map((device, idx) => {
        fetchData(device, idx).then(() => {
          dispatch(
            receiveDailyCompare({
              name: [name],
              [name]: {
                search: simpleSearch,
                results: [...newDatasets],
              },
            })
          );
        });
      });
    }
  }, [search]);

  const datasets = dailyCompare[name]?.results
    ? JSON.parse(
        JSON.stringify(dailyCompare[name].results.filter((element) => element))
      )
    : [];

  const data = {
    labels: replaceWeekendDays(labels),
    datasets,
  };

  return (
    <Fragment>
      <div className="sr-only">
        <h3>
          Counts between {startDate} and {endDate}
        </h3>
      </div>
      <div className="chart-wrapper">
        <SimpleChart
          data={data}
          name={name}
          doubleAxes
          title={`Counts between ${startDate} and ${endDate.substring(0, 10)}`}
        />
      </div>
    </Fragment>
  );
}

DailyCompare.propTypes = {
  device: PropTypes.shape({
    name: PropTypes.string,
    channelId: PropTypes.number,
    bgColor: PropTypes.string,
    borderColor: PropTypes.string,
  }),
};
export default DailyCompare;
