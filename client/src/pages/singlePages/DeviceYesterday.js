import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import YesterdayHourly from "components/charts/YesterdayHourly";
import NotFound from "../NotFound";
import { SingleContext } from "utility/contexts/MyContext";
import { useSelector } from "react-redux";
import { selectDevices } from "store/devicesSlide";
import Loading from "components/Loading";

const DeviceYesterday = (props) => {
  let { id } = useParams();
  const singleChart = useContext(SingleContext);

  const  devices  = useSelector(selectDevices);
  // search for my device
  const device = devices.find((el) => el.properties.channelId == id);

  useEffect(() => {
    if (device && singleChart) {
      const { name } = device.properties;
      document.title = `Portale Sperimentale - ${name} yesterday counts`;
    }
  }, []);

  if (!devices.length) {
    return <Loading />;
  }

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
