import express from "express"
import auth from "../middleware/auth.js";
import { deleteComment, fetchComment, postComment } from "../controller/comment.controller.js";
import { validateFetchReq } from "../middleware/validator.js";

const commentRouter = express.Router();

commentRouter.route("/:postid").post(auth,postComment)
commentRouter.route("/:commentid").delete(auth,deleteComment)
commentRouter.route("/:postid").get(validateFetchReq,auth,fetchComment)


export default commentRouter;