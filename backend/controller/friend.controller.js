import asyncHandler from "express-async-handler";
import createError from "http-errors";
import UserModel from "../model/UserModel.js";
import FriendModel from "../model/FriendModel.js";
import ApiResponse from "../utils/ApiResponse.js";

const sendFriendRequest = asyncHandler(async (req, res, next) => {
    const { _id: senderID } = req.user;
    const { id: recieverID } = req.params;

    if (!recieverID) {
        return next(createError(422, "Reciever id required."))
    }

    if (senderID.toString() === recieverID) {
        return next(createError(422, "Can't sent friend request to self."))
    }

    const isValidFriend = await UserModel.findById(recieverID);
    if (!isValidFriend) {
        return next(createError(404, "Ghante ka friend."))
    }


    const isFriendReqExists = await FriendModel.findOne({ senderID, recieverID })

    if (isFriendReqExists) {
        return next(createError(409, "Friend request bheji ja chuki he."))
    }

    const newFriend = await FriendModel.create({
        senderID,
        recieverID
    })

    res.status(200).json(new ApiResponse(newFriend, "Friend request sent."))

})

const acceptRejectFriend = asyncHandler(async (req, res, next) => {
    const { _id: senderID } = req.user;
    const { id: friendReqID } = req.params;
    const { type } = req.query;

    if (!type) {
        return next(createError(422, "type required."))
    }

    const validTypes = ["accept", "reject"]

    if (!validTypes.includes(type)) {
        return next(createError(422, "invalid type."))
    }

    if (!friendReqID) {
        return next(createError(422, "friend req id required."))
    }

    const isValidFriendReq = await FriendModel.findOne({ senderID, _id: friendReqID });

    if (!isValidFriendReq) {
        return next(createError(404, "Ghante ka friend request."))
    }

    if (type === "accept") {
        isValidFriendReq.status = "accepted"
        await isValidFriendReq.save();
        res.status(200).json(new ApiResponse(isValidFriendReq, "Badhai ho friend hua he."))
    } else {
        await isValidFriendReq.deleteOne()
        res.status(200).json(new ApiResponse(null, "Badhai ho tumhara cut gya he."))
    }

})


const fetchFriends = asyncHandler(async (req, res) => {
    const { page, limit,sort } = req.query;
    const friends = await UserModel.find({}).skip((page - 1) * 10).limit(limit).sort(sort).
    select("-refreshToken -accessToken -password -createdAt -__v -updatedAt -coverPhoto -bio")

    res.status(200).json(new ApiResponse(friends,"Friends fetched."))

})

export { sendFriendRequest, acceptRejectFriend, fetchFriends }