const { format, utcToZonedTime } = require("date-fns-tz");

/**
 * Compare 2 object based on created_at property
 * @param {feed} a
 * @param {feed} b
 * @returns
 */
exports.compareCreatedAt = (a, b) => {
  if (a.created_at < b.created_at) {
    return -1;
  }
  if (a.created_at > b.created_at) {
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
exports.formatTimeZone = (date, tzString) => {
  // console.log({ date, tzString });
  if (!date) {
    return null;
  }
  return format(utcToZonedTime(date, tzString), "yyyy-MM-dd HH:mm:ssXXX", {
    timeZone: tzString,
  });
};
