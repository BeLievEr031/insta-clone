import { Schema, model } from "mongoose"

const commentSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },

    postid: {
        type: Schema.Types.ObjectId,
        ref: "PostModel"
    },

    comment: {
        type: String,
        trim: true,
        required: true
    }

}, {
    timestamps: true
})


const CommentModel = model("CommentModel", commentSchema)
export default CommentModel;