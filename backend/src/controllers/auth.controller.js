import { token } from "../functions/token.js";
import cloudinary from "../lib/cloudnary.lib.js";
import User from "../models/use.model.js"
import bcrypt from "bcryptjs"
const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        if (!username || !email || !password) {
            return res.status(400).send("All fields are required");
        }
        if (password.length < 6) {
            return res.status(400).send("Password must be at least 6 characters");
        }

        const existingUser = await User.findOne({ email });
        console.log(existingUser)
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newuser = new User({ username, email, password: hashedPassword });
        if (newuser) {
            token(newuser._id, res);
            newuser.save();
            res.status(201).send({
                id: newuser._id,
                username: newuser.username,
                email: newuser.email,
                profilePic: newuser.profilePic
            });
        } else {

            res.status(500).send("Error creating user");
        }

    } catch (error) {
        console.log("signup error", error);
        res.status(500).send(error);

    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("User not found");
        }
        token(user._id, res);
        res.send({
            id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("login error", error);
        res.status(500).send(error);

    }
}
const logout = async (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 })
        res.send("logout successfully")
    } catch (error) {
        console.log("logout error", error);
        res.status(500).send(error);
    }
}

const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
        console.log(userId)
        if (!profilePic) {
            return res.status(400).send("Profile picture is required");
        }
        const uploaded = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploaded.secure_url }, { new: true })
        res.status(200).send(updatedUser)
    } catch (error) {
        console.log("updateProfile error", error);
        res.status(500).send(error);
    }
}

const checkAuth = async (req, res) => {
    try {
        res.status(200).send(req.user)
    } catch (error) {
        console.log("checkAuth error")
        res.status(500).send(error);
    }
}

export { signup, login, logout, updateProfile, checkAuth };