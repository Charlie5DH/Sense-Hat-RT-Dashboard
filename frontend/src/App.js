import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { Box, Button, Container, LinearProgress } from "@mui/material";

import axios from "axios";
import Page from "./Echarts";
import CircularBar from "./CircularBar";

import "./index.css";

const App = () => {
  const hostAddress = "localhost";
  //const hostAddress = "backend";
  const port = "8000";
  const [socketUrl, setSocketUrl] = useState(`ws://${hostAddress}:${port}`);
  //const [data, setData] = useState(initData);
  const [orientationData, setOrinetationData] = useState([]);
  const [envData, setEnvData] = useState([]);

  //const { lastJsonMessage, sendMessage } = useWebSocket(socketUrl);
  const { lastJsonMessage } = useWebSocket(`${socketUrl}/ws/pollData`, {
    onOpen: () => console.log(`Connected to App WS`),
    onMessage: () => {
      if (lastJsonMessage) {
        //console.log(lastJsonMessage);
        //console.log(envData.length);
        /* setTemperature(lastJsonMessage.temperature);
          setTimestamp(lastJsonMessage.timestamp);
          setPressure(lastJsonMessage.pressure);
          setHumidity(lastJsonMessage.humidity); */

        setEnvData([
          ...envData,
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
  });

  //const { lastJsonMessage: socketMessage, sendMessage: sendSocketMessage } = useWebSocket(
  const { lastJsonMessage: socketMessage } = useWebSocket(
    `${socketUrl}/ws/orientation`,
    {
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
    }
  );

  const getEnvData = async () => {
    await axios
      .get(`http://${hostAddress}:${port}/api/env_data/last=${2000}`)
      .then((response) => {
        setEnvData(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getOrientationData = async () => {
    await axios
      .get(`http://${hostAddress}:${port}/api/orientation_data/last=${2000}`)
      .then((response) => {
        setOrinetationData(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getEnvData();
    getOrientationData();
  }, []);

  const disconnectSocket = () => {
    setSocketUrl("");
  };
  const connectSocket = () => {
    setSocketUrl(`ws://${hostAddress}:${port}`);
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
        <h2>Sense Hat Dashboard</h2>
        <Button
          onClick={
            socketUrl === "" ? () => connectSocket() : () => disconnectSocket()
          }
        >
          {socketUrl === "" ? "Connect" : "Disconnect"}
        </Button>
      </Box>
      <Container maxWidth="xlg">
        {envData.length > 0 ? (
          <Box>
            <Box
              display="flex"
              alignContent={"center"}
              justifyContent="space-between"
            >
              <Box className="echart-card">
                <Page
                  x={envData?.map((data) => new Date(data?.timestamp))}
                  y={envData?.map((data) => data?.temperature)}
                  y1={envData?.map((data) => data?.humidity)}
                  title="Temperature"
                  legend={["Temperature", "Humidity"]}
                  serie1Name="Temperature"
                  serie2Name="Humidity"
                />
              </Box>
              <Box className="echart-card">
                <CircularBar
                  x={envData?.map((data) => new Date(data?.timestamp))}
                  y1={envData?.map((data) => data?.temperature)}
                  y2={envData?.map((data) => data?.humidity)}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              alignContent={"center"}
              justifyContent="space-between"
            >
              <Box className="echart-card">
                <Page
                  x={orientationData?.map((data) => new Date(data?.timestamp))}
                  y={orientationData?.map((data) => data?.acceleration_x)}
                  y1={orientationData?.map((data) => data?.acceleration_y)}
                  y2={orientationData?.map((data) => data?.acceleration_z)}
                  title="Acceleration"
                  legend={[
                    "Acceleration X",
                    "Acceleration Y",
                    "Acceleration Z",
                  ]}
                  serie1Name="Acceleration X"
                  serie2Name="Acceleration Y"
                  serie3Name="Acceleration Z"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              alignContent={"center"}
              justifyContent="space-between"
            >
              <Box className="echart-card">
                <Page
                  x={orientationData?.map((data) => new Date(data?.timestamp))}
                  y={orientationData?.map((data) => data?.pitch)}
                  y1={orientationData?.map((data) => data?.roll)}
                  y2={orientationData?.map((data) => data?.yaw)}
                  title="Orientation"
                  legend={["Pitch", "Roll", "Yaw"]}
                  serie1Name="Pitch"
                  serie2Name="Roll"
                  serie3Name="Yaw"
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: "100%", marginTop: "10em" }}>
            <LinearProgress />
          </Box>
        )}
      </Container>
    </Container>
  );
};

export default App;
