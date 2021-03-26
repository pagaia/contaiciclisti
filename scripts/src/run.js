const { readDevices } = require("./googleSheet");
const downloadCsvFiles = require("./saveCsv");
const { sendMail, log } = require("./utility");

async function downloadAllMonths() {
  const devices = await readDevices();

  // pass a date to force the month or leave it undefined and the last month will be picked
  // downloadCsvFiles(devices, new Date("2020-11-01"));
  const files = await downloadCsvFiles(devices);
  log(`all files: ${files}`);
  sendMail(JSON.parse(process.env.REACT_APP_MAIL_RECIPIENTS), files);
}

downloadAllMonths();
