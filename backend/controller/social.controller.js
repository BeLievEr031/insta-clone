import asyncHandler from "express-async-handler";
import createError from "http-errors";
import ApiResponse from "../utils/ApiResponse.js";
import { fileUploader } from "../utils/utils.js";
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

export { postFile }