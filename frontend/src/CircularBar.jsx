import React from "react";
import ReactECharts from "echarts-for-react";
//import { time } from "echarts";
import { graphic } from "echarts";
import "./index.css";

const CircularBar = ({ data, x, y1, y2, y3 }) => {
  const option = {
    title: {
      text: "Area Chart",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["Temperature", "Humidity"],
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
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
        boundaryGap: false,
        data: x,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Temperature",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#3559C9",
            },
            {
              offset: 1,
              color: "#2D5262",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: y1,
      },
      {
        name: "Humidity",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#6DE155",
            },
            {
              offset: 1,
              color: "#405C3B",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: y2,
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
  );
};

export default CircularBar;
