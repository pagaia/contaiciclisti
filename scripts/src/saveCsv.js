const axios = require("axios");
const Fs = require("fs");
const Path = require("path");
const { getLastMonthStartEnd, sleep, log } = require("./utility");

const DEVICE_URL = "https://api.thingspeak.com/channels/CHANNELID/feeds.csv";

async function downloadCsvFiles(devices, date) {
  const { start, end } = getLastMonthStartEnd(date);
  const files = [];

  const calls = devices.map((device, index) => {
    async function call() {
      // replace with channelID
      const apiEndPoint =
        DEVICE_URL.replace(/CHANNELID/, device.properties.channelId) +
        `?start=${start}&end=${end}`;

      log(`Dowloading file from ${apiEndPoint}`);

      // fetch the device data
      const response = await axios
        .get(apiEndPoint, {
          method: "GET",
          responseType: "stream",
        })
        .catch((error) => {
          log(error);
        });

      const channelID = device.properties.channelId;

      const dir = Path.resolve(__dirname, `../data/${channelID}`);

      if (!Fs.existsSync(dir)) {
        Fs.mkdirSync(dir);
      }

      const path = Path.resolve(
        __dirname,
        `../data/${channelID}`,
        `${channelID}_${start}_${end}.csv`
      );
      log(`Saving file to ${path}`);

      const writer = Fs.createWriteStream(path);

      response.data.pipe(writer);

      // save the file in a variable
      files.push(path);

      return new Promise((resolve, reject) => {
        writer.on("finish", () => resolve(path));
        writer.on("error", reject);
      });
    }

    return sleep(3000).then(() => {
      return call();
    });
  });

  const results = Promise.all(calls);

  return results.then((files) => {
    log({ data: files });
    return files;
  });
}

module.exports = downloadCsvFiles;
