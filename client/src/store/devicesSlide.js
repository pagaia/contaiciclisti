import { createSlice } from "@reduxjs/toolkit";
import readGoogleFile from "utility/googleSheet";

export const devicesSlide = createSlice({
  name: "devices",
  initialState: {
    value: 0,
    devices: [],
  },
  reducers: {
    receiveDevices: (state, action) => {
      state.devices = action.payload;
    },
  },
});

export const { receiveDevices } = devicesSlide.actions;

export const fetchDevices = () => async (dispatch) => {
  const devices = await readGoogleFile();
  dispatch(receiveDevices(devices));
};

export const selectDevices = (state) => state.devices.devices;

export default devicesSlide.reducer;
