import { format } from 'date-fns';
import { CHART_COLORS, DAYS } from './constants';
import { eachWeekOfInterval } from 'date-fns';
import { useLocation } from 'react-router-dom';
/**
 * This function get the date and return a string in format "yyyy-MM-dd"
 * @param {Date} date
 * return {String}
 */
export const formatDate = (date) => {
    return format(date, 'yyyy-MM-dd');
};

/**
 * This functions gets a month and return the translated Month name
 * @param {string} month - the month in number
 * @param {string} lang - the language
 * @returns
 */
export function getMonthName(month, lang) {
    const d = new Date();
    d.setMonth(month - 1);
    const monthName = d.toLocaleString(lang, { month: 'long' });
    return monthName;
}

/**
 * This function get the date and return a string in format "yyyy-MM-dd HH:mm"
 * @param {Date} date
 * return {String}
 */
export const formatDateAndHours = (date) => {
    return format(date, 'yyyy-MM-dd HH:mm');
};

/**
 * calculate the start and end date for today
 */
export const getBeginningOfToday = () => {
    let start = new Date();
    return formatDate(start);
};

/**
 * calculate the start and end date for yesterday
 */
export const getYesterdayStartEnd = () => {
    let end = new Date();
    let start = new Date(end);

    start.setDate(start.getDate() - 1);

    end = formatDate(end);
    start = formatDate(start);

    return { start, end };
};

/**
 * calculate the start and end date for previous month
 */
export const getLastMonthStartEnd = (day = new Date()) => {
    let end = day;
    end.setDate(end.getDate() - 1); // get yesterday
    let start = new Date(end);
    start.setDate(start.getDate() - 31); // get 30 days before yesterday
    end = formatDate(end);
    start = formatDate(start);

    return { start, end };
};

/**
 * gets next month start and end date
 * @param {Date} day
 * @returns
 */
export const getNextMonth = (day = new Date()) => {
    const date = day;
    const y = date.getFullYear(),
        m = date.getMonth(),
        d = date.getDate();

    var firstDay = new Date(y, m + 1, d);
    var lastDay = new Date(y, m + 2, d);

    const end = formatDate(lastDay);
    const start = formatDate(firstDay);

    return { start, end };
};

/**
 * gets previous month start and end date
 * @param {Date} day
 * @returns
 */
export const getPreviousMonths = (day = new Date(), numberOfMonths = 1) => {
    const date = day;
    const y = date.getFullYear(),
        m = date.getMonth(),
        d = date.getDate();

    var firstDay = new Date(y, m - numberOfMonths, d);
    var lastDay = new Date(y, m, d);

    const end = formatDate(lastDay);
    const start = formatDate(firstDay);

    return { start, end };
};

/**
 * This function return an array of {number} weeks from {date} backwards
 */
export const getWeeks = (date) => {
    let today = new Date();
    const start = new Date(date);

    // start.setDate(start.getDate() - number * 7);

    const result = eachWeekOfInterval(
        {
            start,
            end: today,
        },
        { weekStartsOn: 1 }
    );

    const weeks = result.map((week) => {
        const sunday = new Date(week);
        sunday.setDate(sunday.getDate() + 6);
        return {
            monday: week,
            sunday,
        };
    });

    return weeks.reverse();
};

/**
 * calculate the start and end date for previous month
 */
export const getLastMonthStartEndDatePicker = () => {
    let end = new Date(); // get today
    end.setDate(end.getDate() - 1); // get yesterday
    let start = new Date(end);
    start.setDate(start.getDate() - 31); // get 30 days before yesterday
    return { start, end };
};

/**
 * This function gets the list of counts and device information and build labels and datasets for hourly counts
 *
 * @param {Array} feeds
 * @param {Object} device
 */
export const buildDataHourly = (feeds, device) => {
    const { name: label, backgroundColor, borderColor, hoverBackgroundColor } = device.properties;

    const labels = [...Array(24).keys()];

    const datasets = [
        {
            label,
            backgroundColor: backgroundColor || 'rgba(54, 162, 235, 0.2)',
            borderColor: borderColor || 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hoverBackgroundColor: hoverBackgroundColor || 'rgba(255,99,132,0.4)',
            // hoverBorderColor: "rgba(255,99,132,1)",
            data: [],
        },
    ];

    feeds.forEach((feed) => {
        if (feed.field1 >= 0) {
            const hour =
                feed.created_at.substring(11, 12) === '0'
                    ? feed.created_at.substring(12, 13)
                    : feed.created_at.substring(11, 13);
            datasets[0].data.push(parseInt(feed.field1, 10));
        }
    });
    return { labels, datasets };
};

