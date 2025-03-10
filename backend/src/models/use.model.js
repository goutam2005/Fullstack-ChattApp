import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlenght: 6,
    },
    profilePic: {
        type: String,
        default: "",
    },

}, { timestamps: true });

export default mongoose.model("User", User);