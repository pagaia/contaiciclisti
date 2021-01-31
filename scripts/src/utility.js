const { format } = require("date-fns");

/**
 * This function get the date and return a string in format "yyyy-MM-dd"
 * @param {Date} date
 * return {String}
 */
const formatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

exports.formatDate = formatDate;
