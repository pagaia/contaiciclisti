import axios from "axios";
import { useEffect, useState } from "react";
import { DEVICE_URL, REGEX_DEVICE } from "utility/constants";
import {
  buildDataHourly,
  getYesterdayStartEnd,
} from "utility/utilityFunctions";
import SimpleChart from "./Chart";

const { start: yesterdayStart, end: yesterdayEnd } = getYesterdayStartEnd();

function YesterdayHourly({ device }) {
  const [yesterday, setYesterday] = useState({});

  async function fetchDeviceData() {
    // replace with channelID
    const apiEndPoint =
      DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) +
      `&start=${yesterdayStart}&end=${yesterdayEnd}`;

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
          <div className="sr-only">
            <h3 className="d-inline"> Hourly counts</h3>
            <span className="text-muted">
              <small> - yesterday</small>
            </span>
          </div>
          <SimpleChart
            data={yesterday}
            name="YesterdayHourly"
            title="Hourly counts - yesterday"
          />
        </div>
      </div>
    </div>
  );
}

export default YesterdayHourly;
