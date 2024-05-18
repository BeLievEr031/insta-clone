import express from "express"
import errorHandler from "./middleware/errorHandler.js";
import config from "./config/config.js";
import dbConnect from "./dbConnect/dbConnect.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import friendRouter from "./routes/friend.routes.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// @All routes
app.use("/api/v1/user",userRouter)
app.use("/api/v1/friend",friendRouter)


// @Global middleware
app.use(errorHandler)

dbConnect().then(() => {
    const PORT = config.PORT;
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log("db error!!", error);
    process.exit(1)
})



