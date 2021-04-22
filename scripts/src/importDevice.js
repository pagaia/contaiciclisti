const { default: axios } = require("axios");
const { readDevices } = require("./googleSheet");

const endPoint = "http://localhost:8081/api/devices";

async function importDevices() {
  const devices = await readDevices();

  devices.forEach((device) => {
    const payload = {
      name: device.properties.name,
      channelId: device.properties.channelId,
      location: {
        type: "Point",
        coordinates: [...device.geometry.coordinates],
      },
      description: device.properties.description,
      active: true,
      newColor: device.properties.newColor,
      created_at: new Date(),
    };

    axios
      .post(endPoint, payload, {
        accept: "application/json",
        "Content-Type": "application/json",
      })
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

importDevices();