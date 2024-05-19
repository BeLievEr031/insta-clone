import mongoose from "mongoose";
import bcrypt from "bcrypt"
import createError from "http-errors";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username."],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    fullName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'default-avatar.jpg'
    },
    coverPhoto: {
        type: String,
        default: 'default-cover-photo.jpg'
    },
    refreshToken: {
        type: String,
        default: null
    },
    accessToken: {
        type: String,
        default: null
    },
}, {
    timestamps: true
});


userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        next();
    } catch (error) {
        next(createError(500, error.message))
    }

})



const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;
