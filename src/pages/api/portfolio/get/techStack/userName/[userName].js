// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import TechStack from "@/server/models/techStack";

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
        const techStack = await TechStack.findOne({ userName: { $regex: new RegExp(userName, "i") }, });

        if (!techStack) {
            return res
                .status(400)
                .json({ success: false, message: "TechStack data Not found !" });
        }
        res.status(200).json({
            success: true,
            techStack,
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
