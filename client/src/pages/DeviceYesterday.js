import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import YesterdayHourly from "components/charts/YesterdayHourly";
import { DEVICES } from "utility/constants";
import NotFound from "./NotFound";

const DeviceYesterday = (props) => {
  let { id } = useParams();

  const device = DEVICES.find((el) => el.properties.name === id);

  useEffect(() => {
    if (device) {
      const { name } = device.properties;
      document.title = `CiCO - Il Conta i Ciclisti Ostinati - ${name} yesterday counts`;
    }
  }, []);
  
  if (!device) {
    return <NotFound />;
  }

  return (
    <Fragment>
      <h2>{device.properties.name}</h2>
      <div className="row">
        <div className="col-sm-12">
          <YesterdayHourly device={device} />
        </div>
      </div>
    </Fragment>
  );
};

export default DeviceYesterday;
