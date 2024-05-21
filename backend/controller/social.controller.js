import asyncHandler from "express-async-handler";
import createError from "http-errors";
import path from "path"
import ApiResponse from "../utils/ApiResponse.js";

const postFile = asyncHandler(async (req, res, next) => {
    console.log(req.files);
    const file = req.files.post;
    const uploadPath = path.join(process.cwd(), 'uploads', file.name);
    file.mv(uploadPath, async (err) => {
        if (err) {
            console.log(err);
        }
        // } else {
        //     try {
        //         // Upload file to Cloudinary
        //         const cloudinaryResult = await cloudinary.uploader.upload(uploadPath, { folder: "book-wook" });
        //         // Cloudinary response will contain the URL of the uploaded file
        //         imageUrl.push(cloudinaryResult.secure_url)
        //         // imageUrl.push(uploadPath);

        //         fs.unlink(uploadPath, (err) => {
        //             if (err) {
        //                 throw createError(500, err.message)
        //             }
        //             console.log("File deleted.");
        //         })
        //         resolve();
        //     } catch (error) {
        //         console.log(error);
        //         throw createError(500, error.message)
        //     }
        // }
    });

    res.status(200).json(new ApiResponse(null,"Post uploaded."))
})

export { postFile }