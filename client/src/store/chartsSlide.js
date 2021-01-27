import { createSlice } from "@reduxjs/toolkit";

export const chartsSlide = createSlice({
  name: "charts",
  initialState: {
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
});

export const {
  receiveDailyAverage,
  receiveDailyCompare,
  receiveHourlyCompare,
} = chartsSlide.actions;


export const selectDailyAverage = (state) => state.charts.dailyAverage;
export const selectDailyCompare = (state) => state.charts.dailyCompare;
export const selectHourlyCompare = (state) => state.charts.hourlyCompare;

export default chartsSlide.reducer;
