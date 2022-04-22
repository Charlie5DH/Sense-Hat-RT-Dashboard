export const tempConfig = {
  padding: "auto",
  xField: "timestamp",
  yField: "temperature",
  lineStyle: {
    stroke: "#F4664A",
  },
  yAxis: {
    min: 22,
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
    start: 0,
    stop: 1,
  },
  autoFit: true,
  height: 360,
};

export const pressureConfig = {
  padding: "auto",
  xField: "timestamp",
  yField: "pressure",
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
  autoFit: true,
  height: 360,
};

export const humidityConfig = {
  padding: "auto",
  xField: "timestamp",
  yField: "humidity",
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
  /*   slider: {
    start: 0,
    stop: 1,
  }, */
  autoFit: true,
  height: 360,
};

export const pitchConfig = {
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
    start: 0,
    stop: 1,
  },
  columnStyle: {
    radius: [20, 20, 0, 0],
  },
  autoFit: true,
  height: 360,
};

export const rollConfig = {
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
    start: 0.8,
    stop: 1,
  },
  columnStyle: {
    radius: [20, 20, 0, 0],
  },
  autoFit: true,
  height: 360,
};

export const yawConfig = {
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
    start: 0.8,
    stop: 1,
  },
  columnStyle: {
    radius: [20, 20, 0, 0],
  },
  autoFit: true,
  height: 360,
};

export const accxConfig = {
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
    start: 0.8,
    stop: 1,
  },
  columnStyle: {
    radius: [20, 20, 0, 0],
  },
  autoFit: true,
  height: 360,
};

export const accyConfig = {
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
    start: 0,
    stop: 1,
  },
  autoFit: true,
  height: 360,
};

export const acczConfig = {
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
    start: 0,
    stop: 1,
  },
  autoFit: true,
  height: 360,
};

export const initData = [
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

export const init_orientation = [
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
