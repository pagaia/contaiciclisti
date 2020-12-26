import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  buildDataDailyAverage,
  datasetKeyProvider,
  getLastMonthStartEnd,
} from "utility/utilityFunctions";
import PropTypes from "prop-types";
import { DEVICE_FIELDS, REGEX_FIELD, REGEX_DEVICE } from "utility/constants";

const { start: lastMonthStart, end: lastMonthEnd } = getLastMonthStartEnd();

function DailyAverage({ devices }) {
  // initialize dataset with empty array
  const [datasets, setDatasets] = useState(Array(devices.length).fill([]));

  const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const newDatasets = [];

    async function fetchAverage(device, idx) {
      // replace with channelID
      const apiEndPoint =
        DEVICE_FIELDS.replace(
          REGEX_DEVICE,
          device.properties.channelId
        ).replace(REGEX_FIELD, "field3") +
        `?start=${lastMonthStart}&end=${lastMonthEnd}`;

      // fetch data from a url endpoint
      const response = await axios.get(apiEndPoint);
      const { data } = response;

      const builtDataset = buildDataDailyAverage(data.feeds, device);
      newDatasets[idx] = builtDataset;
      return data;
    }

    // fetch data per each device
    devices.map((device, idx) => {
      fetchAverage(device, idx).then(() => {
        setDatasets([...newDatasets]);
      });
    });
  }, []);

  const data = {
    labels,
    datasets: datasets.filter(function (element) {
      return element !== undefined;
    }),
  };

  return (
    <div>
      <h3>Last month</h3>
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
export default DailyAverage;
