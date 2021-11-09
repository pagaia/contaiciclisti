import React, { useRef, useState } from 'react';
import { Bar, Line, Radar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { CHART } from 'utility/constants';
import { datasetKeyProvider } from 'utility/utilityFunctions';
import DownLoadChart from 'components/DownloadChart';
import { FormattedMessage } from 'react-intl';

const SimpleChart = ({ data, name, doubleAxes, title = 'Text testtt' }) => {
    const [chart, setChart] = useState(CHART.LINE);

    const chartRef = useRef(null);

    const chartName = `chart${name}`;

    if (!data) {
        return false;
    }

    const handleChart = (e) => {
        setChart(e?.target?.value);
    };

    let myChart;

    let options = {
        maintainAspectRatio: true,
        title: {
            display: true,
            text: title,
        },
    };
    if (doubleAxes) {
        options = {
            ...options,
            scales: {
                yAxes: [
                    {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                    },
                    {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        gridLines: {
                            drawOnArea: false,
                        },
                    },
                ],
            },
        };
    }

    switch (chart) {
        case CHART.BAR:
            myChart = (
                <Bar
                    data={data}
                    width={100}
                    height={50}
                    options={options}
                    datasetKeyProvider={datasetKeyProvider}
                    id={chartName}
                    ref={chartRef}
                />
            );
            break;
        case CHART.LINE:
            myChart = (
                <Line
                    data={data}
                    width={100}
                    height={50}
                    options={options}
                    datasetKeyProvider={datasetKeyProvider}
                    id={chartName}
                    ref={chartRef}
                />
            );
            break;
        case CHART.RADAR:
            myChart = (
                <Radar
                    data={data}
                    width={100}
                    height={50}
                    options={options}
                    datasetKeyProvider={datasetKeyProvider}
                    id={chartName}
                    ref={chartRef}
                />
            );
            break;
    }

    return (
        <div>
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name={`switch-chart-${name}`}
                    id={`switch-chart-bar-${name}`}
                    value={CHART.BAR}
                    onChange={handleChart}
                    checked={chart === CHART.BAR}
                />
                <label className="form-check-label" htmlFor={`switch-chart-bar-${name}`}>
                    Bar
                </label>
            </div>
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name={`switch-chart-${name}`}
                    id={`switch-chart-line-${name}`}
                    value={CHART.LINE}
                    onChange={handleChart}
                    checked={chart === CHART.LINE}
                />
                <label className="form-check-label" htmlFor={`switch-chart-line-${name}`}>
                    Line
                </label>
            </div>
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name={`switch-chart-${name}`}
                    id={`switch-chart-radar-${name}`}
                    value={CHART.RADAR}
                    onChange={handleChart}
                    checked={chart === CHART.RADAR}
                />
                <label className="form-check-label" htmlFor={`switch-chart-radar-${name}`}>
                    Radar
                </label>
            </div>

            <DownLoadChart chartId={chartName} chartRef={chartRef} />
            {myChart}
        </div>
    );
};

SimpleChart.propTypes = {
    chart: PropTypes.oneOf(Object.values(CHART)),
    data: PropTypes.object,
};

export default SimpleChart;
