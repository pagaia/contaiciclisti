const { readDevices } = require("./googleSheet");
const axios = require("axios");
const Fs = require("fs");
const Path = require("path");
const { getLastMonthStartEnd, sleep } = require("./utility");

const DEVICE_URL = "https://api.thingspeak.com/channels/CHANNELID/feeds.csv";

async function downloadCsvFiles(devices, date) {
  const { start, end } = getLastMonthStartEnd(date);

  devices.forEach((device, index) => {
    async function call() {
      // replace with channelID
      const apiEndPoint =
        DEVICE_URL.replace(/CHANNELID/, device.properties.channelId) +
        `?start=${start}&end=${end}`;

      console.log(`Dowloading file from ${apiEndPoint}`);

      // fetch the device data
      const response = await axios
        .get(apiEndPoint, {
          method: "GET",
          responseType: "stream",
        })
        .catch((error) => {
          console.log(error);
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
      console.log(`Saving file to ${path}`);

      const writer = Fs.createWriteStream(path);

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
    }

    sleep(3000 * index).then(() => {
      call();
      console.log("let's wait 3 sec");
    });
  });
}

module.exports = downloadCsvFiles;
