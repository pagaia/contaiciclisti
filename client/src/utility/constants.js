export const CHART_COLORS = {
    RED: {
        backgroundColor: 'rgba(185, 33, 3, 0.2)',
        borderColor: 'rgba(185, 33, 3, 1)',
        hoverBackgroundColor: 'rgba(185, 33, 3, 0.6)',
    },
    ORANGE: {
        backgroundColor: 'rgba(233, 122, 24, 0.2)',
        borderColor: 'rgba(233, 122, 24, 1)',
        hoverBackgroundColor: 'rgba(233, 122, 24, 0.6)',
    },
    BLUE: {
        backgroundColor: 'rgba(17, 162, 220, 0.2)',
        borderColor: 'rgba(17, 162, 220, 1)',
        hoverBackgroundColor: 'rgba(17, 162, 220, 0.6)',
    },
    YELLOW: {
        backgroundColor: 'rgba(254, 182, 1, 0.2)',
        borderColor: 'rgba(254, 182, 1, 1)',
        hoverBackgroundColor: 'rgba(254, 182, 1, 0.6)',
    },
    GREEN: {
        backgroundColor: '#b166e033',
        borderColor: '#b166e0FF',
        hoverBackgroundColor: '#b166e099',
    },
    CYAN: {
        backgroundColor: '#5fa08933',
        borderColor: '#5fa089FF',
        hoverBackgroundColor: '#5fa08999',
    },
    PURPLE: {
        backgroundColor: '#88007833',
        borderColor: '#880078FF',
        hoverBackgroundColor: '#88007899',
    },
    MAGENTA: {
        backgroundColor: '#005ce633',
        borderColor: '#005ce6FF',
        hoverBackgroundColor: '#005ce699',
    },
    NINE: {
        backgroundColor: '#8a69ff33',
        borderColor: '#8a69ffFF',
        hoverBackgroundColor: '#8a69ff99',
    },
    TEN: {
        backgroundColor: '#00cc9933',
        borderColor: '#00cc99FF',
        hoverBackgroundColor: '#00cc9999',
    },
    ELEVEN: {
        backgroundColor: '#00ccff33',
        borderColor: '#00ccffFF',
        hoverBackgroundColor: '#00ccff99',
    },
    TWELVE: {
        backgroundColor: '##ffcc0033',
        borderColor: '##ffcc00FF',
        hoverBackgroundColor: '##ffcc0099',
    },
};

export const DEVICE_MAIN_URL = 'https://thingspeak.com/channels/';
// export const DEVICE_MAIN_URL = 'http://localhost:8081/';

// WARNINGGGGG DEVICE URL AND FIELDS
export const DEVICE_URL = '/api/devices/DEVICE/feeds?timezone=Europe/Rome';

// changed on Thinkspeak, now they use the FIELD number 
// export const DEVICE_FIELDS = 'https://api.thingspeak.com/channels/DEVICE/fields/FIELD.json';

export const DEVICE_FIELDS = '/api/devices/DEVICE/feeds?timezone=Europe/Rome';

export const DEVICE_URL_LAST = '/api/devices/DEVICE/feeds?timezone=Europe/Rome';

export const REGEX_DEVICE = /DEVICE/;

/**
 *
 */
export const REGEX_FIELD = /FIELD/;

/**
 * days of the week to be converted from number to string 0=Sunday ...
 */
export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * used to match the location path
 */
export const REGEX_SINGLE = /^\/single/;

export const CHART = { BAR: 'BAR', LINE: 'LINE', RADAR: 'RADAR' };

export const LANGUAGES = [
    {
        code: 'en',
        name: 'English',
    },
    {
        code: 'it',
        name: 'Italian',
    },
];
