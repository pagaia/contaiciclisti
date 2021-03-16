const { format } = require("date-fns");

/**
 * This function get the date and return a string in format "yyyy-MM-dd"
 * @param {Date} date
 * return {String}
 */
const formatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

/**
 * calculate the start and end date for previous month
 */
const getLastMonthStartEnd = () => {
  let end = new Date(); // get today
  end.setDate(end.getDate() - 1); // get yesterday
  let start = new Date(end);
  start.setDate(start.getDate() - 31); // get 30 days before yesterday
  end = formatDate(end);
  start = formatDate(start);

  return { start, end };
};

module.exports = {
  formatDate,
  getLastMonthStartEnd,
};
