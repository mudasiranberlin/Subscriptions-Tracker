import dotenv from "dotenv"            //dotenv → Reads environment variables from your .env file.
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: './env'
})  // This reads your environment file.


connectDB()  
/* A function that connects to MongoDB.
Since connecting takes time, connectDB() returns a Promise.
A Promise has two possibilities: Success ✅ or Failure ❌  
So we use:.then(...) .catch(...)

// app → our Express application also our website/server

If connection is successful
.then(()=>{
This means:
"If MongoDB connects successfully, do this."
*/
.then(()=>{ 
    app.on("error",(error)=>{     /* Listen for server errors f your Express app has an error later, it prints:ERRR */
        console.log("ERRR:",error);
        throw error //stops the program because something serious happened. 
    })
    app.listen(process.env.PORT||8080,()=>{ // Start the server Think of || as: "Use the left value. If it doesn't exist, use the right one."
        console.log(`Server is Running at Port : ${process.env.PORT}`);  //success message
        
    })
})
.catch((err)=>{
    console.log("NongoDB Connection failed !!!", err);   // If MongoDB connection fails The server will not start.
    
})

