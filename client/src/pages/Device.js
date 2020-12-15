import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import HourlyAverage from "../components/HourlyAverage";
import LastCount from "../components/LastCount";
import YesterdayHourly from "../components/YesterdayHourly";
import { devices } from "../utility/constants";

const Device = (props) => {
  let { id } = useParams();

  const device = devices.find((el) => el.properties.name === id);

  if (!device) {
    return null;
  }

  return (
    <Fragment key={device.properties.name}>
      <h2>Hourly counts</h2>
      <h3 className="d-inline">{device.properties.name}</h3>
      <span className="text-muted">
        <small> - yesterday</small>
      </span>

      <div className="row">
        <div className="col-sm-12 col-md-6">
          <YesterdayHourly device={device} />
        </div>
        <div className="col-sm-12 col-md-6">
          <LastCount device={device} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <HourlyAverage device={device} />
        </div>
      </div>
      <hr className="mb-5 bg-warning" />
    </Fragment>
  );
};

export default Device;
