const { format, utcToZonedTime } = require("date-fns-tz");

/**
 * Compare 2 object based on createdAt property
 * @param {feed} a
 * @param {feed} b
 * @returns
 */
exports.compare = (a, b) => {
  if (a.createdAt < b.createdAt) {
    return -1;
  }
  if (a.createdAt > b.createdAt) {
    return 1;
  }
  return 0;
};

/**
 *  format the date in the reauested time zone
 * @param {Date} date the date to convert
 * @param {String} tzString The Tilme zone "Europe/rome"
 * @returns {String}
 */
exports.formatTimeZone = (date, tzString) =>
  format(utcToZonedTime(date, tzString), "yyyy-MM-dd HH:mm:ss zzz", {
    timeZone: tzString,
  });
