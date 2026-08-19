import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verfiyJWT } from "../middlewares/auth.middleware.js";
import {subAlldetails,createSubs} from "../controllers/subscription.controller.js"

const router = Router()
    router.route("/user/:id").get(verfiyJWT,subAlldetails)
    // router.route("/:id").get(getsub)
    router.route("/").post(verfiyJWT,createSubs)
    // router.route("/:id").put(updateSub)
    // router.route("/:id").delete(deleteSub)
    // router.route("/user/:id").get(getUserSubs)
    // router.route("/:id/cancel").get(cancel)
    // router.route("/upcomming").get(upcomming)
    



export default router
