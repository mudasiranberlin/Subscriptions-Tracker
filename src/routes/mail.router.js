import { Router } from "express";
import {mailroute} from "../controllers/mail.controller.js";
import { verfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/mail").get(mailroute)



export default router
