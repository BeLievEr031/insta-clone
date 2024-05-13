import mongoose from "mongoose";
import config from "../config/config.js";

const dbConnect = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("db connected successfully.");
        })
        mongoose.connection.on("disconnected",()=>{
            console.log("db disconnected successfully.");
        })
        mongoose.connection.on("error",()=>{
            console.log("db Error!!", error);
            process.exit(1)
        })

        await mongoose.connect(config.DB_URI)
    } catch (error) {
        console.log("db Error!!", error);
    }
}

export default dbConnect;