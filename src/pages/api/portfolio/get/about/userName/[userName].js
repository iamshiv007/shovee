// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import About from "@/server/models/about";

export default async function handler(
    req,
    res
) {
    if (req.method !== "GET") {
        return res.status(400).json({
            success: false,
            message: "Only get method can access this route !",
        });
    }

    await connect();

    const { userName } = req.query;

    try {
        const about = await About.findOne({ userName });

        if (!about) {
            return res
                .status(400)
                .json({ success: false, message: "About data Not found !" });
        }
        res.status(200).json({
            success: true,
            about,
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
} s
