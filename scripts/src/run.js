// # simple script to export last month for all devices

const { readDevices } = require("./googleSheet");
const downloadCsvFiles = require("./saveCsv");

async function downloadAllMonths() {
  const devices = await readDevices();
  
  // pass a date to force the month or leave it undefined and the last month will be picked
  // downloadCsvFiles(devices, new Date("2020-11-01"));
  downloadCsvFiles(devices);
}

downloadAllMonths();
