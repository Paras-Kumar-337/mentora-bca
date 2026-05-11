import express from "express";

import {
  signupUser,
  loginUser,
  sendResetOtp,
  resetPassword,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authCtrl.js";

import protect from "../middleware/authMid.js";

const router = express.Router();


// SIGNUP
router.post("/signup", signupUser);


// LOGIN
router.post("/login", loginUser);

router.post(
  "/send-reset-otp",
  sendResetOtp
);

router.post(
  "/reset-password",
  resetPassword
);


// GET USER PROFILE
router.get("/profile", protect, getUserProfile);

// UPDATE USER PROFILE
router.put("/profile", protect, updateUserProfile);

export default router;