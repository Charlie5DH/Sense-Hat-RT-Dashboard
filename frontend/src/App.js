import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { Box, Container } from "@mui/material";
import ReactDOM from "react-dom";
import { G2, Column, Line, Area, Scatter } from "@ant-design/plots";

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

const init_orientation = [
  {
    pitch: 358.82,
    roll: 1.1,
    yaw: 297.84,
    acceleration_x: 0.01624,
    acceleration_y: 0.02452,
    acceleration_z: 1.00232,
    timestamp: "2022-04-18 13:08:14",
  },
];

const App = () => {
  const [data, setData] = useState(initData); // array of data points, default should be extracted from DB
  const [orientationData, setOrinetationData] = useState(init_orientation); // array of data points, default should be extracted from DB
  const [temperature, setTemperature] = useState();
  const [pressure, setPressure] = useState();
  const [humidity, setHumidity] = useState();
  const [timestamp, setTimestamp] = useState("");
  const [pitch, setPitch] = useState();
  const [roll, setRoll] = useState();
  const [yaw, setYaw] = useState();
  const [acceleration_x, setAcceleration_x] = useState();
  const [acceleration_y, setAcceleration_y] = useState();
  const [acceleration_z, setAcceleration_z] = useState();

  const { lastJsonMessage, sendMessage } = useWebSocket(
    `ws://150.162.10.42:8000/ws/pollData`,
    {
      onOpen: () => console.log(`Connected to App WS`),
      onMessage: () => {
        if (lastJsonMessage) {
          //console.log(lastJsonMessage);
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
      onClose: (event) => {
        console.log("Disconnected", event);
      },
      shouldReconnect: (closeEvent) => true,
      reconnectInterval: 3000,
    }
  );

  const { lastJsonMessage: socketMessage, sendMessage: sendSocketMessage } =
    useWebSocket(`ws://150.162.10.42:8000/ws/orientation`, {
      onOpen: () => console.log(`Connected to App WS Orientation`),
      onMessage: () => {
        if (socketMessage) {
          //console.log(socketMessage);
          setPitch(socketMessage.pitch);
          setRoll(socketMessage.roll);
          setYaw(socketMessage.yaw);
          setAcceleration_x(socketMessage.acceleration_x);
          setAcceleration_y(socketMessage.acceleration_y);
          setAcceleration_z(socketMessage.acceleration_z);
          setOrinetationData([
            ...orientationData,
            {
              pitch: socketMessage.pitch,
              roll: socketMessage.roll,
              yaw: socketMessage.yaw,
              acceleration_x: socketMessage.acceleration_x,
              acceleration_y: socketMessage.acceleration_y,
              acceleration_z: socketMessage.acceleration_z,
              timestamp: socketMessage.timestamp,
            },
          ]);
        }
      },
      queryParams: { token: "123456" },
      onError: (event) => {
        console.error(event);
      },
      onClose: (event) => {
        console.log("Disconnected", event);
      },
      shouldReconnect: (closeEvent) => true,
      reconnectInterval: 3000,
    });

  const tempConfig = {
    data,
    padding: "auto",
    xField: "timestamp",
    yField: "temperature",
    lineStyle: {
      stroke: "#F4664A",
    },
    yAxis: {
      min: 26,
    },
    xAxis: {
      // type: 'timeCat',
      tickCount: 3,
    },
    tooltip: {
      showMarkers: true,
    },
    /* point: {
      shape: "breath-point",
    }, */
    responsive: true,
    slider: {
      start: 0.7,
      stop: 1,
    },
    autoFit: true,
    height: 360,
  };

  const pressureConfig = {
    data,
    padding: "auto",
    xField: "timestamp",
    yField: "pressure",
    yAxis: {
      min: 950,
    },
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    tooltip: {
      showMarkers: true,
    },
    /* point: {
      shape: "breath-point",
    }, */
    responsive: true,
    slider: {
      start: 0.7,
      stop: 1,
    },
    autoFit: true,
    height: 360,
  };

  const humidityConfig = {
    data,
    padding: "auto",
    xField: "timestamp",
    yField: "humidity",
    lineStyle: {
      stroke: "#8D9DBF",
    },
    yAxis: {
      min: 55,
    },
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    tooltip: {
      showMarkers: true,
    },
    /* point: {
      shape: "breath-point",
    }, */
    responsive: true,
    slider: {
      start: 0.7,
      stop: 1,
    },
    autoFit: true,
    height: 360,
  };

  const pitchConfig = {
    data: orientationData,
    padding: "auto",
    xField: "timestamp",
    yField: "pitch",
    lineStyle: {
      stroke: "#6D5CF4",
    },
    yAxis: {
      min: 0,
      max: 370,
    },
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    tooltip: {
      showMarkers: true,
    },
    /* point: {
      shape: "breath-point",
    }, */
    responsive: true,
    slider: {
      start: 0.7,
      stop: 1,
    },
    autoFit: true,
    height: 360,
  };

  const rollConfig = {
    data: orientationData,
    padding: "auto",
    xField: "timestamp",
    yField: "roll",
    lineStyle: {
      stroke: "#00887A",
    },
    yAxis: {
      min: 0,
      max: 370,
    },
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    tooltip: {
      showMarkers: true,
    },
    /* point: {
      shape: "breath-point",
    }, */
    responsive: true,
    slider: {
      start: 0.7,
      stop: 1,
    },
    autoFit: true,
    height: 360,
  };

  const yawConfig = {
    data: orientationData,
    padding: "auto",
    xField: "timestamp",
    yField: "yaw",
    lineStyle: {
      stroke: "#8D9DBF",
    },
    yAxis: {
      min: 0,
      max: 370,
    },
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    tooltip: {
      showMarkers: true,
    },
    /* point: {
      shape: "breath-point",
    }, */
    responsive: true,
    slider: {
      start: 0.7,
      stop: 1,
    },
    autoFit: true,
    height: 360,
  };

  const accxConfig = {
    data: orientationData,
    padding: "auto",
    xField: "timestamp",
    yField: "acceleration_x",
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    tooltip: {
      showMarkers: true,
    },
    /* point: {
      shape: "breath-point",
    }, */
    responsive: true,
    slider: {
      start: 0.7,
      stop: 1,
    },
    autoFit: true,
    height: 360,
  };

  const accyConfig = {
    data: orientationData,
    padding: "auto",
    xField: "timestamp",
    yField: "acceleration_y",
    lineStyle: {
      stroke: "#F4664A",
    },
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    tooltip: {
      showMarkers: true,
    },
    /* point: {
      shape: "breath-point",
    }, */
    responsive: true,
    slider: {
      start: 0.7,
      stop: 1,
    },
    autoFit: true,
    height: 360,
  };

  const acczConfig = {
    data: orientationData,
    padding: "auto",
    xField: "timestamp",
    yField: "acceleration_z",
    lineStyle: {
      stroke: "#8D9DBF",
    },
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    tooltip: {
      showMarkers: true,
    },
    /* point: {
      shape: "breath-point",
    }, */
    responsive: true,
    slider: {
      start: 0.7,
      stop: 1,
    },
    autoFit: true,
    height: 360,
  };

  return (
    <Container
      maxWidth="xlg"
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
            width={"520px"}
          >
            <Line {...tempConfig} />
          </Box>
          <Box
            marginRight={"20px"}
            backgroundColor="#FFFFFF"
            padding={"20px"}
            borderRadius={"20px"}
            maxWidth={"800px"}
            width={"520px"}
          >
            <Area {...pressureConfig} />
          </Box>
          <Box
            marginRight={"20px"}
            backgroundColor="#FFFFFF"
            padding={"20px"}
            borderRadius={"20px"}
            maxWidth={"720px"}
            width={"520px"}
          >
            <Line {...humidityConfig} />
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
            maxWidth={"800px"}
            width={"520px"}
          >
            <Line {...pitchConfig} />
          </Box>
          <Box
            marginRight={"20px"}
            backgroundColor="#FFFFFF"
            padding={"20px"}
            borderRadius={"20px"}
            maxWidth={"800px"}
            width={"520px"}
          >
            <Line {...rollConfig} />
          </Box>
          <Box
            marginRight={"20px"}
            backgroundColor="#FFFFFF"
            padding={"20px"}
            borderRadius={"20px"}
            maxWidth={"800px"}
            width={"520px"}
          >
            <Line {...yawConfig} />
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
            maxWidth={"800px"}
            width={"520px"}
          >
            <Area {...accxConfig} />
          </Box>
          <Box
            marginRight={"20px"}
            backgroundColor="#FFFFFF"
            padding={"20px"}
            borderRadius={"20px"}
            maxWidth={"800px"}
            width={"520px"}
          >
            <Line {...accyConfig} />
          </Box>
          <Box
            marginRight={"20px"}
            backgroundColor="#FFFFFF"
            padding={"20px"}
            borderRadius={"20px"}
            maxWidth={"800px"}
            width={"520px"}
          >
            <Line {...acczConfig} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
