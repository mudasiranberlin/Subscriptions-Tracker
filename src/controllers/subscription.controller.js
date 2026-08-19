import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import {Track} from "../models/substracker.model.js"

const subAlldetails = asyncHandler(async(req,res)=>{
    console.log("Reached333");


    if (req.user.id != req.params.id) {
        throw new ApiError(202,"Invalid you are not the owner")
    }
   const sub = await Track.find(
    {
        user:req.params.id
    }
   )

   return res
        .status(200)
        .json(
            new ApiResponse(
                200,sub,"Data fetched sucessfully"
            )
        )
    
    
    

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