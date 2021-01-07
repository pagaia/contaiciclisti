import DailyCompare from "components/charts/DailyCompare";
import CompareForm from "components/CompareForm";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { SingleContext } from "utility/contexts/MyContext";
import "./DevicesCompare.css";

const DevicesCompare = (props) => {
  const [search, setSearch] = useState(null);
  const singleChart = useContext(SingleContext);

  useEffect(() => {
    if(singleChart) {
      document.title = `CiCO - Il Conta i Ciclisti Ostinati - Compare devices`;
    }
  }, []);

  return (
    <Fragment>
      {!singleChart && <h2>Compare devices</h2>}
      <CompareForm updateSearch={setSearch} />
      {search && (
        <DailyCompare
          devices={Object.values(search.devices)}
          startDate={search.startDate}
          endDate={search.endDate}
        />
      )}
      {!singleChart && <hr className="mb-5 bg-warning" />}
    </Fragment>
  );
};

export default DevicesCompare;
