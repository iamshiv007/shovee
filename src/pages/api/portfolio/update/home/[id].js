// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import Home from "@/server/models/home";

export default async function handler(
    req,
    res
) {
    if (req.method !== "PUT") {
        return res.status(400).json({
            success: false,
            message: "Only put method can access this route !",
        });
    }

    await connect();

    const { id } = req.query;

    try {
        const home = await Home.findByIdAndUpdate(id, req.body);

        res.status(200).json({
            success: true,
            message: "Home data updated successfully !",
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
