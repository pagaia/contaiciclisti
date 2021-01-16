import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import DailyTotal from "components/charts/DailyTotal";
import NotFound from "../NotFound";
import { SingleContext } from "utility/contexts/MyContext";
import { useSelector } from "react-redux";

const DeviceTotalDay = (props) => {
  let { id } = useParams();

  const singleChart = useContext(SingleContext);
  const { devices: devicesStore } = useSelector((state) => state.devices);

  const device = devicesStore.find((el) => el.properties.name === id);

  useEffect(() => {
    if (device && singleChart) {
      const { name } = device.properties;
      document.title = `Portale Sperimentale - ${name} total counts last month`;
    }
  }, []);

  if (!device) {
    return <NotFound />;
  }

  return (
    <Fragment>
      {!singleChart && <h2>{device.properties.name}</h2>}
      <div className="row">
        <div className="col-md-12">
          <DailyTotal device={device} />
        </div>
      </div>
      {!singleChart && <hr className="mb-5 bg-warning" />}
    </Fragment>
  );
};

export default DeviceTotalDay;
