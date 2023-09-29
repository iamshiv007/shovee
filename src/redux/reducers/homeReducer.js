import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    homeCreated: false,
    homeUpdated: false,
    loading: false,
    error: null
}

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        newHomeRequest: (state) => {
            state.loading = true
        },
        updateHomeRequest: (state) => {
            state.loading = true
        },
        newHomeSuccess: (state, action) => {
            state.loading = false;
            state.homeCreated = action.payload.success
        },
        updateHomeSuccess: (state, action) => {
            state.loading = false;
            state.homeUpdated = action.payload.success
        },
        newHomeFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        updateHomeFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        resetHome: (state) => {
            state.homeCreated = false;
            state.homeUpdated = false
        },
        clearErrors: (state) => {
            state.error = null
        }
    }
})

export const {
    newHomeRequest,
    updateHomeRequest,
    newHomeSuccess,
    updateHomeSuccess,
    newHomeFailed,
    updateHomeFailed,
    resetHome,
    clearErrors
} = homeSlice.actions

export default homeSlice.reducer