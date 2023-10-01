// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect } from "@/server/connection/connect";
import { Feedback } from "@/server/models/feedback";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({
      success: false,
      message: "Only post method can access this route !",
    });
  }

  await connect();

  const { name, email, rating, message } = req.body;

  if (!name || !email || !rating || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all required fields" });
  }

  try {
    const feedback = await Feedback.create(req.body);

    res.status(200).json({
      success: true,
      message: "Feedback sent successfully !",
      feedback,
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
