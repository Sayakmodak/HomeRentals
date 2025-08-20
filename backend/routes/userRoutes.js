import express from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
  updateUserProfile,
} from "../controllers/userController.js";
import { isAuthenticated } from "./../middleware/isAuthenticated.js";
import upload from "./../Utils/multer.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", isAuthenticated, getUserProfile);
router.put(
  "/update-profile",
  isAuthenticated,
  upload.single("imageFile"),
  updateUserProfile
);

export default router;
