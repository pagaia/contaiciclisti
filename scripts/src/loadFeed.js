const axios = require("axios");
const fs = require("fs");
const Path = require("path");

var myArgs = process.argv; //.slice(2);
console.log("myArgs: ", myArgs);

const [node, script, deviceId, path, token] = myArgs;

// curl -X GET "http://localhost:8081/api/devices/608741ca57523b3bf1f25231" \
// -H  "accept: application/json" \
// -H "authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiV2VsY29tZSIsImlhdCI6MTYxOTQ3NzgzOSwiZXhwIjoxNjE5NDc4NzM5fQ.z5Qodr5T1bHz08WWpxNdUkVruFkXzk5gvHEQ75WAZHY"

// curl -X POST "http://localhost:8081/api/devices/608741ca57523b3bf1f25231/generateToken" -H  "accept: application/json"  \
// -H "authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiV2VsY29tZSIsImlhdCI6MTYxOTQ3NzgzOSwiZXhwIjoxNjE5NDc4NzM5fQ.z5Qodr5T1bHz08WWpxNdUkVruFkXzk5gvHEQ75WAZHY"

if (!deviceId || !path) {
  console.error("Please pass the device ID and the file to load");
  console.error(`- node ${script} deviceId fileToLoad Token`);

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
  const feeds = data.map((feed, idx) => {
    // if (!idx || idx < 100 || idx > 105) {
    if (!idx) {
      return null;
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

  // console.log(feeds);
  // return
  axios
    .post(
      endPoint,
      feeds.filter((row) => row),
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "x-api-token": token
        }
      }
    )
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`);
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
}
