// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Home from "@/server/models/home";
import { connect } from "@/server/connection/connect";

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
        const home = await Home.findOne({ userName: { $regex: new RegExp(userName, "i") }, });

        if (!home) {
            return res
                .status(400)
                .json({ success: false, message: "Home Data Not Found" });
        }
        res.status(200).json({
            success: true,
            home,
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
