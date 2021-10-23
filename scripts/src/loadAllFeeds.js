const axios = require("axios");
const fs = require("fs");
const Path = require("path");
const util = require("util");
const fsPromises = require("fs").promises;

const readdir = util.promisify(fs.readdir);

var myArgs = process.argv.slice(2);
console.log("myArgs: ", myArgs);

// const [deviceId, path] = myArgs;

/**
 * function to fetch All devices
 * @returns Array
 */
async function fetchAllDevices() {
  const { data } = await axios.get("http://localhost:8081/api/devices");
  return data;
}

/**
 * function to fetch details of device
 * @returns Object
 */
async function fetchDeviceDetails(deviceId) {
  const { data } = await axios.get(
    `http://localhost:8081/api/devices/${deviceId}`
  );
  return data;
}

/**
 * function to get all csv files for a specific device by channelId
 * @param {string} channelId
 * @returns
 */
async function getFiles(channelId) {
  //joining path of directory
  const directoryPath = Path.join(__dirname, `../data/${channelId}`);
  console.log({ directoryPath });
  //passsing directoryPath and callback function
  const files = await readdir(directoryPath);
  console.log({ files });

  //listing all files using forEach
  const fullFiles = files.map((file) => {
    // Do whatever you want to do with the file
    const fullPathFile = `${directoryPath}/${file}`;
    console.log(fullPathFile);

    return fullPathFile;
  });

  return fullFiles;
}

/**
 * array of data to insert into the DB
 * @param {Array} data
 */
function uploadFeeds({ data, accessToken, deviceId }) {
  console.log("Loading feeds for %s %s", accessToken, deviceId);
  // console.log(data);
  const feeds = data.map((feed, idx) => {
    if (!idx) {
      return {};
    }
    //       created_at,entry_id,field1,field2,field3,field4,field5,field6,field7,field8
    // 2021-04-01 00:57:01 UTC,3311,0,0,,0,0,0,0,2188

    const [
      created_at,
      entry_id,
      field1,
      field2,
      field3,
      field4,
      field5,
      field6,
      field7,
      field8
    ] = feed.split(",");

    return {
      created_at,
      entry_id,
      field1,
      field2,
      field3,
      field4,
      field5,
      field6,
      field7,
      field8
    };
  });
  // filter the row with null created_at
  // .filter((el) => el.created_at);

  const endPoint = `http://localhost:8081/api/devices/${deviceId}/feeds/multi`;

  // console.log(feeds);
  // return
  axios
    .post(endPoint, feeds, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "x-api-token": accessToken
      }
    })
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      // console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
}

// if (!deviceId || !path) {
//   console.error("Please pass the device ID and the file to load");
//   process.exit(1);
// }

async function importAllDeviceFeeds() {
  const devices = await fetchAllDevices();

  devices.forEach(async (ligthDevice) => {
    try {
      const device = await fetchDeviceDetails(ligthDevice._id);
      const { accessToken, channelId, _id } = device;
      const files = await getFiles(channelId);
      files.forEach(async (file, idx) => {
        // exclude some devices
        // if ([1259438, 1050873].includes(channelId)) {
        //   return;
        // }

        const data = await fsPromises
          .readFile(file, "utf8")
          .catch((err) => console.error("Failed to read file", err));

        // console.log({ data });
        uploadFeeds({ data: data.split("\n"), accessToken, deviceId: _id });
      });
    } catch (error) {
      console.error({ error });
    }
  });
}

importAllDeviceFeeds();
