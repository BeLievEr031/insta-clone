import express from "express"
import errorHandler from "./middleware/errorHandler.js";
import config from "./config/config.js";
import dbConnect from "./dbConnect/dbConnect.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import friendRouter from "./routes/friend.routes.js";
import fileUpload from "express-fileupload";
import socialRouter from "./routes/social.routes.js";
import commentRouter from "./routes/comment.routes.js";
import chatRouter from "./routes/chat.routes.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload());


// @All routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/friend", friendRouter)
app.use("/api/v1/social", socialRouter)
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/chat", chatRouter)


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



