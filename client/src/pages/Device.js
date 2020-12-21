import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import DailyTotal from "../components/charts/DailyTotal";
import HourlyAverage from "../components/charts/HourlyAverage";
import TodayHourly from "../components/charts/TodayHourly";
import YesterdayHourly from "../components/charts/YesterdayHourly";
import LastCount from "../components/charts/LastCount";
import { DEVICES } from "../utility/constants";
import NotFound from "./NotFound";

const Device = (props) => {
  let { id } = useParams();

  const device = DEVICES.find((el) => el.properties.name === id);

  if (!device) {
    return <NotFound />;
  }

  return (
    <Fragment>
      <h2>{device.properties.name}</h2>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <YesterdayHourly device={device} />
        </div>
        <div className="col-sm-12 col-md-6">
          <LastCount device={device} />
          <TodayHourly device={device} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          {/* <TodayHourly device={device} /> */}
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
