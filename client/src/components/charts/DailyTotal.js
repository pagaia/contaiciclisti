import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { DEVICE_URL, REGEX_DEVICE } from "utility/constants";
import {
  buildDataDaily, getLastMonthStartEnd,
} from "utility/utilityFunctions";

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
          <Line
            data={month}
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

export default DailyTotal;
