import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from "nodemailer";

const mailroute = asyncHandler(async (req, res) => {
    console.log("Mail Route Reached");

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: "maximillia.halvorson@ethereal.email",
            pass: "gv3ZedktzGy7HM5s1e"
        }
    });

    try {
        const info = await transporter.sendMail({
            from: '"Googlees Team" <teamgoogle@google.com>',
            to: "apple.mudasir@gmail.com",
            subject: "Hello",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });

        console.log("Message sent: %s", info.messageId);

        console.log(
            "Preview URL: %s",
            nodemailer.getTestMessageUrl(info)
        );

        return res.status(200).json({
            success: true,
            message: "Email sent successfully",
            messageId: info.messageId
        });

    } catch (err) {
        console.error("Error while sending mail:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to send email",
            error: err.message
        });
    }
});

export {
    mailroute
};