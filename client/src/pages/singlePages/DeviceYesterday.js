import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import YesterdayHourly from "components/charts/YesterdayHourly";
import NotFound from "../NotFound";
import { SingleContext } from "utility/contexts/MyContext";
import { useSelector } from "react-redux";

const DeviceYesterday = (props) => {
  let { id } = useParams();
  const singleChart = useContext(SingleContext);

  const { devices: devicesStore } = useSelector((state) => state.devices);

  const device = devicesStore.find((el) => el.properties.name === id);

  useEffect(() => {
    if (device && singleChart) {
      const { name } = device.properties;
      document.title = `Portale Sperimentale - ${name} yesterday counts`;
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
          <YesterdayHourly device={device} />
        </div>
      </div>
    </Fragment>
  );
};

export default DeviceYesterday;
