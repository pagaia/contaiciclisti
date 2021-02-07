import React, { Fragment } from "react";
import ViewMap from "components/map/ViewMap";
import DailyAverage from "components/charts/DailyAverage";
import DevicesCompare from "./singlePages/DevicesCompare";
import HourlyComparePage from "./singlePages/HourlyComparePage";
import WeekCompare from "./singlePages/WeekCompare";
import LastCount from "components/charts/LastCount";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Accordion from "components/Accordion";

const MainPage = (props) => {
  const { devices } = useSelector((state) => state.devices);

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-4 mb-5">
          <ViewMap devices={devices} />
        </div>

        <div className="col-lg-8">
          <Accordion title="Open/Close">
            <div className="row">
              <div className="col-sm-12">
                {devices.map((device) => {
                  return (
                    <Fragment key={device.properties.channelId}>
                      <h2>
                        <Link
                          to={`/devices/${device.properties.channelId}`}
                          className="text-warning"
                        >
                          {device.properties.name}
                        </Link>
                      </h2>
                      <LastCount device={device} />
                      <hr className="mb-5 bg-warning" />
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </Accordion>

          <div className="row">
            <div className="col-sm-12">
              <h2>Daily average comparison</h2>
              <DailyAverage />
            </div>
            <div className="col-sm-12">
              <DevicesCompare />
            </div>
            <div className="col-sm-12">
              <WeekCompare />
            </div>
            <div className="col-sm-12">
              <HourlyComparePage />
            </div>
            <div className="col-sm-12">
              <h2>Example of counts during Christmas 2020</h2>
              <iframe
                width="100%"
                height="520"
                frameBorder="0"
                src="https://pagaia.carto.com/viz/4cfaa083-53db-4b13-ae6f-c1acadcb2f2a/embed_map"
              ></iframe>
            </div>
            {/* <div className="col-sm-12">
              <About />
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MainPage;
