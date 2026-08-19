import { asyncHandler } from "../utils/asyncHandler";
// // import {createRequire} from 'module';
// // const require = createRequire(import.meta.url)
// // import { serve } from "@upstash/workflow/express";
// import express from 'express';
// import { Track } from "../models/substracker.model";
// import dayjs from "dayjs";

// const REMINDER=[7,5,2]

// const workflow = asyncHandler(async(req,res)=>{

//     // const {subscriptionId} = context.requestPayload;
//     // const subscription = await Track(context,subscriptionId)
//     // const subscription = await fetchsubscription(context,subscriptionId)
//     // if (!subscription||subscription.status != active) {
//     //     return
//     // }
//     // const renewalDate = dayjs(subscription.renewalDate);
//     // if (renewalDate.isBefore(dayjs())) {
//     //     console.log(`renewal passed for subscription ${subscriptionId}.Stopping workflow`);
//     //     return;
//     // }

//     // for(const daysBefore of REMINDER){
//     //     const reminderDate = renewalDate.subtract(daysBefore,unit:'day')
//     // }
//     console.log("Reached");
    
// })

// const fetchsubscription = asyncHandler(async(context,subscriptionId)=>{
//     const subs = Track.findById().populate('owner','fullname')
// })

const workflow = asyncHandler(async(req,res)=>{
    console.log("REached");
    
})


export{
    workflow
}