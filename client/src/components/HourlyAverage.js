import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { REGEX_DEVICE } from "../utility/constants";
import {
  buildHourlyAverage,
  getLastMonthStartEnd,
} from "../utility/utilityFunctions";

const deviceUrl = "https://api.thingspeak.com/channels/DEVICE/feeds.json";

const { start, end } = getLastMonthStartEnd();

function HourlyAverage({ device }) {
  // initialize dataset with empty array
  const [datasets, setDatasets] = useState({});

  async function fetchDeviceData() {
    // replace with channelID
    const apiEndPoint =
      deviceUrl.replace(REGEX_DEVICE, device.properties.channelId) +
      `?start=${start}&end=${end}`;

    // fetch data from a url endpoint
    const response = await axios.get(apiEndPoint);
    const { data } = response;
    const builtDataset = buildHourlyAverage(data.feeds, device);
    setDatasets(builtDataset);
  }

  useEffect(() => {
    fetchDeviceData();
  }, []);

  if (!datasets.datasets) {
    return null;
  }
  return (
    <div className="row">
      <div className="col-sm">
        <div className="chart-wrapper">
          <Bar
            data={datasets}
            width={100}
            height={50}
            options={{
              maintainAspectRatio: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HourlyAverage;
