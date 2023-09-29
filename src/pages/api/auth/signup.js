// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import User from "@/server/models/user";

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

    const { uid, email } = req.body;

    if (!uid || !email) {
        return res
            .status(400)
            .json({ success: false, message: "Please fill all required fields" });
    }

    try {

        const userExist = await User.findOne({ uid })

        if (userExist) {
            return res.status(200).json({
                success: true,
                message: "User login successfully !",
            });
        }

        const user = await User.create(req.body);

        res.status(200).json({
            success: true,
            message: "User data stored successfully !",
            User,
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
