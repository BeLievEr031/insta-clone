import mongoose, { model } from "mongoose";

const postSchema = new mongoose.Schema({
    file: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    mimetype: {
        type: String,
        enum: ["image", "video"],
        default: "image"
    }
}, {
    timestamps: true
})

const PostModel = model("PostModel", postSchema)
export default PostModel;