import { configureStore } from "@reduxjs/toolkit";
import devicesReducer from "store/devicesSlide";
import chartsReducers from "store/chartsSlide";

import { combineReducers } from "redux";

const reducer = combineReducers({
  devices: devicesReducer,
  charts: chartsReducers
});

const store = configureStore({
  reducer,
});

export default store;
