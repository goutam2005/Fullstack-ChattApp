import JWT from "jsonwebtoken";
export const token = (userID, res) => {
    const token = JWT.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    res.cookie("token", token, {
        httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "production"
    });
    return token;
}