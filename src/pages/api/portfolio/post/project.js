// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import Project from "@/server/models/project";

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

        const projectExist = await Project.findOne({ userId })

        if (projectExist) {
            return res.status(400).json({
                success: false,
                message: "Project data already exists !",
            });
        }

        const project = await Project.create(req.body);

        res.status(200).json({
            success: true,
            message: "Project data stored successfully !",
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
