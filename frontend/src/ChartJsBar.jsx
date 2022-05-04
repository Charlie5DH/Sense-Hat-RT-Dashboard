import React from "react";
import { Bar } from "react-chartjs-2";
//import { Chart as ChartJS } from "chart.js/auto";

const ChartJSBar = ({ data }) => {
  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Chart.js Bar Chart",
          },
        },
      }}
    />
  );
};

export default ChartJSBar;
