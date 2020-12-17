import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import DailyTotal from "../components/charts/DailyTotal";
import HourlyAverage from "../components/charts/HourlyAverage";
import LastCount from "../components/charts/LastCount";
import YesterdayHourly from "../components/charts/YesterdayHourly";
import { devices } from "../utility/constants";

const Device = (props) => {
  let { id } = useParams();

  const device = devices.find((el) => el.properties.name === id);

  if (!device) {
    return null;
  }

  return (
    <Fragment key={device.properties.name}>
      <h2>{device.properties.name}</h2>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <YesterdayHourly device={device} />
        </div>
        <div className="col-sm-12 col-md-6">
          <LastCount device={device} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <HourlyAverage device={device} />
        </div>
        <div className="col-md-6">
          <DailyTotal device={device} />
        </div>
      </div>
      <hr className="mb-5 bg-warning" />
    </Fragment>
  );
};

export default Device;
