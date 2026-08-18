import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"})) 

 /* submits a form written in JSON.express.json() works like a translator.
 {
 "name":"Ram",
 "age":10
}
and turns it into:  req.body 
so you can do

limit = This protects the server from huge data.
*/

// console.log(req.body.name)

app.use(express.urlencoded({extended:true,limit:"16kb"}))
/*
When submitted, it sends= name=Ram&age=10
Express cannot understand it automatically.

express.urlencoded() translates it.
name=Ram&age=10
becomes
req.body = {
   name: "Ram",
   age: "10"
}
   Extended=  Express can understand nested objects too.
*/
app.use(express.static("public"))  

app.use(cookieParser()) // cookieParser() reads those cookies.

// Arcjet protects everything below this line
app.use(arcjetMiddleware);


// now we will import routes here 

import userRouter from './routes/user.routes.js'

import videoRouter from "./routes/video.routes.js"

import substrack from "./routes/subscription.routes.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/videos",videoRouter)

app.use("/api/v1/subs",substrack)



export default app