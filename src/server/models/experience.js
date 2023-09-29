import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    experiences: [
        {
            companyName: {
                type: String,
                required: true
            },
            location: {
                type: String,
                required: true
            },
            role: {
                type: String,
                required: true
            },
            jobPeriod: {
                type: String,
                required: true
            },
            details: {
                type: String,
            }
        }
    ]
}, { timestamps: true });

const Experience = mongoose.models.Experience || mongoose.model("Experience", experienceSchema);

export default Experience;
