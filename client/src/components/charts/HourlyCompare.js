import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import {
  buildHourlyCompare,
} from "utility/utilityFunctions";
import PropTypes from "prop-types";
import { DEVICE_URL, REGEX_DEVICE } from "utility/constants";
import { format } from "date-fns";
import SimpleChart from "./Chart";

function HourlyCompare({ devices, day }) {
  // initialize dataset with empty array
  const [datasets, setDatasets] = useState(Array(devices?.length).fill([]));

  // label for day hours
  const labels = [...Array(24).keys()];

  useEffect(() => {
    const newDatasets = [];

    if (day) {
      const start = format(day, "yyyy-MM-dd 00:00:00");
      const end = format(day, "yyyy-MM-dd 23:59:00");

      async function fetchData(device, idx) {
        // replace with channelID
        const apiEndPoint =
          DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) +
          `&start=${start}&end=${end}`;

        // fetch data from a url endpoint
        const response = await axios.get(apiEndPoint);
        const { data } = response;

        const builtDataset = buildHourlyCompare(data.feeds, device, labels);
        newDatasets[idx] = builtDataset;
        return data;
      }

      // fetch data per each device
      devices.map((device, idx) => {
        fetchData(device, idx).then(() => {
          setDatasets([...newDatasets]);
        });
      });
    }
  }, [devices, day]);

  const data = {
    labels,
    datasets: datasets.filter(function (element) {
      // filter out dataset not defined yet
      return element !== undefined;
    }),
  };

  return (
    <Fragment>
      <h3>Counts on {format(day, "yyyy-MM-dd")}</h3>
      <div className="chart-wrapper">
        <SimpleChart data={data} name="HourlyCompare"/>
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
