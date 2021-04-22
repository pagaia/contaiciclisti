import axios from 'axios';

const { GoogleSpreadsheet } = require('google-spreadsheet');

const readDevices = async () => {
    // fetch data from a url endpoint
    const response = await axios.get('/api/devices');
    const { data } = response;

    const devices = data.map((row, idx) => {
        const {
            location,
            name,
            description,
            newColor,
            active,
            _id: channelId,
        } = row;

        let device = {
            type: 'Feature',
            geometry: location,
            properties: {
                name,
                description,
                active,
                channelId, // convert to number to match route
                backgroundColor: `${newColor}33`, //color.replace("X", "0.2"),
                borderColor: `${newColor}FF`, // color.replace("X", "1"),
                hoverBackgroundColor: `${newColor}99`, // color.replace("X", "0.6"),
            },
        };

        return device;
    });
    return devices;
};

const readDevicesFromGoogle = async (title = 'Devices') => {
    // setup the google spread sheet
    const doc = new GoogleSpreadsheet(process.env.REACT_APP_GOOGLE_FILE);

    // set up the API KEY
    doc.useApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = doc.sheetsByTitle[title]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

    const rows = await sheet.getRows();

    const devices = rows.map((row, idx) => {
        const {
            long,
            lat,
            name,
            channelId,
            description,
            newColor,
            active,
        } = row;

        let device = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [long, lat],
            },
            properties: {
                name,
                description,
                active,
                channelId: parseInt(channelId, 10), // convert to number to match route
                backgroundColor: `${newColor}33`, //color.replace("X", "0.2"),
                borderColor: `${newColor}FF`, // color.replace("X", "1"),
                hoverBackgroundColor: `${newColor}99`, // color.replace("X", "0.6"),
            },
        };

        return device;
    });

    return devices;
};

export const readRipettaLevel = async () => {
    // setup the google spread sheet
    const doc = new GoogleSpreadsheet(
        process.env.REACT_APP_GOOGLE_FILE_RIPETTA
    );

    // set up the API KEY
    doc.useApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

    await doc.loadInfo(); // loads document properties and worksheets

    // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle["Ripetta"]
    const sheet = doc.sheetsByTitle['Ripetta'];
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

export default readDevices;
