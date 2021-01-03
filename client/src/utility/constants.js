export const CHART_COLORS = {
  RED: {
    backgroundColor: "rgba(185, 33, 3, 0.2)",
    borderColor: "rgba(185, 33, 3, 1)",
    hoverBackgroundColor: "rgba(185, 33, 3, 0.6)",
  },
  ORANGE: {
    backgroundColor: "rgba(233, 122, 24, 0.2)",
    borderColor: "rgba(233, 122, 24, 1)",
    hoverBackgroundColor: "rgba(233, 122, 24, 0.6)",
  },
  BLUE: {
    backgroundColor: "rgba(17, 162, 220, 0.2)",
    borderColor: "rgba(17, 162, 220, 1)",
    hoverBackgroundColor: "rgba(17, 162, 220, 0.6)",
  },
  YELLOW: {
    backgroundColor: "rgba(254, 182, 1, 0.2)",
    borderColor: "rgba(254, 182, 1, 1)",
    hoverBackgroundColor: "rgba(254, 182, 1, 0.6)",
  },
};

export const DEVICES = [
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [12.524668, 41.927647],
    },
    properties: {
      name: "Nomentana",
      description: "Device located around Nomentana",
      channelId: 1050873,
      ...CHART_COLORS.ORANGE,
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [12.475011, 41.883446],
    },
    properties: {
      name: "Campi Elisi",
      description: "Device located around Campi Elisi",
      channelId: 1011480,
      ...CHART_COLORS.YELLOW,
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [12.470728, 41.918736],
    },
    properties: {
      name: "Città Eterna",
      description: "Device located around Città Eterna",
      channelId: 959807,
      ...CHART_COLORS.RED,
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [12.489475, 41.943323],
    },
    properties: {
      name: "Terre Del Nord",
      description: "Device located around Terre Del Nord",
      channelId: 1249861,
      ...CHART_COLORS.BLUE,
    },
  },
];

export const DEVICE_URL =
  "https://api.thingspeak.com/channels/DEVICE/feeds.json?timezone=Europe/Rome";

export const DEVICE_FIELDS =
  "https://api.thingspeak.com/channels/DEVICE/fields/FIELD.json";

export const DEVICE_URL_LAST =
  "https://api.thingspeak.com/channels/DEVICE/feeds/last.json?timezone=Europe/Rome";

export const REGEX_DEVICE = /DEVICE/;

/**
 *
 */
export const REGEX_FIELD = /FIELD/;

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

export const CHART = { BAR: "BAR", LINE: "LINE" };
