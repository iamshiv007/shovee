import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true })

mongoose.models = {};

export const Feedback = mongoose.model("feedback", feedbackSchema)