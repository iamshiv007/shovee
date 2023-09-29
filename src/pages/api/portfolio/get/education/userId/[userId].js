// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import Education from "@/server/models/education";

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

    const { userId } = req.query;

    try {
        const education = await Education.findOne({ userId });

        if (!education) {
            return res
                .status(400)
                .json({ success: false, message: "Education data Not found !" });
        }
        res.status(200).json({
            success: true,
            education,
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
