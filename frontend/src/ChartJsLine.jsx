import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineJsChart = ({ data }) => {
  return (
    <Line
      data={data}
      type="line"
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Chart.js Line Chart",
          },
          responsive: true,
          scales: {
            xAxes: {
              type: "time",
              display: true,
              title: {
                display: true,
                text: "Date",
              },
              ticks: {
                autoSkip: true,
                maxRotation: 0,
                major: {
                  enabled: true,
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default LineJsChart;
