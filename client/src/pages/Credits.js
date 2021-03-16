import ExternalLink from "components/ExternalLink";
import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDevices } from "store/devicesSlide";
import { DEVICE_MAIN_URL } from "utility/constants";

const Credits = () => {
  const devices = useSelector(selectDevices);
  useEffect(() => {
    document.title = `Portale Sperimentale -  Credits`;
  }, []);

  return (
    <Fragment>
      <h2>Credits</h2>
      <div className="row">
        <div className="col-sm-12 col-md-10">
          <p>
            The data for all these charts are coming from an experiment on bike
            counts. Please find here all the data for each device:
            <ul className="devices-list">
              {devices?.map((device) => {
                return (
                  <li>
                    <ExternalLink
                      url={DEVICE_MAIN_URL + device.properties.channelId}
                    >
                      {device.properties.name}
                    </ExternalLink>
                  </li>
                );
              })}
            </ul>
          </p>
          <p>
            Data for Tevere Hydrometric level is provided by Protezione Civile
            via
            <ExternalLink url="https://dati.lazio.it/web/open-ambiente">
              Dati Lazio
            </ExternalLink>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Credits;
