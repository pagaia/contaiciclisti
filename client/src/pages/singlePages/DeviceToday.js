import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import TodayHourly from "components/charts/TodayHourly";
import NotFound from "../NotFound";
import { SingleContext } from "utility/contexts/MyContext";
import { useSelector } from "react-redux";

const DeviceToday = (props) => {
  let { id } = useParams();
  const singleChart = useContext(SingleContext);
  const { devices: devicesStore } = useSelector((state) => state.devices);

  const device = devicesStore.find((el) => el.properties.name === id);

  useEffect(() => {
    if (device && singleChart) {
      const { name } = device.properties;
      document.title = `Portale Sperimentale - ${name} today counts`;
    }
  }, []);

  if (!device) {
    return <NotFound />;
  }

  return (
    <Fragment>
      {!singleChart && <h2>{device.properties.name}</h2>}
      <div className="row">
        <div className="col-sm-12">
          <TodayHourly device={device} />
        </div>
      </div>
      {!singleChart && <hr className="mb-5 bg-warning" />}
    </Fragment>
  );
};

export default DeviceToday;
