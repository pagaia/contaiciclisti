const axios = require("axios");
const { getToday, getYesterday, sleep } = require("./utility");

var myArgs = process.argv.slice(2);
console.log("myArgs: ", myArgs);

// const [token, yesterday] = myArgs;
const [yesterday] = myArgs;
let token;

/**
 * function to fetch All devices
 * @returns Array
 */
async function fetchAllDevices() {
  token = await fetchTemporaryToken();

  const { data } = await axios.get("http://localhost:8081/api/devices");
  return data;
}

async function fetchTemporaryToken() {
  const { data } = await axios.get("http://localhost:8081/api/temporaryToken", {
    accept: "application/json",
    "Content-Type": "application/json"
  });
  const { token } = data;
  return token;
}


/**
 * function to fetch details of device
 * @returns Object
 */
async function fetchDeviceDetails(deviceId) {

  const { data } = await axios.get(
    `http://localhost:8081/api/devices/${deviceId}`,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      }
    }
  );

  console.log({data})
  return data;
}

/**
 * This function is used to retrieve feeds for a single day from thingspeak
 *
 * @param {string} channelId
 * @param {string} date
 * @returns
 */
async function fetchChannelData(channelId, date) {
  console.log(
    "fetch: ",
    `https://api.thingspeak.com/channels/${channelId}/feeds.json?timezone=Europe/Rome&start=${date}`
  );
  const { data } = await axios.get(
    `https://api.thingspeak.com/channels/${channelId}/feeds.json?timezone=Europe/Rome&start=${date}`
  );
  return data;
}

/**
 * array of data to insert into the DB
 * @param {Array} data
 */
async function uploadFeeds({ feeds, accessToken, deviceId }) {
  console.log("Loading feeds for %s %s", accessToken, deviceId);

  const endPoint = `http://localhost:8081/api/devices/${deviceId}/feeds/multi`;

  const response = await axios.post(endPoint, feeds, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "x-api-token": accessToken
    }
  });
  console.log(`statusCode: ${response.status}`);
}

async function synchAllDeviceFeeds(date) {
  const devices = await fetchAllDevices();

  await devices.reduce(async (memo, ligthDevice, index) => {
    await memo;
    await sleep(2000);
    console.log(index, new Date().toISOString());

    try {
      console.log({ date });
      const device = await fetchDeviceDetails(ligthDevice._id);
      const { accessToken, channelId, _id } = device;
      const { channel, feeds } = await fetchChannelData(channelId, date);

      await uploadFeeds({ feeds, accessToken, deviceId: _id });
    } catch (error) {
      console.error({ error });
    }
  }, undefined);
}

const date = yesterday ? getYesterday() : getToday();
synchAllDeviceFeeds(date);
