import React, { useEffect } from "react";
import DailyAverage from "components/charts/DailyAverage";
import { DEVICES } from "utility/constants";

const DailyAveragePage = (props) => {
  useEffect(() => {
    document.title = `CiCO - Il Conta i Ciclisti Ostinati -  Daily Average counts`;
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <DailyAverage devices={DEVICES} />
      </div>
    </div>
  );
};

export default DailyAveragePage;
