import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from "nodemailer";
import sendEmail from "../utility/sendEmail.js"
import { ApiError } from "../utils/ApiError.js";

const mailroute = asyncHandler(async (req, res) => {

    const num = Math.floor(100000 + Math.random() * 900000);
    console.log(num)

    const info = await sendEmail({
        to: "apple.mudasir@gmail.com",
        subject: "Hello",
        text: `Hello world Google is Good Here is your OtP:?`,
        html: `<b>Hello world and here is your Otp?${num}</b>`,
        // <b>Hello world and here is your OTP: {{otp}}</b>
    });

    if (!info) {
        throw new ApiError(202, "Email could not be sent");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    messageId: info.messageId,
                },
                "Email sent successfully"
            )
        );
});

export {
    mailroute
};