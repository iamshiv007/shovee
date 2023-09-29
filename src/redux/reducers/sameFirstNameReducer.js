import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sameFirstName: [],
    loading: false,
    error: null,
};

const getSameFirstNameSlice = createSlice({
    name: "sameFirstName",
    initialState,
    reducers: {
        getSameFirstNameRequest: (state) => {
            state.loading = true;
        },
        getSameFirstNameSuccess: (state, action) => {
            state.loading = false;
            state.sameFirstName = action.payload.home;
            state.error = null;
        },
        getSameFirstNameFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    getSameFirstNameRequest,
    getSameFirstNameSuccess,
    getSameFirstNameFailed,
    clearErrors,
} = getSameFirstNameSlice.actions;

export default getSameFirstNameSlice.reducer;
