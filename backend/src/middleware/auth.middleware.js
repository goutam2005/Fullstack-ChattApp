import JWT from 'jsonwebtoken'
import User from "../models/use.model.js"

const protectAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) { return res.status(401).json({ message: "You are not authorized" }) }
        const decoded = JWT.verify(token, process.env.JWT_SECRET)
        if (!decoded) { return res.status(401).json({ message: "You are not authorized" }) }
        const user = await User.findById(decoded.userID).select("-password")
        if (!user) { return res.status(401).json({ message: "You are not authorized" }) }
        req.user = user
        next()
    } catch (error) {
        console.log("protectAuth error", error);
        res.status(500).send(error);
    }

}
export default protectAuth