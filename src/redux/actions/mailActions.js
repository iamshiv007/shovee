import axios from "axios";

import { newMailFailed, newMailRequest, newMailSuccess } from "../reducers/mailReducer";

// 1. New Mail
export const newMail = (formData) => async (dispatch) => {
    dispatch(newMailRequest());

    try {
        const { data } = await axios.post(
            "/api/mail/create", formData
        );

        dispatch(newMailSuccess(data));
    } catch (error) {
        dispatch(
            newMailFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};