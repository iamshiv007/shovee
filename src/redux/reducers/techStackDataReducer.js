import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    techStack: {},
    loading: true,
    error: null,
};

const getTechStackSlice = createSlice({
    name: "techStackData",
    initialState,
    reducers: {
        getTechStackRequest: (state) => {
            state.loading = true;
        },
        getTechStackSuccess: (state, action) => {
            state.loading = false;
            state.techStack = action.payload.techStack;
            state.error = null;
        },
        getTechStackFailed: (state, action) => {
            state.loading = false;
            state.techStack = {};
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    getTechStackRequest,
    getTechStackSuccess,
    getTechStackFailed,
    clearErrors,
} = getTechStackSlice.actions;

export default getTechStackSlice.reducer;
