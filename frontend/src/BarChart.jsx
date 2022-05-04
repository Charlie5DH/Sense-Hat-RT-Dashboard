import React from "react";
import ReactECharts from "echarts-for-react";
import "./index.css";

const BarChart = ({ x, y1, y2, y3, legend }) => {
  const option = {
    title: {
      text: "Bar Chart",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        label: {
          show: true,
        },
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        dataZoom: {
          yAxisIndex: "none",
        },
        saveAsImage: {},
      },
    },
    calculable: true,
    legend: {
      data: legend,
      itemGap: 5,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: x,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Acceleration",
      },
    ],
    series: [
      {
        name: "Acceleration X",
        type: "bar",
        data: y1,
        emphasis: {
          focus: "series",
        },
      },
      {
        name: "Acceleration Y",
        type: "bar",
        data: y2,
        emphasis: {
          focus: "series",
        },
      },
      {
        name: "Acceleration Z",
        type: "bar",
        data: y3,
        emphasis: {
          focus: "series",
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
  );
};

export default BarChart;
