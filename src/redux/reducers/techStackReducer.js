import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    techStackCreated: false,
    techStackUpdated: false,
    techStackDeleted: false,
    loading: false,
    error: null,
};

const techStackSlice = createSlice({
    name: "techStack",
    initialState,
    reducers: {
        newTechStackRequest: (state) => {
            state.loading = true;
        },
        updateTechStackRequest: (state) => {
            state.loading = true;
        },
        deleteTechStackRequest: (state) => {
            state.loading = true;
        },
        newTechStackSuccess: (state, action) => {
            state.loading = false;
            state.techStackCreated = action.payload.success;
        },
        updateTechStackSuccess: (state, action) => {
            state.loading = false;
            state.techStackUpdated = action.payload.success;
        },
        deleteTechStackSuccess: (state, action) => {
            state.loading = false;
            state.techStackDeleted = action.payload.success;
        },
        newTechStackFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateTechStackFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteTechStackFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetTechStack: (state) => {
            state.techStackCreated = false;
            state.techStackUpdated = false;
            state.techStackDeleted = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    newTechStackRequest,
    updateTechStackRequest,
    deleteTechStackRequest,
    newTechStackSuccess,
    updateTechStackSuccess,
    deleteTechStackSuccess,
    newTechStackFailed,
    updateTechStackFailed,
    deleteTechStackFailed,
    resetTechStack,
    clearErrors
} = techStackSlice.actions

export default techStackSlice.reducer