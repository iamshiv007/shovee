import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    education: {},
    loading: true,
    error: null,
};

const getEducationSlice = createSlice({
    name: "educationData",
    initialState,
    reducers: {
        getEducationRequest: (state) => {
            state.loading = true;
        },
        getEducationSuccess: (state, action) => {
            state.loading = false;
            state.education = action.payload.education;
            state.error = null;
        },
        getEducationFailed: (state, action) => {
            state.loading = false;
            state.education = {};
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    getEducationRequest,
    getEducationSuccess,
    getEducationFailed,
    clearErrors,
} = getEducationSlice.actions;

export default getEducationSlice.reducer;
