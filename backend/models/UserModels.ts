import { Schema, model } from "mongoose";
import { IUser } from "../types";
import { GENDER_ENUM } from "../utils/Enums";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>({
    avatar: {
        type: String,
        default: null
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Enter A valid username.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please Enter A Email.'],
        index: true
    },
    password: {
        type: String,
        required: [true, 'Please Enter A password.'],
        select: false
    },
    dob: {
        type: Date,
        default: null
    },
    gender: {
        enum: GENDER_ENUM,
        default: null
    },
    bio: {
        type: String,
        default: null,
        trim: true
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

const UserModel = model<IUser>("UserModel", userSchema, "Users")
export default UserModel;