// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import TechStack from "@/server/models/techStack";

export default async function handler(
    req,
    res
) {
    if (req.method !== "DELETE") {
        return res.status(400).json({
            success: false,
            message: "Only delete method can access this route !",
        });
    }

    await connect();

    const { id } = req.query;

    try {
        const techStack = await TechStack.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "TechStack deleted successfully !",
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
