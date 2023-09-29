import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    mailCreated: false,
    loading: false,
    error: null
}

const mailSlice = createSlice({
    name: "mail",
    initialState,
    reducers: {
        newMailRequest: (state) => {
            state.loading = true
        },
        newMailSuccess: (state, action) => {
            state.loading = false;
            state.mailCreated = action.payload.success
        },
        newMailFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        resetMail: (state) => {
            state.mailCreated = false;
            state.mailUpdated = false
        },
        clearErrors: (state) => {
            state.error = null
        }
    }
})

export const {
    newMailRequest,
    newMailSuccess,
    newMailFailed,
    resetMail,
    clearErrors
} = mailSlice.actions

export default mailSlice.reducer