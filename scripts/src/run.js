const { readDevices } = require("./googleSheet");
const downloadCsvFiles = require("./saveCsv");
const { sendMail, log } = require("./utility");

async function downloadAllMonths() {
  const devices = await readDevices();

  // pass a date to force the month or leave it undefined and the last month will be picked
  // downloadCsvFiles(devices, new Date("2020-11-01"));
  const today = new Date();
  const y = today.getFullYear(),
    previousMonth = today.getMonth() - 1;

  var start = new Date(y, previousMonth, 1);

  const files = await downloadCsvFiles(devices, start);
  log(`all files: ${files}`);
  const params = {
    to: JSON.parse(process.env.REACT_APP_MAIL_RECIPIENTS),
    cc: JSON.parse(process.env.REACT_APP_MAIL_RECIPIENTS_CC),
    bcc: JSON.parse(process.env.REACT_APP_MAIL_RECIPIENTS_BCC),
    files
  }
  sendMail(params);
}

downloadAllMonths();