/**
 * This function gets the list of counts and device information and build labels and datasets for hourly counts
 *
 * @param {Array} feeds
 * @param {Object} device
 */
export const buildDataDaily = (feeds, device) => {
    const { name: label, backgroundColor, borderColor, hoverBackgroundColor } = device.properties;

    const labels = [];
    const datasets = [
        {
            label,
            backgroundColor: backgroundColor || 'rgba(54, 162, 235, 0.2)',
            borderColor: borderColor || 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hoverBackgroundColor: hoverBackgroundColor || 'rgba(255,99,132,0.4)',
            // hoverBorderColor: "rgba(255,99,132,1)",
            data: [],
            fill: false,
        },
    ];

    feeds.forEach((feed) => {
        if (feed.field3) {
            const day = new Date(feed.created_at).getDay();
            if (day === 0 || day === 6) {
                labels.push(DAYS[day]);
            } else {
                labels.push(feed.created_at.substring(0, 10));
            }
            datasets[0].data.push(parseInt(feed.field3, 10));
        }
    });
    return { labels, datasets };
};

/**
 * Gets 2 dates and returns an array with all days
 *
 * @param {Date} startDate - start date
 * @param {Date} endDate - end date
 */
export const getDatesBetweenDates = (startDate, endDate) => {
    let dates = [];
    //to avoid modifying the original date
    const theDate = new Date(startDate);
    const end = new Date(endDate);

    while (theDate < end) {
        const currentDay = formatDate(theDate);
        dates = [...dates, currentDay];
        theDate.setDate(theDate.getDate() + 1);
    }
    return dates;
};

/**
 * This function gets the list of counts and device information and build labels and datasets for total daily counts
 *
 * @param {Array} feeds
 * @param {Object} device
 */
export const buildDailyCompare = (feeds, device, labels) => {
    const { name: label, backgroundColor, borderColor, hoverBackgroundColor } = device.properties;

    const dataset = {
        label,
        backgroundColor: backgroundColor || 'rgba(54, 162, 235, 0.2)',
        borderColor: borderColor || 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: hoverBackgroundColor || 'rgba(255,99,132,0.4)',
        data: [],
        fill: false,
        yAxisID: 'y-axis-1',
    };

    const dateFound = {};
    feeds.forEach((feed) => {
        if (feed.field3) {
            dateFound[feed.created_at.substring(0, 10)] = parseInt(feed.field3, 10);
        }
    });

    // double check data per day
    labels.forEach((day) => {
        dataset.data.push(dateFound[day]);
    });

    return dataset;
};

/**
 * `this function gets array of feeds and labels and splits the the counts per day for each month
 * @param {array} feeds - array of feeds
 * @param {array} labels - array of labels/days
 * @returns {array} array of dataset
 */
export const buildDailyMonthsCompare = (feeds, labels, lang) => {
    const dataset = {
        borderWidth: 1,
        data: null,
        fill: false,
    };

    const dateFound = {};
    const datasets = [];
    // initialise month
    let month = feeds[0].created_at.substring(5, 7);
    feeds.forEach((feed) => {
        if (feed.field3) {
            if (feed.created_at.substring(5, 7) != month) {
                month = feed.created_at.substring(5, 7);
            }
            // initilise map for new month
            if (!dateFound[month]) {
                dateFound[month] = {};
            }

            // save into the day number
            const dateNumber =
                feed.created_at.substring(8, 9) === '0'
                    ? feed.created_at.substring(9, 10)
                    : feed.created_at.substring(8, 10);

            dateFound[month][dateNumber] = parseInt(feed.field3, 10);
        }
    });

    Object.keys(dateFound).forEach((month, idx) => {
        datasets[idx] = {
            ...dataset,
            label: getMonthName(month, lang),
            ...Object.values(CHART_COLORS)[idx],
        };
    });

    // double check data per day
    labels.forEach((day) => {
        // for each months
        Object.keys(dateFound).forEach((month, idx) => {
            if (!datasets[idx].data) {
                // initialise array
                datasets[idx].data = [];
            }
            datasets[idx].data.push(dateFound[month][day]);
        });
    });

    console.log({ datasets });
    return datasets;
};

/**
 * This function gets the list of counts and device information and build labels and datasets for total daily counts
 *
 * @param {Array} feeds
 * @param {Object} device
 */
