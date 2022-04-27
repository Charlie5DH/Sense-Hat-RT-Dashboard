import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { Box, Button, Container } from "@mui/material";
//import { Line, Area, Column } from "@ant-design/plots";
import axios from "axios";
/* import {
  tempConfig,
  pressureConfig,
  humidityConfig,
  accxConfig,
  accyConfig,
  acczConfig,
  pitchConfig,
  rollConfig,
  yawConfig,
} from "./configs"; */
//import ChartJSLine from "./ChartJsLine";
import "./index.css";
import Page from "./Echarts";

const App = () => {
  const hostAddress = "192.168.137.1";
  const port = "8000";
  const [socketUrl, setSocketUrl] = useState(`ws://${hostAddress}:${port}`);
  //const [data, setData] = useState(initData);
  const [orientationData, setOrinetationData] = useState([]);
  const [envData, setEnvData] = useState([]);

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

  const { lastJsonMessage, sendMessage, readyState } = useWebSocket(
    `${socketUrl}/ws/pollData`,
    {
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
    }
  );

  const { lastJsonMessage: socketMessage, sendMessage: sendSocketMessage } =
    useWebSocket(`${socketUrl}/ws/orientation`, {
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

  const getEnvData = async () => {
    await axios
      .get(`http://${hostAddress}:${port}/api/env_data/last=${500}`)
      .then((response) => {
        setEnvData(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getOrientationData = async () => {
    await axios
      .get(`http://${hostAddress}:${port}/api/orientation_data/last=${500}`)
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
        <h2>
          Sense Hat Dashboard. Socket currently is{" "}
          {readyState ? "Connected" : "Disconnected"}
        </h2>
        <Button
          onClick={
            socketUrl === "" ? () => connectSocket() : () => disconnectSocket()
          }
        >
          {socketUrl === "" ? "Connect" : "Disconnect"}
        </Button>
        {/* <Box display="flex" flexDirection="row" justifyContent="center">
          <Box className="card">
            <Line data={envData} {...tempConfig} />
          </Box>
          <Box className="card">
            <Line data={envData} {...pressureConfig} />
          </Box>
          <Box className="card">
            <Line data={envData} {...humidityConfig} />
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
            <Column data={orientationData} {...pitchConfig} />
          </Box>
          <Box className="card">
            <Column data={orientationData} {...rollConfig} />
          </Box>
          <Box className="card">
            <Column data={orientationData} {...yawConfig} />
          </Box>
        </Box> */}
      </Box>
      <Container maxWidth="xlg">
        {envData.length > 0 ? (
          <Box>
            <Box className="echart-card">
              <Page
                x={envData?.map((data) => new Date(data?.timestamp))}
                y={envData?.map((data) => data?.temperature)}
                y1={envData?.map((data) => data?.humidity)}
                y2={envData?.map((data) => data?.temperature)}
                legend={["Temperature", "Humidity"]}
                serie1Name="Temperature"
                serie2Name="Humidity"
              />
            </Box>
            <Box className="echart-card">
              <Page
                x={orientationData?.map((data) => new Date(data?.timestamp))}
                y={orientationData?.map((data) => data?.acceleration_x)}
                y1={orientationData?.map((data) => data?.acceleration_y)}
                y2={orientationData?.map((data) => data?.acceleration_z)}
                legend={["Acceleration X", "Acceleration Y", "Acceleration Z"]}
                serie1Name="Acceleration X"
                serie2Name="Acceleration Y"
                serie3Name="Acceleration Z"
              />
            </Box>
            <Box className="echart-card">
              <Page
                x={orientationData?.map((data) => new Date(data?.timestamp))}
                y={orientationData?.map((data) => data?.pitch)}
                y1={orientationData?.map((data) => data?.roll)}
                y2={orientationData?.map((data) => data?.yaw)}
                legend={["Pitch", "Roll", "Yaw"]}
                serie1Name="Pitch"
                serie2Name="Roll"
                serie3Name="Yaw"
              />
            </Box>
          </Box>
        ) : null}
      </Container>
    </Container>
  );
};

export default App;
