// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import Project from "@/server/models/project";

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
        const project = await Project.findOne({ userId });

        if (!project) {
            return res
                .status(400)
                .json({ success: false, message: "Project data Not found !" });
        }
        res.status(200).json({
            success: true,
            project,
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
