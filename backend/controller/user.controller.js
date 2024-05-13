import asyncHandler from "express-async-handler"
import ApiResponse from "../utils/ApiResponse.js"
import UserModel from "../model/UserModel.js"
import createError from "http-errors"
const registerUser = asyncHandler(async (req, res, next) => {
    const isuser = await UserModel.findOne({ email: req.body.email })
    if (isuser) {
        return next(createError(409, "User already exists."))
    }
    const user = await UserModel.create(req.body)
    res.status(200).json(new ApiResponse(user, "User registered successfully."))
})

export { registerUser };