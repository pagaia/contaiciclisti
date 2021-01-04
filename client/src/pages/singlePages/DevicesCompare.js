import React, { Fragment, useContext, useEffect, useState } from "react";
import DailyCompare from "components/charts/DailyCompare";
import CompareForm from "components/CompareForm";
import "./DevicesCompare.css";
import { SingleContext } from "utility/contexts/MyContext";

const DevicesCompare = (props) => {
  const [search, setSearch] = useState(null);
  const singleChart = useContext(SingleContext);

  useEffect(() => {
    document.title = `CiCO - Il Conta i Ciclisti Ostinati - Compare devices`;
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
