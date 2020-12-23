export const DEVICES = [
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [12.525027, 41.928555],
    },
    properties: {
      name: "Nomentana",
      description: "Device located around Nomentana",
      channelId: 1050873,
      bgColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      hbgColor: "rgba(255, 99, 132, 0.6)",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [12.33979, 41.805035],
    },
    properties: {
      name: "Sublicio",
      description: "Device located around Sublicio",
      channelId: 1011480,
      bgColor: "rgba(154, 162, 235, 0.2)",
      borderColor: "rgba(154, 162, 235, 1)",
      hbgColor: "rgba(154, 162, 235, 0.6)",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [12.446309, 41.827121],
    },
    properties: {
      name: "Risorgimento",
      description: "Device located around Risorgimento",
      channelId: 959807,
      bgColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      hbgColor: "rgba(75, 192, 192, 0.6)",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [12.396309, 41.727121],
    },
    properties: {
      name: "Nazzano",
      description: "Device located around Nazzano",
      channelId: 1051988,
      bgColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      hbgColor: "rgba(54, 162, 235, 0.6)",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [12.436309, 41.907121],
    },
    properties: {
      name: "TerreDelNord",
      description: "Device located around TerreDelNord",
      channelId: 1249861,
      bgColor: "rgba(54, 102, 235, 0.2)",
      borderColor: "rgba(54, 102, 235, 1)",
      hbgColor: "rgba(54, 102, 235, 0.6)",
    },
  },
];

export const DEVICE_URL =
  "https://api.thingspeak.com/channels/DEVICE/feeds.json?timezone=Europe/Rome";

export const DEVICE_URL_LAST =
  "https://api.thingspeak.com/channels/DEVICE/feeds/last.json?timezone=Europe/Rome";

export const REGEX_DEVICE = /DEVICE/i;

/**
 * days of the week to be converted from number to string 0=Sunday ...
 */
export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * used to match the location path
 */
export const REGEX_SINGLE = /^\/single/;
