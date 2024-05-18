import asyncHandler from "express-async-handler"
import ApiResponse from "../utils/ApiResponse.js"
import UserModel from "../model/UserModel.js"
import createError from "http-errors"
import bcrypt from "bcrypt"
import { generateCookies, verifyToken } from "../utils/utils.js"

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
    console.log(user.password);
    if (!user) return next(createError(404, "Invalid Credentials."));

    const isPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isPassword) return next(createError(401, "Invalid Credentials."));

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }

    const { refreshToken, accessToken } = generateCookies(payload)
    user.refreshToken = refreshToken;
    user.accessToken = accessToken;
    await user.save();
    user.password = null;

    res.status(200).
        cookie("refreshToken", refreshToken, { httpOnly: true, expireIn: "24h" }).
        cookie("accessToken", accessToken, { httpOnly: true, expireIn: "8h" }).
        json(new ApiResponse({ user, refreshToken, accessToken }, "Login successfully."))
})

const refreshToken = asyncHandler(async (req, res, next) => {
    const { refreshToken: tokenFromClient } = req.cookies;

    if (!tokenFromClient) {
        return next(createError(422, "Tokens required."))
    }

    const isValid = await verifyToken(tokenFromClient)
    if (!isValid) {
        return next(createError(422, "invalid tokens."))
    }

    const isExpire = checkTokenExpiry(isValid.exp)
    if (isExpire) {
        return next(createError(401, "Token expired."))
    }

    const user = await UserModel.findOne({ email: isValid.email, tokenFromClient }).select("+password")

    if (!user) {
        return next(createError(422, "invalid user."))
    }

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }

    const { refreshToken, accessToken } = generateCookies(payload);

    user.refreshToken = refreshToken;
    user.accessToken = accessToken;
    await user.save();

    res.status(200).json(new ApiResponse(payload, "Token refreshed!!"))

})

const logout = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    await UserModel.findByIdAndUpdate(_id, {
        refreshToken: null,
        accessToken: null
    })

    res.status(200).
        cookie("refreshToken", null, { httpOnly: true, expireIn: new Date() }).
        cookie("accessToken", null, { httpOnly: true, expireIn: new Date() }).
        json(new ApiResponse(null, "logout successfully."))

})

export { registerUser, loginUser, refreshToken, logout };