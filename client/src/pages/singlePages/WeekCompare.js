import React, { Fragment, useContext, useEffect, useState } from "react";
import DailyCompare from "components/charts/DailyCompare";
import "./DevicesCompare.css";
import { SingleContext } from "utility/contexts/MyContext";
import WeekForm from "components/WeekForm";

const WeekCompare = (props) => {
  const [search, setSearch] = useState(null);
  const singleChart = useContext(SingleContext);

  useEffect(() => {
    document.title = `CiCO - Il Conta i Ciclisti Ostinati - Compare devices by week`;
  }, []);

  return (
    <Fragment>
      {!singleChart && <h2>Week comparison</h2>}
      <WeekForm updateSearch={setSearch} />
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

export default WeekCompare;
