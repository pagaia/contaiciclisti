import React, { useRef, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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
        const { checked } = e.target;
        if (checked) {
            setChart(CHART.LINE);
        } else {
            setChart(CHART.BAR);
        }
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

    if (chart === CHART.BAR) {
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
    } else {
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
    }

    return (
        <div>
            <div className="custom-control custom-switch d-inline-block">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`switch-chart-${name}`}
                    name={`switch-chart-${name}`}
                    onChange={handleChart}
                    value="switch-chart"
                    checked={chart === CHART.LINE}
                />
                <label
                    className="custom-control-label"
                    htmlFor={`switch-chart-${name}`}
                >
                    {chart === CHART.BAR ? (
                        <FormattedMessage id="chart.switch-to-line" />
                    ) : (
                        <FormattedMessage id="chart.switch-to-bar" />
                    )}
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
