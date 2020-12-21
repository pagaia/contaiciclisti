import React, { Fragment, useState } from "react";
import DailyCompare from "../components/charts/DailyCompare";
import CompareForm from "../components/CompareForm";
import "./DevicesCompare.css";

const DevicesCompare = (props) => {
  const [search, setSearch] = useState(null);

  return (
    <Fragment>
      <h2>Compare devices</h2>

      <CompareForm updateSearch={setSearch} />
      {search && (
        <DailyCompare
          devices={Object.values(search.devices)}
          startDate={search.startDate}
          endDate={search.endDate}
        />
      )}
      <hr className="mb-5 bg-warning" />
    </Fragment>
  );
};

export default DevicesCompare;
