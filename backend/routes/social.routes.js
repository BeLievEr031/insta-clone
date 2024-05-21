import express from "express"
import auth from "../middleware/auth.js";
import { postFile } from "../controller/social.controller.js";

const socialRouter = express.Router();

socialRouter.route("/").post(auth,postFile)


export default socialRouter;