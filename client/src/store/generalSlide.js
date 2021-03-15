import { createSlice } from "@reduxjs/toolkit";

export const generalSlide = createSlice({
  name: "general",
  initialState: {},
  reducers: {
    setSecret: (state, action) => {
      state.secret = action.payload;
    },
  },
});

export const { setSecret } = generalSlide.actions;

export const selectSecret = (state) => state.general.secret;

export default generalSlide.reducer;
