import axios from "axios";

import { newFeedbackFailed, newFeedbackRequest, newFeedbackSuccess } from "../reducers/feedbackReducer";


// 1. New feedback
export const createFeedback = (formData) => async (dispatch) => {
    dispatch(newFeedbackRequest());

    try {
        const { data } = await axios.post(
            "/api/feedback/create", formData
        );

        dispatch(newFeedbackSuccess(data));
    } catch (error) {
        dispatch(
            newFeedbackFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};