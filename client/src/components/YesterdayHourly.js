import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { REGEX_DEVICE } from "../utility/constants";
import {
  buildDataHourly,
  getYesterdayStartEnd,
} from "../utility/utilityFunctions";

const deviceUrl = "https://api.thingspeak.com/channels/DEVICE/feeds.json";

const { start: yesterdayStart, end: yesterdayEnd } = getYesterdayStartEnd();

function YesterdayHourly({ device }) {
  const [yesterday, setYesterday] = useState({});

  async function fetchDeviceData() {
    // replace with channelID
    const apiEndPoint =
      deviceUrl.replace(REGEX_DEVICE, device.properties.channelId) +
      `?start=${yesterdayStart}&end=${yesterdayEnd}`;

    // fetch data from a url endpoint
    const response = await axios.get(apiEndPoint);
    const { data } = response;
    const chart = buildDataHourly(data.feeds, device);
    setYesterday(chart);
    return data;
  }

  useEffect(() => {
    fetchDeviceData();
  }, []);

  return (
    <div className="row">
      <div className="col-sm">
        <div className="chart-wrapper">
          <Bar
            data={yesterday}
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

export default YesterdayHourly;
