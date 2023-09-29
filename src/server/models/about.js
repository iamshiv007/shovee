import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
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
    fullName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    age: {
        type: String
    },
    experience: {
        type: String
    },
    projects: {
        type: Number
    },
    objective: {
        type: String
    },
    image: {
        imageUrl: {
            type: String,
        },
        publicId: {
            type: String
        }
    }
}, { timestamps: true });

const About =
    mongoose.models.About ||
    mongoose.model("About", aboutSchema);

export default About;
