import { Router } from "express";
import {loginUser, logoutUser, registerUser,refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, getUserChannelProfile} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)

    router.route("/login").post(loginUser)
    router.route("/logout").post(verfiyJWT,logoutUser)
    router.route("/refresh-token").post(refreshAccessToken)
    router.route("/change-password").post(verfiyJWT,changeCurrentPassword)
    router.route("/current-user").get(verfiyJWT,getCurrentUser)
    router.route("/update-account").patch(verfiyJWT,updateAccountDetails)
    router.route("/c/:username").get(verfiyJWT,getUserChannelProfile)



export default router
