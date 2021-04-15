const axios = require("axios");
const fs = require("fs");
const Path = require("path");

var myArgs = process.argv.slice(2);
console.log("myArgs: ", myArgs);

const path = myArgs[0];

const endPoint =
  "http://localhost:8081/api/devices/606d848da5a31938f61a0290/feeds/multi";

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
  console.log(data);
  const feeds = data
    .map((feed, idx) => {
      // if (!idx || idx < 100 || idx > 105) {
      if (!idx) {
        return {};
      }
      const [
        createdAt,
        entry_id,
        feed1,
        feed2,
        feed3,
        feed4,
        feed5,
        feed6,
        feed7,
        feed8,
      ] = feed.split(",");

      return {
        createdAt,
        entry_id,
        feed1,
        feed2,
        feed3,
        feed4,
        feed5,
        feed6,
        feed7,
        feed8,
      };
    })
    // filter the row with null createdAt
    .filter((el) => el.createdAt);

  console.log(feeds);

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
