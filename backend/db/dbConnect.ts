import mongoose from "mongoose";

const dbConnect = async () => {
    try {

        const coneectionInstance = await mongoose.connect(process.env.DB_URI!)
        console.log(`Connecte to the db host: ${coneectionInstance.connection.host}`);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default dbConnect;