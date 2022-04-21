import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { Box, Container } from "@mui/material";
import { Line, Area } from "@ant-design/plots";
import {
  tempConfig,
  pressureConfig,
  humidityConfig,
  accxConfig,
  accyConfig,
  acczConfig,
  pitchConfig,
  rollConfig,
  yawConfig,
  initData,
  init_orientation,
} from "./configs";
import "./index.css";

const App = () => {
  const [data, setData] = useState(initData); // array of data points, default should be extracted from DB
  const [orientationData, setOrinetationData] = useState(init_orientation); // array of data points, default should be extracted from DB
  /*   const [temperature, setTemperature] = useState();
  const [pressure, setPressure] = useState();
  const [humidity, setHumidity] = useState();
  const [timestamp, setTimestamp] = useState("");
  const [pitch, setPitch] = useState();
  const [roll, setRoll] = useState();
  const [yaw, setYaw] = useState();
  const [acceleration_x, setAcceleration_x] = useState();
  const [acceleration_y, setAcceleration_y] = useState();
  const [acceleration_z, setAcceleration_z] = useState(); */

  const { lastJsonMessage, sendMessage } = useWebSocket(
    `ws://150.162.236.21:8000/ws/pollData`,
    {
      onOpen: () => console.log(`Connected to App WS`),
      onMessage: () => {
        if (lastJsonMessage) {
          //console.log(lastJsonMessage);
          /* setTemperature(lastJsonMessage.temperature);
          setTimestamp(lastJsonMessage.timestamp);
          setPressure(lastJsonMessage.pressure);
          setHumidity(lastJsonMessage.humidity); */
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
    useWebSocket(`ws://150.162.236.21:8000/ws/orientation`, {
      onOpen: () => console.log(`Connected to App WS Orientation`),
      onMessage: () => {
        if (socketMessage) {
          //console.log(socketMessage);
          /* setPitch(socketMessage.pitch);
          setRoll(socketMessage.roll);
          setYaw(socketMessage.yaw);
          setAcceleration_x(socketMessage.acceleration_x);
          setAcceleration_y(socketMessage.acceleration_y);
          setAcceleration_z(socketMessage.acceleration_z); */
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
          <Box className="card">
            <Line data={data} {...tempConfig} />
          </Box>
          <Box className="card">
            <Area data={data} {...pressureConfig} />
          </Box>
          <Box className="card">
            <Line data={data} {...humidityConfig} />
          </Box>
        </Box>
        <Box className="cards-container">
          <Box className="card">
            <Area data={orientationData} {...accxConfig} />
          </Box>
          <Box className="card">
            <Line data={orientationData} {...accyConfig} />
          </Box>
          <Box className="card">
            <Line data={orientationData} {...acczConfig} />
          </Box>
        </Box>
        <Box className="cards-container">
          <Box className="card">
            <Line data={orientationData} {...pitchConfig} />
          </Box>
          <Box className="card">
            <Line data={orientationData} {...rollConfig} />
          </Box>
          <Box className="card">
            <Line data={orientationData} {...yawConfig} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
