const { format } = require("date-fns");

/**
 * This function get the date and return a string in format "yyyy-MM-dd"
 * @param {Date} date
 * return {String}
 */
exports.formatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

/**
 * date is the day passed to start the month, now if undefined
 * calculate the start and end date for previous month
 * E.g. 2021-01-01 - 2021-02-01
 */
exports.getLastMonthStartEnd = (date = new Date()) => {
  const y = date.getFullYear(),
    m = date.getMonth();

  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 1);

  const end = this.formatDate(lastDay);
  const start = this.formatDate(firstDay);

  return { start, end };
};

/**
 * get the milliseconds to sleep
 * @param {number} milliseconds
 * @returns
 */
exports.sleep = async (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
