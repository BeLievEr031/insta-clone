import express from "express"
import auth from "../middleware/auth.js";
import { sendMessage } from "../controller/chat.controller.js";

const chatRouter = express.Router()

chatRouter.route("/:receiverid").post(auth,sendMessage)

export default chatRouter;