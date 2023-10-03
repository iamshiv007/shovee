import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    homes: [],
    loading: false,
    error: null,
};

const getAllHomeSlice = createSlice({
    name: "allHomeData",
    initialState,
    reducers: {
        getAllHomeRequest: (state) => {
            state.loading = true;
        },
        getAllHomeSuccess: (state, action) => {
            state.loading = false;
            state.homes = action.payload.homes;
            state.error = null;
        },
        getAllHomeFailed: (state, action) => {
            state.loading = false;
            state.homes = [];
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    getAllHomeRequest,
    getAllHomeSuccess,
    getAllHomeFailed,
    clearErrors,
} = getAllHomeSlice.actions;

export default getAllHomeSlice.reducer;
