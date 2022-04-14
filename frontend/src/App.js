import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { Box, Container } from "@mui/material";
import ReactDOM from "react-dom";
import { G2, Column, Line } from "@ant-design/plots";

const initData = [
  {
    temperature: 30.0,
    pressure: 1016.2,
    humidity: 50.1,
    timestamp: "2022-04-14T00:00:00.000Z",
  },
  {
    temperature: 30.1,
    pressure: 1016.3,
    humidity: 50.2,
    timestamp: "2022-04-14T00:00:01.000Z",
  },
  {
    temperature: 30.4,
    pressure: 1016.1,
    humidity: 50.4,
    timestamp: "2022-04-14T00:00:02.000Z",
  },
  {
    temperature: 30.2,
    pressure: 1016.6,
    humidity: 50.5,
    timestamp: "2022-04-14T00:00:03.000Z",
  },
  {
    temperature: 30.1,
    pressure: 1016.5,
    humidity: 50.0,
    timestamp: "2022-04-14T00:00:04.000Z",
  },
  {
    temperature: 30.6,
    pressure: 1016.3,
    humidity: 50.8,
    timestamp: "2022-04-14T00:00:05.000Z",
  },
];

const App = () => {
  const [data, setData] = useState(initData); // array of data points, default should be extracted from DB
  const [temperature, setTemperature] = useState();
  const [pressure, setPressure] = useState();
  const [humidity, setHumidity] = useState();
  const [timestamp, setTimestamp] = useState("");

  const { lastJsonMessage, sendMessage } = useWebSocket(
    "ws://150.162.236.51:4000/ws/pollData",
    {
      onOpen: () => console.log(`Connected to App WS`),
      onMessage: () => {
        if (lastJsonMessage) {
          console.log(lastJsonMessage);
          setTemperature(lastJsonMessage.temperature);
          setTimestamp(lastJsonMessage.timestamp);
          setPressure(lastJsonMessage.pressure);
          setHumidity(lastJsonMessage.humidity);
          setData([
            ...data,
            {
              temperature: lastJsonMessage.temperature,
              pressure: lastJsonMessage.pressure,
              humidity: lastJsonMessage.humidity,
              timestamp: lastJsonMessage.timestamp,
            },
          ]);
        }
      },
      queryParams: { token: "123456" },
      onError: (event) => {
        console.error(event);
      },
      shouldReconnect: (closeEvent) => true,
      reconnectInterval: 3000,
    }
  );

  const tempConfig = {
    data,
    padding: "auto",
    xField: "timestamp",
    yField: "temperature",
    yAxis: {
      min: 27,
    },
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    tooltip: {
      showMarkers: true,
    },
    point: {
      shape: "breath-point",
    },
    responsive: true,
    slider: {
      start: 0.8,
      stop: 1,
    },
    autoFit: true,
  };

  const pressureConfig = {
    data,
    padding: "auto",
    xField: "timestamp",
    yField: "pressure",
    yAxis: {
      min: 1000,
    },
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    tooltip: {
      showMarkers: true,
    },
    point: {
      shape: "breath-point",
    },
    responsive: true,
    slider: {
      start: 0.8,
      stop: 1,
    },
    autoFit: true,
  };

  const humidityConfig = {
    data,
    padding: "auto",
    xField: "timestamp",
    yField: "humidity",
    yAxis: {
      min: 45,
    },
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    tooltip: {
      showMarkers: true,
    },
    point: {
      shape: "breath-point",
    },
    responsive: true,
    slider: {
      start: 0.8,
      stop: 1,
    },
    autoFit: true,
  };

  const configCols = {
    data,
    padding: "auto",
    xField: "timestamp",
    yField: "humidity",
    autoFit: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
    slider: {
      start: 0.8,
      stop: 1,
    },
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        padding: "0.1em 1em",
        flexGrow: 1,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={"100%"}
      >
        <h1>Sense Hat Dashboard</h1>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Box
            marginRight={"20px"}
            backgroundColor="#FFFFFF"
            padding={"20px"}
            borderRadius={"20px"}
            maxWidth={"720px"}
            width={"800px"}
          >
            <Line {...tempConfig} />
          </Box>
          <Box
            marginRight={"20px"}
            backgroundColor="#FFFFFF"
            padding={"20px"}
            borderRadius={"20px"}
            maxWidth={"800px"}
            width={"720px"}
          >
            <Line {...pressureConfig} />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          marginTop={"20px"}
        >
          <Box
            marginRight={"20px"}
            backgroundColor="#FFFFFF"
            padding={"20px"}
            borderRadius={"20px"}
            maxWidth={"720px"}
            width={"800px"}
          >
            <Line {...humidityConfig} />
          </Box>
          <Box
            marginRight={"20px"}
            backgroundColor="#FFFFFF"
            padding={"20px"}
            borderRadius={"20px"}
            maxWidth={"800px"}
            width={"720px"}
          >
            <Column {...configCols} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
