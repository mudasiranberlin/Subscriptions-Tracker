import mongoose from "mongoose";
import express from "express"
import { DB_NAME } from "../constants";

const app = express()

(
    async()=>{
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
            console.log(`Mongo db connected`);
            app.on("error",(error)=>{
                console.log("Error",error)
                throw error
                
            })

            app.listen(process.env.PORT||8000,()=>{
                console.log(`App is listening at port ${process.env.PORT}`);
                
            })
            
        } catch (error) {
            console.log("Not able to connect the database",error);
            
            
        }
    }
)()