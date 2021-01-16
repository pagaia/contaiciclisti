import React, { Fragment, useContext, useEffect, useState } from "react";
import "./DevicesCompare.css";
import { SingleContext } from "utility/contexts/MyContext";
import HourlyCompare from "components/charts/HourlyCompare";
import HourlyCompareForm from "components/HourlyCompareForm";
import { useSelector } from "react-redux";
import { selectDevices } from "store/devicesSlide";

const HourlyComparePage = (props) => {
  const [search, setSearch] = useState(null);
  const singleChart = useContext(SingleContext);

  const devices = useSelector(selectDevices);

  useEffect(() => {
    if (singleChart) {
      document.title = `Portale Sperimentale - Devices hours count comparision`;
    }
  }, []);

  if (!devices?.length) {
    return null;
  }

  return (
    <Fragment>
      {!singleChart && <h2>Hour comparison</h2>}
      <HourlyCompareForm updateSearch={setSearch} />
      {search && <HourlyCompare search={search} />}
      {!singleChart && <hr className="mb-5 bg-warning" />}
    </Fragment>
  );
};

export default HourlyComparePage;
