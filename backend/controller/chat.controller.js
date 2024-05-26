import asyncHandler from "express-async-handler";
import createError from "http-errors"
import FriendModel from "../model/FriendModel.js";
import ChatModel from "../model/ChatModel.js";
import ApiResponse from "../utils/ApiResponse.js";
const sendMessage = asyncHandler(async (req, res, next) => {
    const { message } = req.body;
    const { receiverid } = req.params;

    if (!message) {
        return next(createError(422, "Message required."))
    }

    if (!receiverid) {
        return next(createError(422, "receiver required."))
    }

    // Check receiver friend
    const friend = await FriendModel.findOne({
        $or: [
            { senderID: req.user._id, recieverID: receiverid },
            { senderID: receiverid, recieverID: req.user._id }
        ]
    })

    if (!friend) {
        return next(createError(422, "Invalid friend."))
    }

    const chat = await ChatModel.create({
        message,
        senderid: req.user._id,
        receiverid: receiverid
    })

    res.status(200).json(new ApiResponse(chat, "message sent."))
})

const deleteMessage = asyncHandler(async (req, res, next) => {
    const { message } = req.body;
    const { messageid } = req.params;

    if (!message) {
        return next(createError(422, "Message required."))
    }

    if (!receiverid) {
        return next(createError(422, "receiver required."))
    }

    // Check receiver friend
    const friend = await FriendModel.findOne({
        $or: [
            { senderID: req.user._id, recieverID: receiverid },
            { senderID: receiverid, recieverID: req.user._id }
        ]
    })

    if (!friend) {
        return next(createError(422, "Invalid friend."))
    }

    const chat = await ChatModel.create({
        message,
        senderid: req.user._id,
        receiverid: receiverid
    })

    res.status(200).json(new ApiResponse(chat, "message sent."))
})

// 100
export { sendMessage };