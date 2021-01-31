const { readDevices } = require("./googleSheet");
const axios = require("axios");
const Fs = require("fs");
const Path = require("path");
const { getLastMonthStartEnd } = require("./utility");
const DEVICE_URL = "https://api.thingspeak.com/channels/CHANNELID/feeds.csv";

async function downloadCsvFiles() {
  const devices = await readDevices();

  const { start, end } = getLastMonthStartEnd();

  devices.forEach(async (device) => {
    // replace with channelID
    const apiEndPoint =
      DEVICE_URL.replace(/CHANNELID/, device.properties.channelId) +
      `?start=${start}&end=${end}`;

    console.log({ apiEndPoint });
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

    const dir = Path.resolve(__dirname, `data/${channelID}`);

    if (!Fs.existsSync(dir)) {
      Fs.mkdirSync(dir);
    }

    const path = Path.resolve(
      __dirname,
      `data/${channelID}`,
      `${channelID}_${start}_${end}.csv`
    );

    const writer = Fs.createWriteStream(path);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  });
}

downloadCsvFiles();
