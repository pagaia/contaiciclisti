import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DEVICE_URL, REGEX_DEVICE } from 'utility/constants';
import { buildHourlyAverage } from 'utility/utilityFunctions';

// First, create the thunk
export const fetchHourlyAverageCounts = createAsyncThunk(
    'device/fetchHourlyAverageCounts',
    async ({ device, start, end }, thunkAPI) => {
        // replace with channelID
        const apiEndPoint =
            DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) +
            `&start=${start}&end=${end}`;

        const response = await axios.get(apiEndPoint);
        return response.data;
    }
);

export const chartsSlide = createSlice({
    name: 'charts',
    initialState: {
        devices: {},
        dailyAverage: [],
        dailyCompare: {},
        hourlyCompare: {},
    },
    reducers: {
        receiveDailyAverage: (state, action) => {
            state.dailyAverage = action.payload;
        },
        receiveHourlyCompare: (state, action) => {
            state.hourlyCompare = action.payload;
        },
        receiveDailyCompare: (state, action) => {
            const name = action.payload.name;
            state.dailyCompare[name] = action.payload[name];
        },
    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [fetchHourlyAverageCounts.fulfilled]: (state, action) => {
            const device = action?.meta?.arg?.device;
            const channelId = device?.properties?.channelId;
            console.log({ action });
            const builtDataset = buildHourlyAverage(
                action.payload?.feeds,
                device
            );
            // initialise device object if undefined
            if (!state.devices[channelId]) {
                state.devices[channelId] = {};
            }
            state.devices[channelId].hourlyAverage = builtDataset;
        },
    },
});

export const {
    receiveDailyAverage,
    receiveDailyCompare,
    receiveHourlyCompare,
} = chartsSlide.actions;

export const selectDailyAverage = (state) => state.charts.dailyAverage;
export const selectDailyCompare = (state) => state.charts.dailyCompare;
export const selectHourlyCompare = (state) => state.charts.hourlyCompare;
export const selectDeviceHourlyAverage = (channelId) => (state) =>
    state.charts.devices[channelId]?.hourlyAverage;
export default chartsSlide.reducer;
