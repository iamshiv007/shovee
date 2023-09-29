import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    about: {},
    loading: true,
    error: null,
};

const getAboutSlice = createSlice({
    name: "aboutData",
    initialState,
    reducers: {
        getAboutRequest: (state) => {
            state.loading = true;
        },
        getAboutSuccess: (state, action) => {
            state.loading = false;
            state.about = action.payload.about;
            state.error = null;
        },
        getAboutFailed: (state, action) => {
            state.loading = false;
            state.about = {};
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    getAboutRequest,
    getAboutSuccess,
    getAboutFailed,
    clearErrors,
} = getAboutSlice.actions;

export default getAboutSlice.reducer;
