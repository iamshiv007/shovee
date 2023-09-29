import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    experienceCreated: false,
    experienceUpdated: false,
    experienceDeleted: false,
    loading: false,
    error: null,
};

const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {
        newExperienceRequest: (state) => {
            state.loading = true;
        },
        updateExperienceRequest: (state) => {
            state.loading = true;
        },
        deleteExperienceRequest: (state) => {
            state.loading = true;
        },
        newExperienceSuccess: (state, action) => {
            state.loading = false;
            state.experienceCreated = action.payload.success;
        },
        updateExperienceSuccess: (state, action) => {
            state.loading = false;
            state.experienceUpdated = action.payload.success;
        },
        deleteExperienceSuccess: (state, action) => {
            state.loading = false;
            state.experienceDeleted = action.payload.success;
        },
        newExperienceFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateExperienceFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteExperienceFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetExperience: (state) => {
            state.experienceCreated = false;
            state.experienceUpdated = false;
            state.experienceDeleted = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    newExperienceRequest,
    updateExperienceRequest,
    deleteExperienceRequest,
    newExperienceSuccess,
    updateExperienceSuccess,
    deleteExperienceSuccess,
    newExperienceFailed,
    updateExperienceFailed,
    deleteExperienceFailed,
    resetExperience,
    clearErrors,
} = experienceSlice.actions;

export default experienceSlice.reducer;
