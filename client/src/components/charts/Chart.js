import React, { useContext, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import { CHART } from "utility/constants";
import { datasetKeyProvider } from "utility/utilityFunctions";

const SimpleChart = ({ data, name }) => {
  const [chart, setChart] = useState(CHART.LINE);

  if (!data) {
    return false;
  }

  const handleChart = (e) => {
    const { checked } = e.target;
    if (checked) {
      setChart(CHART.LINE);
    } else {
      setChart(CHART.BAR);
    }
  };

  let myChart;
  if (chart === CHART.BAR) {
    myChart = (
      <Bar
        data={data}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: true,
        }}
        datasetKeyProvider={datasetKeyProvider}
      />
    );
  } else {
    myChart = (
      <Line
        data={data}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: true,
        }}
        datasetKeyProvider={datasetKeyProvider}
      />
    );
  }

  return (
    <div>
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id={`switch-chart-${name}`}
          name={`switch-chart-${name}`}
          onChange={handleChart}
          value="switch-chart"
          checked={chart === CHART.LINE}
        />
        <label className="custom-control-label" htmlFor={`switch-chart-${name}`}>
          Switch Line/Bar
        </label>
      </div>
      {/* <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={`switch-chart-${name}`}
          name={`switch-chart-${name}`}
          onChange={handleChart}
          value="switch-chart"
          checked={chart === CHART.LINE}
        />
        <label className="form-check-label" htmlFor={`switch-chart-${name}`}>
          Change Chart
        </label>
      </div> */}

      {myChart}
    </div>
  );
};

SimpleChart.propTypes = {
  chart: PropTypes.oneOf(Object.values(CHART)),
  data: PropTypes.object,
};

export default SimpleChart;
