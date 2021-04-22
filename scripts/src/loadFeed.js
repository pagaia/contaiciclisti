const axios = require("axios");
const fs = require("fs");
const Path = require("path");

var myArgs = process.argv.slice(2);
console.log("myArgs: ", myArgs);

const [deviceId, path] = myArgs;

if (!deviceId || !path) {
  console.error("Please pass the device ID and the file to load");
  process.exit(1);
}

const endPoint = `http://localhost:8081/api/devices/${deviceId}/feeds/multi`;

// first read the file
fs.readFile(path, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File read!");
  uploadFeeds(data.split("\n"));
});

function uploadFeeds(data) {
  // console.log(data);
  const feeds = data
    .map((feed, idx) => {
      // if (!idx || idx < 100 || idx > 105) {
      if (!idx) {
        return {};
      }
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
        field8,
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
        field8,
      };
    })
    // filter the row with null created_at
    .filter((el) => el.created_at);

  // console.log(feeds);

  axios
    .post(endPoint, feeds, {
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
}
