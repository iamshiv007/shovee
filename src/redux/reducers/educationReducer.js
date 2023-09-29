import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    educationCreated: false,
    educationUpdated: false,
    educationDeleted: false,
    loading: false,
    error: null,
};

const educationSlice = createSlice({
    name: "education",
    initialState,
    reducers: {
        newEducationRequest: (state) => {
            state.loading = true;
        },
        updateEducationRequest: (state) => {
            state.loading = true;
        },
        deleteEducationRequest: (state) => {
            state.loading = true;
        },
        newEducationSuccess: (state, action) => {
            state.loading = false;
            state.educationCreated = action.payload.success;
        },
        updateEducationSuccess: (state, action) => {
            state.loading = false;
            state.educationUpdated = action.payload.success;
        },
        deleteEducationSuccess: (state, action) => {
            state.loading = false;
            state.educationDeleted = action.payload.success;
        },
        newEducationFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateEducationFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteEducationFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetEducation: (state) => {
            state.educationCreated = false;
            state.educationUpdated = false;
            state.educationDeleted = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    newEducationRequest,
    updateEducationRequest,
    deleteEducationRequest,
    newEducationSuccess,
    updateEducationSuccess,
    deleteEducationSuccess,
    newEducationFailed,
    updateEducationFailed,
    deleteEducationFailed,
    resetEducation,
    clearErrors,
} = educationSlice.actions;

export default educationSlice.reducer;
