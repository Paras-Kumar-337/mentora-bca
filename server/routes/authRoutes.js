import express from "express";

import {
  signupUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authCtrl.js";

import protect from "../middleware/authMid.js";

const router = express.Router();


// SIGNUP
router.post("/signup", signupUser);


// LOGIN
router.post("/login", loginUser);


// GET USER PROFILE
router.get("/profile", protect, getUserProfile);

// UPDATE USER PROFILE
router.put("/profile", protect, updateUserProfile);

export default router;