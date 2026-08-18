import mongoose from "mongoose";
// This imports the Mongoose library so you can connect to MongoDB.
import { DB_NAME } from "../constants.js";



const  connectDB= async ()=>{

/* You're creating a function named connectDB. It is not running yet.It only runs when you call:connectDB(); */

try { /* Try connecting to the database. If anything fails, execution jumps to the catch block. */

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`The DB is Connected and Host Name is ${connectionInstance.connection.host}`);

        

        /*. The DB is Connected and Host Name is localhost.  */
        
    /* await tells JavaScript: Wait until the database is connected before continuing.  */

    } catch (error) {     
    /* If the connection fails:
    Wrong password
    MongoDB not running
    Wrong URL this block runs.
*/
        console.log("MONGO DB CONNECTION FAILED IS IN SRC INDEX",error)
        process.exit(1)      /*Stop the application because something serious went wrong.*/
    console.log(process.exit(1));
    
    } 

}


export default connectDB