export const buildDailyTevereLevel = (feeds, labels) => {
    const dataset = {
        label: 'Tevere level',
        backgroundColor: 'rgba(178, 178, 76, 0.1)',
        borderColor: 'rgba(178, 178, 76, 0.1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(178, 178, 76, 0.1)',
        data: [],
        fill: false,
        type: 'bar',
        yAxisID: 'y-axis-2',
    };

    const dateFound = {};
    feeds.forEach((feed = {}) => {
        // console.log({ feed });
        if (feed) {
            const { day, level } = feed;
            if (day) {
                const swapDate = `${day.substring(6, 10)}-${day.substring(3, 5)}-${day.substring(
                    0,
                    2
                )}`;
                // console.log({ swapDate });
                dateFound[swapDate] = Number.parseFloat(level).toFixed(2);
            }
        }
    });

    // double check data per day
    labels.forEach((day) => {
        dataset.data.push(dateFound[day] || '');
    });

    return dataset;
};

/**
 * This function gets the list of counts and device information and build labels and datasets for hourly counts
 *
 * @param {Array} feeds
 * @param {Object} device
 */
export const buildHourlyCompare = (feeds, device, labels) => {
    const { name: label, backgroundColor, borderColor, hoverBackgroundColor } = device.properties;

    const dataset = {
        label,
        backgroundColor: backgroundColor || 'rgba(54, 162, 235, 0.2)',
        borderColor: borderColor || 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: hoverBackgroundColor || 'rgba(255,99,132,0.4)',
        data: [],
        fill: false,
    };

    const dateFound = {};
    feeds.forEach((feed) => {
        const hour =
            feed.created_at.substring(11, 12) === '0'
                ? feed.created_at.substring(12, 13)
                : feed.created_at.substring(11, 13);
        // set the key as the day and time
        dateFound[hour] = parseInt(feed.field1, 10);
    });

    // double check data per day
    labels.forEach((day) => {
        dataset.data.push(dateFound[day]);
    });

    return dataset;
};

/**
 * Utility function to sum up an array of numbers
 * @param {Number} accumulator
 * @param {Number} currentValue
 */
const sumReducer = (accumulator, currentValue) => accumulator + currentValue;

/**
 *  This function gets the list of counts and device information and build labels and datasets for Daily Average counts
 *  for days of the week
 *
 * @param {Array} feeds
 * @param {Object} device
 */
export const buildDataDailyAverage = (feeds, device) => {
    const { name: label, backgroundColor, borderColor, hoverBackgroundColor } = device.properties;

    const dataset = {
        label,
        backgroundColor: backgroundColor || 'rgba(54, 162, 235, 0.2)',
        borderColor: borderColor || 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: hoverBackgroundColor || 'rgba(255,99,132,0.4)',
        data: [],
    };

    const weekDays = [];

    feeds.forEach((feed) => {
        if (feed.field3) {
            // 0 Sunday, 1 Monday, etc...
            const dayNumber = new Date(feed.created_at).getDay();
            const field = parseInt(feed.field3, 10);
            if (weekDays[dayNumber]) {
                weekDays[dayNumber].push(field);
            } else {
                weekDays[dayNumber] = [field];
            }
        }
    });

    for (let i = 1; i < 7; i++) {
        weekDays[i] &&
            dataset.data.push(parseInt(weekDays[i].reduce(sumReducer) / weekDays[i].length, 10));
    }
    dataset.data.push(
        weekDays[0] && parseInt(weekDays[0].reduce(sumReducer) / weekDays[0].length, 10)
    );

    return dataset;
};

/**
 *  this function gets a list of labels for date and replace the weekdays with the name Sunday/Saturday
 * @param {Array} days
 */
export const replaceWeekendDays = (days) => {
    return days?.map?.((day) => {
        let currentDay = new Date(day);

        // Sunday
        if (currentDay.getDay() === 0) {
            currentDay = 'Sunday';
        }
        // Saturday
        else if (currentDay.getDay() === 6) {
            currentDay = 'Saturday';
        } else {
            currentDay = day;
        }

        return currentDay;
    });
};

/**
 * This function gets the list of counts and days array and build datasets for Peak time
 *
 * @param {Array} feeds
 * @param {Array} labels - days array
 */
