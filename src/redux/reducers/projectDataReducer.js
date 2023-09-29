import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    project: {},
    loading: true,
    error: null,
};

const getProjectSlice = createSlice({
    name: "projectData",
    initialState,
    reducers: {
        getProjectRequest: (state) => {
            state.loading = true;
        },
        getProjectSuccess: (state, action) => {
            state.loading = false;
            state.project = action.payload.project;
            state.error = null;
        },
        getProjectFailed: (state, action) => {
            state.loading = false;
            state.project = {};
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    getProjectRequest,
    getProjectSuccess,
    getProjectFailed,
    clearErrors,
} = getProjectSlice.actions;

export default getProjectSlice.reducer;
