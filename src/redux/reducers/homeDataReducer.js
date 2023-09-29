import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    home: {},
    loading: true,
    error: null,
};

const getHomeSlice = createSlice({
    name: "homeData",
    initialState,
    reducers: {
        getHomeRequest: (state) => {
            state.loading = true;
        },
        getHomeSuccess: (state, action) => {
            state.loading = false;
            state.home = action.payload.home;
            state.error = null;
        },
        getHomeFailed: (state, action) => {
            state.loading = false;
            state.home = {};
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    getHomeRequest,
    getHomeSuccess,
    getHomeFailed,
    clearErrors,
} = getHomeSlice.actions;

export default getHomeSlice.reducer;
