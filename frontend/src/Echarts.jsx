import React from "react";
import ReactECharts from "echarts-for-react";
//import { format } from "echarts";
import { time } from "echarts";
import "./index.css";

const Page = ({
  x,
  y,
  y1,
  y2,
  legend,
  serie1Name,
  serie2Name,
  serie3Name,
  title,
  type,
}) => {
  const option = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: "axis",
      label: {
        fontSize: "22px",
      },
      position: function (pt) {
        return [pt[0], "10%"];
      },
      /* formatter: function (params) {
        params = params[0];
        var date = new Date(params.name);
        console.log(params);
        return (
          date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear() +
          " " +
          `<span style="color:#555;font-weight:bold">${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</span>` +
          `<span style="color:#6395F9;font-weight:bold"> ${params.seriesName}: ${params.value}</span>`
        );
      }, */
    },
    /* dataZoom: [
      {
        show: true,
        realtime: true,
        start: 80,
        end: 100,
      },
    ], */
    legend: {
      data: legend,
    },
    toolbox: {
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
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        axisLabel: {
          formatter: function (value) {
            return time.format("yyyy-MM-dd h:m:s", value);
            // And other formatter tool (e.g. moment) can be used here.
          },
        },
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
        name: legend[0],
        type: "line",
        smooth: true,
        sampling: "lttb",

        //stack: "total",
        data: y,
        //areaStyle: {},
      },
      {
        name: legend[1],
        type: "line",
        smooth: true,
        sampling: "lttb",
        //stack: "total",
        data: y1,
        //areaStyle: {},
      },
      {
        name: serie3Name,
        type: "line",
        smooth: true,
        sampling: "lttb",
        //stack: "total",
        data: y2,
        //areaStyle: {},
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
  );
};

export default Page;
