import React, { useEffect } from "react";
import ViewMap from "components/map/ViewMap";
import { DEVICES } from "utility/constants";

const OnlyMap = (props) => {
  useEffect(() => {
    document.title = `CiCO - Il Conta i Ciclisti Ostinati - Devices map`;
  }, []);

  return (
    <div className="row single">
      <div className="col-lg-12">
        <ViewMap devices={DEVICES} />
      </div>
    </div>
  );
};

export default OnlyMap;
