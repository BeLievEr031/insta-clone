import express from "express"
import { registerUser } from "../controller/user.controller.js";
import { validateRegisterUser } from "../middleware/validator.js";

const userRouter = express.Router();

//@Route to register user.
userRouter.route("/register").post(validateRegisterUser,registerUser)


export default userRouter;