import axios from "axios";
import { useEffect, useState } from "react";
import { DEVICE_URL, REGEX_DEVICE } from "utility/constants";
import { buildDataDaily, getLastMonthStartEnd } from "utility/utilityFunctions";
import SimpleChart from "./Chart";

const { start: lastMonthStart, end: lastMonthEnd } = getLastMonthStartEnd();

function DailyTotal({ device }) {
  const [month, setMonth] = useState({});

  async function fetchDeviceData() {
    // replace with channelID
    const apiEndPoint =
      DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) +
      `&start=${lastMonthStart}&end=${lastMonthEnd}`;

    // fetch data from a url endpoint
    const response = await axios.get(apiEndPoint);
    const { data } = response;
    const chart = buildDataDaily(data.feeds, device);
    setMonth(chart);
    return data;
  }

  useEffect(() => {
    fetchDeviceData();
  }, []);

  return (
    <div className="row">
      <div className="col-sm">
        <div className="chart-wrapper">
          <h3 className="d-inline">Last month</h3>
          <span className="text-muted">
            <small> - total per day </small>
          </span>
          <SimpleChart data={month} name="DailyTotal" />
        </div>
      </div>
    </div>
  );
}

export default DailyTotal;
