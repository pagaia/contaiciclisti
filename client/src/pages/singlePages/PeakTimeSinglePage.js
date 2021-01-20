import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import { SingleContext } from "utility/contexts/MyContext";
import { useSelector } from "react-redux";
import { selectDevices } from "store/devicesSlide";
import PeakCount from "components/charts/PeakCount";
import Loading from "components/Loading";

const PeakTimeSinglePage = (props) => {
  let { id } = useParams();
  const singleChart = useContext(SingleContext);

  const devices = useSelector(selectDevices);

  // search for my device
  const device = devices.find((el) => el.properties.channelId == id);

  useEffect(() => {
    if (device && singleChart) {
      const { name } = device.properties;
      document.title = `Portale Sperimentale - ${name} Peak time counts`;
    }
  }, []);

  if (!devices?.length) {
    return <Loading />;
  }

  if (!device) {
    return <NotFound />;
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <PeakCount device={device} />
      </div>
    </div>
  );
};

export default PeakTimeSinglePage;
