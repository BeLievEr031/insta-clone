import { Schema, model } from "mongoose"

const friendSchema = new Schema({
    senderID: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },

    recieverID: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },

    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }

}, {
    timestamps: true
})


const FriendModel = model("FriendModel",friendSchema)
export default FriendModel;