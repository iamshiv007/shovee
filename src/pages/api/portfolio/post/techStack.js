// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import TechStack from "@/server/models/techStack";

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

    const { userId, userName } = req.body;

    if (!userId || !userName) {
        return res
            .status(400)
            .json({ success: false, message: "Please fill all required fields" });
    }

    try {

        const techStackExist = await TechStack.findOne({ userId })

        if (techStackExist) {
            return res.status(400).json({
                success: false,
                message: "Teck Stack data already exists !",
            });
        }

        const teckStack = await TechStack.create(req.body);

        res.status(200).json({
            success: true,
            message: "Teck Stack data stored successfully !",
            teckStack,
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
