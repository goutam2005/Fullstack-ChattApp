import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import protectAuth from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.put("/updateProfile",protectAuth, updateProfile);
router.get("/me",protectAuth,checkAuth)
export default router;