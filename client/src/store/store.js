import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from 'store/devicesSlide';
import chartsReducers from 'store/chartsSlide';

import { combineReducers } from 'redux';
import generalReducer from 'store/generalSlide';

const reducer = combineReducers({
    devices: devicesReducer,
    charts: chartsReducers,
    general: generalReducer,
});

const store = configureStore({
    reducer,
});

export default store;
