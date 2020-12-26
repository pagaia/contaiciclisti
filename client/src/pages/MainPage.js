import React, { Fragment } from "react";
import ViewMap from "components/map/ViewMap";
import { DEVICES } from "utility/constants";
import DailyAverage from "components/charts/DailyAverage";
import DevicesCompare from "./singlePages/DevicesCompare";
import About from "components/About";
import HourlyComparePage from "./singlePages/HourlyComparePage";

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
              <h2>Daily average comparison</h2>
              <DailyAverage devices={DEVICES} />
            </div>
            <div className="col-sm-12">
              <DevicesCompare />
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
