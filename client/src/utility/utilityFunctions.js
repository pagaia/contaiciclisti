import { format } from "date-fns";
import { DAYS } from "./constants";

/**
 * calculate the start and end date for today
 */
export const getBeginningOfToday = () => {
  let start = new Date();
  return format(start, "yyyy-MM-dd");
};

/**
 * calculate the start and end date for yesterday
 */
export const getYesterdayStartEnd = () => {
  let end = new Date();
  let start = new Date(end);

  start.setDate(start.getDate() - 1);

  end = format(end, "yyyy-MM-dd");
  start = format(start, "yyyy-MM-dd");

  return { start, end };
};

/**
 * calculate the start and end date for previous month
 */
export const getLastMonthStartEnd = () => {
  let end = new Date();
  end.setDate(1);
  let start = new Date(end);
  start.setMonth(start.getMonth() - 1);

  end = format(end, "yyyy-MM-dd");
  start = format(start, "yyyy-MM-dd");

  return { start, end };
};

/**
 * calculate the start and end date for previous month
 */
export const getLastMonthStartEndDatePicker = () => {
  // let end = new Date();
  var date = new Date();
  var end = new Date(
    Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  );

  // end.setHours(0, 0, 0);
  end.setDate(1);
  let start = new Date(end);
  start.setMonth(start.getMonth() - 1); // set previous month
  start.setHours(0, 0, 0);
  end.setDate(end.getDate() - 1); // set previous day
  return { start, end };
};

/**
 * This function gets the list of counts and device information and build labels and datasets for hourly counts
 *
 * @param {Array} feeds
 * @param {Object} device
 */
export const buildDataHourly = (feeds, device) => {
  const { name: label, bgColor, borderColor, hbgColor } = device.properties;

  const labels = [...Array(24).keys()];

  const datasets = [
    {
      label,
      backgroundColor: bgColor || "rgba(54, 162, 235, 0.2)",
      borderColor: borderColor || "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      hoverBackgroundColor: hbgColor || "rgba(255,99,132,0.4)",
      // hoverBorderColor: "rgba(255,99,132,1)",
      data: [],
    },
  ];

  feeds.forEach((feed) => {
    if (feed.field1) {
      const hour =
        feed.created_at.substring(11, 12) === "0"
          ? feed.created_at.substring(12, 13)
          : feed.created_at.substring(11, 13);
      datasets[0].data.push(parseInt(feed.field1, 10));
    }
  });
  return { labels, datasets };
};

/**
 * This function gets the list of counts and device information and build labels and datasets for hourly counts
 *
 * @param {Array} feeds
 * @param {Object} device
 */
export const buildDataDaily = (feeds, device) => {
  const { name: label, bgColor, borderColor, hbgColor } = device.properties;

  const labels = [];
  const datasets = [
    {
      label,
      backgroundColor: bgColor || "rgba(54, 162, 235, 0.2)",
      borderColor: borderColor || "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      hoverBackgroundColor: hbgColor || "rgba(255,99,132,0.4)",
      // hoverBorderColor: "rgba(255,99,132,1)",
      data: [],
      fill: false,
    },
  ];

  feeds.forEach((feed) => {
    if (feed.field3) {
      const day = new Date(feed.created_at).getDay();
      if (day === 0 || day === 6) {
        labels.push(DAYS[day]);
      } else {
        labels.push(feed.created_at.substring(0, 10));
      }
      datasets[0].data.push(parseInt(feed.field3, 10));
    }
  });
  return { labels, datasets };
};

/**
 * Gets 2 dates and returns an array with all days
 *
 * @param {Date} startDate
 * @param {Date} endDate
 */
export const getDatesBetweenDates = (startDate, endDate) => {
  let dates = [];
  //to avoid modifying the original date
  const theDate = new Date(startDate);
  const end = new Date(endDate);

  while (theDate < end) {
    const currentDay = format(theDate, "yyyy-MM-dd");
    dates = [...dates, currentDay];
    theDate.setDate(theDate.getDate() + 1);
  }
  return dates;
};

/**
 * This function gets the list of counts and device information and build labels and datasets for total daily counts
 *
 * @param {Array} feeds
 * @param {Object} device
 */
export const buildDailyCompare = (feeds, device, labels) => {
  const { name: label, bgColor, borderColor, hbgColor } = device.properties;

  const dataset = {
    label,
    backgroundColor: bgColor || "rgba(54, 162, 235, 0.2)",
    borderColor: borderColor || "rgba(54, 162, 235, 1)",
    borderWidth: 1,
    hoverBackgroundColor: hbgColor || "rgba(255,99,132,0.4)",
    data: [],
    fill: false,
  };

  const dateFound = {};
  feeds.forEach((feed) => {
    if (feed.field3) {
      dateFound[feed.created_at.substring(0, 10)] = parseInt(feed.field3, 10);
    }
  });

  // double check data per day
  labels.forEach((day) => {
    dataset.data.push(dateFound[day]);
  });

  return dataset;
};

/**
 * This function gets the list of counts and device information and build labels and datasets for hourly counts
 *
 * @param {Array} feeds
 * @param {Object} device
 */
