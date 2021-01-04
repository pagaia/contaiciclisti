import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const DownLoadChart = ({ chartId, chartRef }) => {
  const [href, setHref] = useState(null);

  if (!chartId || !chartRef) {
    return null;
  }

  const handleOnClick = (event) => {
    // event.preventDefault();
    const base64Image = chartRef.current.chartInstance.toBase64Image();
    setHref(base64Image);
  };

  return (
    <a
      download={`${chartId}.jpg`}
      href={href|| "#download-chart"}
      className="btn btn-download"
      title="Download chart as image"
      onClick={handleOnClick}
    >
      <FontAwesomeIcon icon="download" size="xs" />
    </a>
  );
};

export default DownLoadChart;
