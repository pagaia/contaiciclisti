import React, { Fragment } from "react";
import ViewMap from "components/map/ViewMap";
import { DEVICES } from "utility/constants";
import DailyAverage from "components/charts/DailyAverage";
import DevicesCompare from "./singlePages/DevicesCompare";
import About from "components/About";
import HourlyComparePage from "./singlePages/HourlyComparePage";
import WeekCompare from "./singlePages/WeekCompare";
import LastCount from "components/charts/LastCount";

const MainPage = (props) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-4 mb-5">
          <ViewMap devices={DEVICES} />
        </div>

        <div className="col-lg-8">
          <div className="row">
            <div className="col-sm-12">
              {DEVICES.map((device) => {
                return (
                  <Fragment key={device.properties.channelId}>
                    <h2>{device.properties.name}</h2>
                    <LastCount device={device} />
                    <hr className="mb-5 bg-warning" />
                  </Fragment>
                );
              })}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <h2>Daily average comparison</h2>
              <DailyAverage devices={DEVICES} />
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
              <About />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MainPage;
