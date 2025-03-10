import User from "../models/use.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudnary.lib.js";
import mongoose from "mongoose";
import { getReceverSocketId, io } from "../lib/socket.js";
const getUsers = async (req, res) => {
    try {
        const user = req.user._id
        const users = await User.find({ _id: { $ne: user } }).select("-password");
        res.json(users);
    } catch (error) {
        console.log(error)
    }
}

const getMessage = async (req, res) => {
    try {
        const { id: userToChatID } = req.params
        const senderID = req.user._id
        const messages = await Message.find({
            $or: [
                { senderID: senderID, receiverID: userToChatID },
                { senderID: userToChatID, receiverID: senderID },
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
    }
}

const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const senderID = req.user._id
        // console.log("senderID", senderID)
        const receiverIDstr = req.params.id
        const receiverID = new mongoose.Types.ObjectId(receiverIDstr) // Convert to ObjectId
        // console.log("receiverID", receiverID)

        let imageUrl = null
        if (image) {
            const { secure_url } = await cloudinary.uploader.upload(image, {
                folder: "chat-app",
            })
            imageUrl = secure_url
        }

        const newMessage = new Message({
            senderID,
            receiverID,
            text,
            image: imageUrl,
        })

        await newMessage.save()

        const receverSoketId = getReceverSocketId(receiverIDstr)
        if (receverSoketId) {
            io.to(receverSoketId).emit("newMessage", newMessage)
        }
        res.status(200).json(newMessage)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export { getUsers, getMessage, sendMessage }