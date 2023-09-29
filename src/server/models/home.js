import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
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
    firstName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    profileName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    cv: {
        type: String,
    },
    socialMedia: {
        type: Object
    }
}, { timestamps: true });

const Home = mongoose.models.Home || mongoose.model("Home", homeSchema);

export default Home;
