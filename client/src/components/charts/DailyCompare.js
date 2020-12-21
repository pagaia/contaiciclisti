import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  buildDailyCompare,
  datasetKeyProvider,
  getDatesBetweenDates,
} from "utility/utilityFunctions";
import PropTypes from "prop-types";
import { DEVICE_URL, REGEX_DEVICE } from "utility/constants";

function DailyCompare({ devices, startDate, endDate }) {
  // initialize dataset with empty array
  const [datasets, setDatasets] = useState(Array(devices?.length).fill([]));

  const labels = getDatesBetweenDates(startDate, endDate);

  useEffect(() => {
    const newDatasets = [];

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

    // fetch data per each device
    devices.map((device, idx) => {
      fetchData(device, idx).then(() => {
        setDatasets([...newDatasets]);
      });
    });
  }, [devices, startDate, endDate]);

  const data = {
    labels,
    datasets: datasets.filter(function (element) {
      // filter out dataset not defined yet
      return element !== undefined;
    }),
  };

  return (
    <Fragment>
      <h3>
        Counts between {startDate} and {endDate}
      </h3>
      <div className="chart-wrapper">
        <Bar
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true,
          }}
          datasetKeyProvider={datasetKeyProvider}
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
