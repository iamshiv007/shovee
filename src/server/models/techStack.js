import mongoose from "mongoose";

const techStackSchema = new mongoose.Schema({
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
    advance: {
        type: Array
    },
    good: {
        type: Array
    },
    familiar: {
        type: Array
    },
}, { timestamps: true });

const TechStack = mongoose.models.TechStack || mongoose.model("TechStack", techStackSchema);

export default TechStack;
