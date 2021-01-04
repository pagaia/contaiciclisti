import React, { Fragment, useContext, useEffect, useState } from "react";
import "./DevicesCompare.css";
import { SingleContext } from "utility/contexts/MyContext";
import HourlyCompare from "components/charts/HourlyCompare";
import HourlyCompareForm from "components/HourlyCompareForm";

const HourlyComparePage = (props) => {
  const [search, setSearch] = useState(null);
  const singleChart = useContext(SingleContext);

  useEffect(() => {
    document.title = `CiCO - Il Conta i Ciclisti Ostinati - Devices hours count comparision`;
  }, []);

  return (
    <Fragment>
      {!singleChart && <h2>Hour comparison</h2>}
      <HourlyCompareForm updateSearch={setSearch} />
      {search && (
        <HourlyCompare
          devices={Object.values(search.devices)}
          day={search.day}
        />
      )}
      {!singleChart && <hr className="mb-5 bg-warning" />}
    </Fragment>
  );
};

export default HourlyComparePage;
