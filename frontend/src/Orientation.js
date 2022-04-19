import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { Box, Container } from "@mui/material";
import ReactDOM from "react-dom";
import { G2, Column, Line } from "@ant-design/plots";

const Orientation = ({
  orientationData,
  setOrinetationData,
  setTimestamp,
  setPitch,
  setRoll,
  setYaw,
  setAcceleration_x,
  setAcceleration_y,
  setAcceleration_z,
}) => {
  const { socketMessage, sendSocketMessage } = useWebSocket(
    `ws://150.162.10.42:8000/ws/orientation`,
    {
      onOpen: () => console.log(`Connected to App WS Orientation`),
      onMessage: () => {
        if (socketMessage) {
          console.log(socketMessage);
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
    }
  );

  return <div>Orientation</div>;
};

export default Orientation;
