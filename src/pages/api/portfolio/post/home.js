// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import Home from "@/server/models/home";

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

    const { userId, userName, firstName, gender, profileName } = req.body;

    if (!userId || !userName || !firstName || !gender || !profileName) {
        return res
            .status(400)
            .json({ success: false, message: "Please fill all required fields" });
    }

    try {

        const homeExist = await Home.findOne({ userId })

        if (homeExist) {
            return res.status(400).json({
                success: false,
                message: "Home data already exists !",
            });
        }

        const home = await Home.create(req.body);

        res.status(200).json({
            success: true,
            message: "Home data stored successfully !",
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
