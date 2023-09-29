import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    aboutCreated: false,
    aboutUpdated: false,
    aboutDeleted: false,
    loading: false,
    error: null
}

const aboutSlice = createSlice({
    name: "about",
    initialState,
    reducers: {
        newAboutRequest: (state) => {
            state.loading = true
        },
        updateAboutRequest: (state) => {
            state.loading = true
        },
        deleteAboutRequest: (state) => {
            state.loading = true
        },
        newAboutSuccess: (state, action) => {
            state.loading = false;
            state.aboutCreated = action.payload.success
        },
        updateAboutSuccess: (state, action) => {
            state.loading = false;
            state.aboutUpdated = action.payload.success
        },
        deleteAboutSuccess: (state, action) => {
            state.loading = false;
            state.aboutDeleted = action.payload.success
        },
        newAboutFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        updateAboutFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        deleteAboutFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        resetAbout: (state) => {
            state.aboutCreated = false;
            state.aboutUpdated = false;
            state.aboutDeleted = false;
        },
        clearErrors: (state) => {
            state.error = null
        }
    }
})

export const {
    newAboutRequest,
    updateAboutRequest,
    deleteAboutRequest,
    newAboutSuccess,
    updateAboutSuccess,
    deleteAboutSuccess,
    newAboutFailed,
    updateAboutFailed,
    deleteAboutFailed,
    resetAbout,
    clearErrors
} = aboutSlice.actions

export default aboutSlice.reducer