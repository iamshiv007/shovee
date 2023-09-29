// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import About from "@/server/models/about";

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
        const about = await About.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "About deleted successfully !",
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
