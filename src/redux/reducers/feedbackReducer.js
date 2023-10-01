import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    feedbackCreated: false,
    loading: false,
    error: null
}

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        newFeedbackRequest: (state) => {
            state.loading = true
        },
        newFeedbackSuccess: (state, action) => {
            state.loading = false;
            state.feedbackCreated = action.payload.success
        },
        newFeedbackFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        resetFeedback: (state) => {
            state.feedbackCreated = false;
            state.feedbackUpdated = false
        },
        clearErrors: (state) => {
            state.error = null
        }
    }
})

export const {
    newFeedbackRequest,
    newFeedbackSuccess,
    newFeedbackFailed,
    resetFeedback,
    clearErrors
} = feedbackSlice.actions

export default feedbackSlice.reducer