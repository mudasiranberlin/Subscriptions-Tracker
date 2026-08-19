import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import {Track} from "../models/substracker.model.js"

const subAlldetails = asyncHandler(async(req,res)=>{
    console.log("Reached");
    

})

const createSubs = asyncHandler(async(req,res)=>{
    const subscription = await Track.create({
    ...req.body,
    user: req.user._id
});

     
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,subscription,"Data fetched sucessfully"
            )
        )

})
export{
    subAlldetails,
    createSubs
}