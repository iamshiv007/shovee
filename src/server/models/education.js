import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    educations: [{
        degree: {
            type: String,
            required: true
        },
        institution: {
            type: String,
            required: true
        },
        studyPeriod: {
            type: String,
        },
        status: {
            type: String,
        },
        institutionImage: {
            imageUrl: {
                type: String
            },
            publicId: {
                type: String
            }
        }
    }]
}, { timestamps: true });

const Education = mongoose.models.Education || mongoose.model("Education", educationSchema);

export default Education;
