import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import DailyTotal from "components/charts/DailyTotal";
import HourlyAverage from "components/charts/HourlyAverage";
import TodayHourly from "components/charts/TodayHourly";
import YesterdayHourly from "components/charts/YesterdayHourly";
import LastCount from "components/charts/LastCount";
import NotFound from "./NotFound";
import PeakCount from "components/charts/PeakCount";
import { useSelector } from "react-redux";

const Device = (props) => {
  let { id } = useParams();
  const { devices: devicesStore } = useSelector((state) => state.devices);

  const device = devicesStore.find(
    (el) => el.properties.channelId === parseInt(id, 10)
  );

  useEffect(() => {
    if (device) {
      const { name } = device.properties;
      document.title = `Portale Sperimentale - ${name} device`;
    }
  }, []);

  if (!device) {
    return <NotFound />;
  }

  const { name } = device.properties;

  return (
    <Fragment>
      <h2>{name}</h2>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <LastCount device={device} />
          <TodayHourly device={device} />
        </div>
        <div className="col-sm-12 col-md-6">
          <YesterdayHourly device={device} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <HourlyAverage device={device} />
        </div>
        <div className="col-md-6">
          <DailyTotal device={device} />
        </div>
        <div className="col-md-6">
          <PeakCount device={device} />
        </div>
      </div>
      <hr className="mb-5 bg-warning" />
    </Fragment>
  );
};

export default Device;
