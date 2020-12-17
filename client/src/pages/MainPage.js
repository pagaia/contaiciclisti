import React, { Fragment } from "react";
import About from "../components/About";
import DailyAverage from "../components/charts/DailyAverage";
import ViewMap from "../components/map/ViewMap";

const MainPage = ({devices}) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-6">
          <ViewMap devices={devices} />
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-sm-12">
            <h2>Daily average comparison</h2>

              <DailyAverage devices={devices} />
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
