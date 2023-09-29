import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    experience: {},
    loading: true,
    error: null,
};

const getExperienceSlice = createSlice({
    name: "experienceData",
    initialState,
    reducers: {
        getExperienceRequest: (state) => {
            state.loading = true;
        },
        getExperienceSuccess: (state, action) => {
            state.loading = false;
            state.experience = action.payload.experience;
            state.error = null;
        },
        getExperienceFailed: (state, action) => {
            state.loading = false;
            state.experience = {};
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    getExperienceRequest,
    getExperienceSuccess,
    getExperienceFailed,
    clearErrors,
} = getExperienceSlice.actions;

export default getExperienceSlice.reducer;
