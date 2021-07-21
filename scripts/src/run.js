const { readDevices } = require("./googleSheet");
const downloadCsvFiles = require("./saveCsv");
const { sendMail, log } = require("./utility");

async function downloadAllMonths(previous) {
  const devices = await readDevices();

  // pass a date to force the month or leave it undefined and the last month will be picked
  // downloadCsvFiles(devices, new Date("2020-11-01"));
  const today = new Date();
  const y = today.getFullYear(),
    previousMonth = today.getMonth() - 1;

  var start = new Date(y, previousMonth, 1);

  // if previous is true then pass the previous month, to be run once a month
  const files = await downloadCsvFiles(devices, previous && start);

  log(`all files: ${files}`);
  const params = {
    to: JSON.parse(process.env.REACT_APP_MAIL_RECIPIENTS),
    cc: JSON.parse(process.env.REACT_APP_DAILY_MAIL_RECIPIENTS_CC),
    bcc: JSON.parse(process.env.REACT_APP_DAILY_MAIL_RECIPIENTS_BCC),
    files
  };

  // if previous month, override recipients
  if (previous) {
    params.cc = JSON.parse(process.env.REACT_APP_MAIL_RECIPIENTS_CC);
    params.bcc = JSON.parse(process.env.REACT_APP_MAIL_RECIPIENTS_BCC);
  }

  sendMail(params);
  log("-----------------");
  log("------- END ------");
}

// skip node processor and script itself
var myArgs = process.argv.slice(2);
console.log("myArgs: ", myArgs);

const previousMonth = myArgs[0];

downloadAllMonths(previousMonth);
