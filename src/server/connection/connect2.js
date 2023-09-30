import mongoose from "mongoose";

export const connect2 = async () => {
    try {
        if (!process.env.MONGODB_URI2) {
            console.error("MONGODB_URI environment variable is not set.");
            return; // Don't proceed with the connection.
        }
        await mongoose.connect(process.env.MONGODB_URI);

        const db = mongoose.connection;

        // Handle connection events (optional).
        db.on("error", console.error.bind(console, "MongoDB connection error:"));
        db.once("open", () => {
            console.log("Connected to MongoDB 2");
        });
    } catch (error) {
        console.log(error?.message || error);
    }
};
