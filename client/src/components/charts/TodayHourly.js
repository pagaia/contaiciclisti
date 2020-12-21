import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { DEVICE_URL, REGEX_DEVICE } from "utility/constants";
import {
  buildDataHourly,
} from "utility/utilityFunctions";


function TodayHourly({ device }) {
  const [data, setData] = useState({});

  async function fetchDeviceData() {
    const today = new Date().toISOString().split("T")[0];

    // replace with channelID
    const apiEndPoint =
      DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) +
      `&start=${today}`;

    // fetch data from a url endpoint
    const response = await axios.get(apiEndPoint);
    const { data } = response;
    const chart = buildDataHourly(data.feeds, device);
    setData(chart);
    return data;
  }

  useEffect(() => {
    fetchDeviceData();
  }, []);

  return (
    <div className="row">
      <div className="col-sm">
        <div className="chart-wrapper">
          <h3 className="d-inline"> Hourly counts</h3>
          <span className="text-muted">
            <small> - today</small>
          </span>
          <Bar
            data={data}
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

export default TodayHourly;
