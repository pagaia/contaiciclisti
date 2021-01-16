import React, { useEffect } from "react";
import ViewMap from "components/map/ViewMap";

const OnlyMap = (props) => {
  useEffect(() => {
    document.title = `Portale Sperimentale - Devices map`;
  }, []);

  return (
    <div className="row single">
      <div className="col-lg-12">
        <ViewMap />
      </div>
    </div>
  );
};

export default OnlyMap;
