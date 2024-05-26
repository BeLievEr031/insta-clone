import { Schema, model } from "mongoose"

const chatSchema = new Schema({
    senderid: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },

    receiverid: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },

    message: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const ChatModel = model("ChatModel", chatSchema)
export default ChatModel;