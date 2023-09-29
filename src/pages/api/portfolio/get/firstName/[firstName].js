// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import Home from "@/server/models/home";

export default async function handler(
    req,
    res
) {
    if (req.method !== "GET") {
        return res.status(400).json({
            success: false,
            message: "Only get method can access this route Shisv!",
        });
    }

    await connect();

    try {
        const { firstName } = req.query;

        const regex = new RegExp(`^${firstName}$`, "i"); // Use ^ and $ to match the whole string

        const home = await Home.find({
            firstName: { $regex: regex },
        });

        res.status(200).json({
            success: true,
            home,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                error?.response?.data?.message ||
                error?.message ||
                "Internal server error",
        });
    }
}
