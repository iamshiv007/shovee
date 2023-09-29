import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectCreated: false,
    projectUpdated: false,
    projectDeleted: false,
    loading: false,
    error: null,
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        newProjectRequest: (state) => {
            state.loading = true;
        },
        updateProjectRequest: (state) => {
            state.loading = true;
        },
        deleteProjectRequest: (state) => {
            state.loading = true;
        },
        newProjectSuccess: (state, action) => {
            state.loading = false;
            state.projectCreated = action.payload.success;
        },
        updateProjectSuccess: (state, action) => {
            state.loading = false;
            state.projectUpdated = action.payload.success;
        },
        deleteProjectSuccess: (state, action) => {
            state.loading = false;
            state.projectDeleted = action.payload.success;
        },
        newProjectFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateProjectFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteProjectFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetProject: (state) => {
            state.projectCreated = false;
            state.projectUpdated = false;
            state.projectDeleted = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    newProjectRequest,
    updateProjectRequest,
    deleteProjectRequest,
    newProjectSuccess,
    updateProjectSuccess,
    deleteProjectSuccess,
    newProjectFailed,
    updateProjectFailed,
    deleteProjectFailed,
    resetProject,
    clearErrors,
} = projectSlice.actions;

export default projectSlice.reducer;
