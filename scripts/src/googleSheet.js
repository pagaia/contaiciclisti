const { GoogleSpreadsheet } = require("google-spreadsheet");
const dotenv = require('dotenv');
dotenv.config();

const readDevices = async () => {
  // setup the google spread sheet
  const doc = new GoogleSpreadsheet(process.env.REACT_APP_GOOGLE_FILE);

  // set up the API KEY
  doc.useApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

  const rows = await sheet.getRows();

  const devices = rows.map((row, idx) => {
    const { long, lat, name, channelId, color, description } = row;
    let device = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [long, lat],
      },
      properties: {
        name,
        description,
        channelId: parseInt(channelId, 10), // convert to number to match route
        backgroundColor: color.replace("X", "0.2"),
        borderColor: color.replace("X", "1"),
        hoverBackgroundColor: color.replace("X", "0.6"),
      },
    };

    return device;
  });

  return devices;
};

 const readRipettaLevel = async () => {
  // setup the google spread sheet
  const doc = new GoogleSpreadsheet(process.env.REACT_APP_GOOGLE_FILE_RIPETTA);

  // set up the API KEY
  doc.useApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

  await doc.loadInfo(); // loads document properties and worksheets

  // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle["Ripetta"]
  const sheet = doc.sheetsByTitle["Ripetta"];
  const rows = await sheet.getRows();

  const dayLevel = rows.map((row, idx) => {
    // remove first 2 rows without data
    if (idx < 2) {
      return null;
    }
    const { day, level } = row;
    return { day, level };
  });

  return dayLevel.filter((item) => item);
};

exports.readDevices = readDevices;
