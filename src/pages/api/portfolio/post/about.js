// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import About from "@/server/models/about";

export default async function handler(
    req,
    res
) {
    if (req.method !== "POST") {
        return res.status(400).json({
            success: false,
            message: "Only post method can access this route !",
        });
    }

    await connect();

    const { userId, userName, fullName, location } = req.body;

    if (!userId || !userName || !fullName || !location) {
        return res
            .status(400)
            .json({ success: false, message: "Please fill all required fields" });
    }

    try {

        const aboutExist = await About.findOne({ userId })

        if (aboutExist) {
            return res.status(400).json({
                success: false,
                message: "About data already exists !",
            });
        }

        const about = await About.create(req.body);

        res.status(200).json({
            success: true,
            message: "About data stored successfully !",
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
}