export const buildPeakTime = (feeds, labels) => {
    const datasets = [
        {
            label: 'Peak hours',
            ...CHART_COLORS.ORANGE,
            borderWidth: 1,
            data: [],
            yAxisID: 'y-axis-1',
        },
        {
            label: 'Counts',
            borderWidth: 1,
            ...CHART_COLORS.BLUE,
            data: [],
            yAxisID: 'y-axis-2',
        },
    ];

    const peak = {};

    feeds.forEach((feed) => {
        if (feed.field1) {
            const day = formatDate(new Date(feed.created_at));
            const hour = new Date(feed.created_at).getHours();
            const counts = parseInt(feed.field1, 10);

            if (peak[day]) {
                peak[day].push({ hour, counts });
            } else {
                peak[day] = [{ hour, counts }];
            }
        }
    });

    // double check data per day
    labels.forEach((day) => {
        if (peak[day]) {
            const arrayCounts = peak[day].map((el) => el.counts);
            const max = Math.max(...arrayCounts);
            const peakTime = peak[day].find((el) => el.counts === max).hour;
            datasets[0].data.push(peakTime);
            datasets[1].data.push(max);
        } else {
            // added placeholder for missing counts
            datasets[0].data.push(null);
            datasets[1].data.push(null);
        }
    });

    return datasets;
};

/**
 * This function gets the list of counts and device information and build labels and datasets for hourly Average counts
 *
 * @param {Array} feeds
 */
export const buildHourlyAverage = (feeds) => {
    const labels = [...Array(24).keys()];

    const datasets = [
        {
            label: 'Weekdays',
            ...CHART_COLORS.ORANGE,
            borderWidth: 1,
            data: [],
        },
        {
            label: 'Saturday',
            borderWidth: 1,
            ...CHART_COLORS.BLUE,
            data: [],
        },
        {
            label: 'Sunday',
            borderWidth: 1,
            ...CHART_COLORS.YELLOW,
            data: [],
        },
    ];

    const weekDays = [];
    const saturday = [];
    const sunday = [];

    feeds.forEach((feed) => {
        if (feed.field1 >= 0) {
            const day = new Date(feed.created_at).getDay();
            const hour = new Date(feed.created_at).getHours();

            // Sunday
            if (day === 0) {
                if (sunday[hour]) {
                    sunday[hour].push(parseInt(feed.field1, 10));
                } else {
                    sunday[hour] = [parseInt(feed.field1, 10)];
                }
            }
            // Saturday
            if (day === 6) {
                if (saturday[hour]) {
                    saturday[hour].push(parseInt(feed.field1, 10));
                } else {
                    saturday[hour] = [parseInt(feed.field1, 10)];
                }
            }

            // weekdays
            if (1 <= day <= 5) {
                if (weekDays[hour]) {
                    weekDays[hour].push(parseInt(feed.field1, 10));
                } else {
                    weekDays[hour] = [parseInt(feed.field1, 10)];
                }
            }
        }
    });

    // adding hourly Average  for week days
    weekDays.forEach((hour) => {
        datasets[0].data.push(parseInt(hour.reduce(sumReducer) / hour.length, 10));
    });

    // adding hourly Average  for saturday
    saturday.forEach((hour) => {
        datasets[1].data.push(parseInt(hour.reduce(sumReducer) / hour.length, 10));
    });

    // adding hourly Average  for sunday
    sunday.forEach((hour) => {
        datasets[2].data.push(parseInt(hour.reduce(sumReducer) / hour.length, 10));
    });

    return { labels, datasets };
};

/**
 * random key generator for ChartJs
 */
export const datasetKeyProvider = () => {
    return btoa(Math.random()).substring(0, 12);
};

const resolvePath = (object, path, defaultValue) =>
    path.split('.').reduce((o, p) => (o ? o[p] : defaultValue), object);

/**
 *  This function gets an array and a property and create a map with key the property of the object
 * @param {array} array
 */
export const convertArrayToObject = (array) => {
    return array.reduce(
        (obj, item) => ({
            ...obj,
            [item['properties']['channelId']]: item,
        }),
        {}
    );
};

// A custom hook that builds on useLocation to parse
// the query string for you.
export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// A custom hook that builds on useLocation to parse
// the hash string for you.
export function useHash() {
    return new URLSearchParams(useLocation().hash);
}

/**
 * return true if the 2 objects have the same properties and values·
 * @param {object} object1
 * @param {object} object2
 */
export function deepEqual(object1, object2) {
    if (!object1 || !object2) {
        return false;
    }
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
            return false;
        }
    }

    return true;
}

function isObject(object) {
    return object != null && typeof object === 'object';
}