export const buildHourlyCompare = (feeds, device, labels) => {
  const { name: label, bgColor, borderColor, hbgColor } = device.properties;

  const dataset = {
    label,
    backgroundColor: bgColor || "rgba(54, 162, 235, 0.2)",
    borderColor: borderColor || "rgba(54, 162, 235, 1)",
    borderWidth: 1,
    hoverBackgroundColor: hbgColor || "rgba(255,99,132,0.4)",
    data: [],
    fill: false,
  };

  const dateFound = {};
  feeds.forEach((feed) => {
    const hour =
      feed.created_at.substring(11, 12) === "0"
        ? feed.created_at.substring(12, 13)
        : feed.created_at.substring(11, 13);
    // set the key as the day and time
    dateFound[hour] = parseInt(feed.field1, 10);
  });

  // double check data per day
  labels.forEach((day) => {
    dataset.data.push(dateFound[day]);
  });

  return dataset;
};

/**
 * Utility function to sum up an array of numbers
 * @param {Number} accumulator
 * @param {Number} currentValue
 */
const sumReducer = (accumulator, currentValue) => accumulator + currentValue;

/**
 *  This function gets the list of counts and device information and build labels and datasets for Daily Average counts
 *  for days of the week
 *
 * @param {Array} feeds
 * @param {Object} device
 */
export const buildDataDailyAverage = (feeds, device) => {
  const { name: label, bgColor, borderColor, hbgColor } = device.properties;

  const dataset = {
    label,
    backgroundColor: bgColor || "rgba(54, 162, 235, 0.2)",
    borderColor: borderColor || "rgba(54, 162, 235, 1)",
    borderWidth: 1,
    hoverBackgroundColor: hbgColor || "rgba(255,99,132,0.4)",
    data: [],
  };

  const weekDays = [];

  feeds.forEach((feed) => {
    if (feed.field3) {
      // 0 Sunday, 1 Monday, etc...
      const dayNumber = new Date(feed.created_at).getDay();
      const field = parseInt(feed.field3, 10);
      if (weekDays[dayNumber]) {
        weekDays[dayNumber].push(field);
      } else {
        weekDays[dayNumber] = [field];
      }
    }
  });

  for (let i = 1; i < 7; i++) {
    weekDays[i] &&
      dataset.data.push(
        parseInt(weekDays[i].reduce(sumReducer) / weekDays[i].length, 10)
      );
  }
  dataset.data.push(
    weekDays[0] &&
      parseInt(weekDays[0].reduce(sumReducer) / weekDays[0].length, 10)
  );

  return dataset;
};

/**
 * This function gets the list of counts and device information and build labels and datasets for hourly Average counts
 *
 * @param {Array} feeds
 * @param {Object} device
 */
export const buildHourlyAverage = (feeds, device) => {
  const { name: label, bgColor, borderColor, hbgColor } = device.properties;

  const labels = [...Array(24).keys()];

  const datasets = [
    {
      label: "Weekdays",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      hoverBackgroundColor: "rgba(255, 99, 132, 0.6)",
      borderWidth: 1,
      data: [],
    },
    {
      label: "Saturday",
      borderWidth: 1,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      hoverBackgroundColor: "rgba(54, 162, 235, 0.6)",
      data: [],
    },
    {
      label: "Sunday",
      borderWidth: 1,
      backgroundColor: "rgba(154, 162, 235, 0.2)",
      borderColor: "rgba(154, 162, 235, 1)",
      hoverBackgroundColor: "rgba(154, 162, 235, 0.6)",
      data: [],
    },
  ];

  const weekDays = [];
  const saturday = [];
  const sunday = [];

  feeds.forEach((feed) => {
    if (feed.field1) {
      const day = new Date(feed.created_at).getDay();
      const hour = new Date(feed.created_at).getHours();

      // Sunday
      if (day === 0) {
        if (sunday[hour]) {
          sunday[hour].push(parseInt(feed.field1, 10));
        } else {
          sunday[hour] = [parseInt(feed.field1, 10)];
        }
      }
      // Saturday
      if (day === 6) {
        if (saturday[hour]) {
          saturday[hour].push(parseInt(feed.field1, 10));
        } else {
          saturday[hour] = [parseInt(feed.field1, 10)];
        }
      }

      // weekdays
      if (1 <= day <= 5) {
        if (weekDays[hour]) {
          weekDays[hour].push(parseInt(feed.field1, 10));
        } else {
          weekDays[hour] = [parseInt(feed.field1, 10)];
        }
      }
    }
  });

  // adding hourly Average  for week days
  weekDays.forEach((hour) => {
    datasets[0].data.push(parseInt(hour.reduce(sumReducer) / hour.length, 10));
  });

  // adding hourly Average  for saturday
  saturday.forEach((hour) => {
    datasets[1].data.push(parseInt(hour.reduce(sumReducer) / hour.length, 10));
  });

  // adding hourly Average  for sunday
  sunday.forEach((hour) => {
    datasets[2].data.push(parseInt(hour.reduce(sumReducer) / hour.length, 10));
  });

  return { labels, datasets };
};

/**
 * random key generator for ChartJs
 */
export const datasetKeyProvider = () => {
  return btoa(Math.random()).substring(0, 12);
};

const resolvePath = (object, path, defaultValue) =>
  path.split(".").reduce((o, p) => (o ? o[p] : defaultValue), object);

/**
 *  This function gets an array and a property and create a map with key the property of the object
 * @param {array} array
 */
export const convertArrayToObject = (array) => {
  return array.reduce(
    (obj, item) => ({
      ...obj,
      [item["properties"]["channelId"]]: item,
    }),
    {}
  );
};
