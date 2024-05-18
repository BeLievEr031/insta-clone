import createError from "http-errors";
import jwt from "jsonwebtoken"
import config from "../config/config.js";
import UserModel from "../model/UserModel.js";
import { checkTokenExpiry, verifyToken } from "../utils/utils.js";
import asyncHandler from "express-async-handler";

const auth = asyncHandler(async (req, res, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return next(createError(422, "Tokens required."))
    }

    const isValid = await verifyToken(accessToken);
    console.log(isValid);
    if (!isValid) {
        return next(createError(422, "invalid tokens."))
    }

    const isExpire = checkTokenExpiry(isValid.exp)
    if (isExpire) {
        return next(createError(401, "Token expired."))
    }


    const user = await UserModel.findOne({ email: isValid.email, accessToken })
    if (!user) {
        return next(createError(422, "invalid user."))
    }

    req.user = user;
    next()
})

export default auth;