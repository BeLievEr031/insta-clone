import asyncHandler from "express-async-handler"
import ApiResponse from "../utils/ApiResponse.js"
import UserModel from "../model/UserModel.js"
import createError from "http-errors"
import bcrypt from "bcrypt"
import { generateCookies } from "../utils/utils.js"
const registerUser = asyncHandler(async (req, res, next) => {
    const isuser = await UserModel.findOne({ email: req.body.email })
    if (isuser) {
        return next(createError(409, "User already exists."))
    }
    const user = await UserModel.create(req.body)
    res.status(200).json(new ApiResponse(user, "User registered successfully."))
})

const loginUser = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email }).select("+password");
    if (!user) return next(createError(404, "Invalid Credentials."));

    const isPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isPassword) return next(createError(401, "Invalid Credentials."));

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }

    user.password = null;
    const { refreshToken, accessToken } = generateCookies(payload)
    res.status(200).
        cookie("refreshToken", refreshToken).
        cookie("accessToken", accessToken).
        json(new ApiResponse({ user, refreshToken, accessToken }, "Login successfully."))
})

export { registerUser, loginUser };