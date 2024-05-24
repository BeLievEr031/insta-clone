import asyncHandler from "express-async-handler";
import createError from "http-errors";
import ApiResponse from "../utils/ApiResponse.js";
import { fileRemover, fileUploader } from "../utils/utils.js";
import PostModel from "../model/PostModel.js";

const postFile = asyncHandler(async (req, res, next) => {
    const file = req.files.post;
    const validMimeType = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4"
    ];

    const fileSizeInBytes = file.size;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    if (fileSizeInMB.toFixed(2) > 10) {
        return next(createError(400, "File size is too large"));
    }

    if (!validMimeType.includes(file.mimetype)) {
        return next(createError(422, "Invalid file type."))
    }

    const uploadedFile = await fileUploader(file)
    // secure_url
    const post = await PostModel.create({
        userid: req.user._id,
        posturl: uploadedFile.secure_url,
        description: req.body.description ? req.body.description : null,
        mimetype: file.mimetype.split("/")[0]
    })

    res.status(200).json(new ApiResponse(post, "Post uploaded."))
})

const fetchPost = asyncHandler(async (req, res) => {
    const { page, limit, sort, type,id } = req.query;
    if (type === "private") {
        const posts = await PostModel.find({ userid: id }).skip((page - 1) * 10).limit(limit).sort(sort)
        return res.status(200).json(new ApiResponse(posts, "Posts fetched."))
    }
    const posts = await PostModel.find({}).skip((page - 1) * 10).limit(limit).sort(sort)
    res.status(200).json(new ApiResponse(posts, "Posts fetched."))

})

const deletePost = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(createError(422, "Id required."))
    }

    const post = await PostModel.findOne({ _id: id, userid: req.user._id })
    if (!post) {
        return next(createError(404, "invalid post."))
    }

    const key = post.posturl.split("/insta-clone/")[1].split(".")[0]
    const isDeleted = await fileRemover(key)
    if (!isDeleted) {
        return next(createError(500, "something went wrong"))
    }
    await post.deleteOne();
    res.status(200).json(new ApiResponse(null, "Post deleted"))

})

const updatePost = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const {description} = req.body;

    if (!id) {
        return next(createError(422, "Id required."))
    }

    const post = await PostModel.findOneAndUpdate({ _id: id, userid: req.user._id },{description},{new:true,runValidators:true})
    if (!post) {
        return next(createError(404, "invalid post."))
    }

    res.status(200).json(new ApiResponse(post, "Post updated"))

})


export { postFile, deletePost, fetchPost,updatePost }