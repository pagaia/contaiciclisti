import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import HourlyAverage from "components/charts/HourlyAverage";
import { DEVICES } from "utility/constants";
import NotFound from "../NotFound";
import { SingleContext } from "utility/contexts/MyContext";

const DeviceAverage = ( props) => {
  let { id } = useParams();
  const singleChart = useContext(SingleContext);

  const device = DEVICES.find((el) => el.properties.name === id);

  useEffect(() => {
    if (device && singleChart) {
      const { name } = device.properties;
      document.title = `CiCO - Il Conta i Ciclisti Ostinati - ${name} Average counts`;
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
          <HourlyAverage device={device} />
        </div>
      </div>
      {!singleChart && <hr className="mb-5 bg-warning" />}
    </Fragment>
  );
};

export default DeviceAverage;
