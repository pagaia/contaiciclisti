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
};

export const DEVICE_MAIN_URL = 'https://thingspeak.com/channels/';

export const DEVICE_URL =
    'https://api.thingspeak.com/channels/DEVICE/feeds.json?timezone=Europe/Rome';

export const DEVICE_FIELDS =
    'https://api.thingspeak.com/channels/DEVICE/fields/FIELD.json';

export const DEVICE_URL_LAST =
    'https://api.thingspeak.com/channels/DEVICE/feeds/last.json?timezone=Europe/Rome';

export const REGEX_DEVICE = /DEVICE/;

/**
 *
 */
export const REGEX_FIELD = /FIELD/;

/**
 * days of the week to be converted from number to string 0=Sunday ...
 */
export const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

/**
 * used to match the location path
 */
export const REGEX_SINGLE = /^\/single/;

export const CHART = { BAR: 'BAR', LINE: 'LINE' };

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