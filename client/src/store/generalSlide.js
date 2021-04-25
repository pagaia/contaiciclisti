import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const verifyUserLogin = createAsyncThunk(
    'general/verifyUserLogin',
    async ({ code }, thunkAPI) => {
        const response = await axios('/api/users/verify', {
            headers: { code },
        });

        const { authorization } = response.headers;
        const { data: profile } = response;

        // store user google profile and JWT for future calls
        return { profile, authorization };
    }
);

export const generalSlide = createSlice({
    name: 'general',
    initialState: {},
    reducers: {
        setSecret: (state, action) => {
            state.secret = action.payload;
        },
        logOutUser: (state, action) => {
            console.log({ action });
            state.user = null;
        },
    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [verifyUserLogin.fulfilled]: (state, action) => {
            // save profile and Autorization
            console.log({ action });
            state.user = action.payload;
            state.tokenPending = false;
        },
        [verifyUserLogin.pending]: (state, action) => {
            state.tokenPending = true;
        },
        [verifyUserLogin.rejected]: (state, action) => {
            state.error = action.error;
            state.tokenPending = false;
        },
    },
});

export const { setSecret, logOutUser } = generalSlide.actions;

export const selectSecret = (state) => state.general.secret;
export const selectUser = (state) => state.general.user;

export default generalSlide.reducer;
