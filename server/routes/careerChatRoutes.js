import express from "express";

import protect from "../middleware/authMid.js";

import {
  getCareerChat,
  addCareerMessage,
  clearCareerChat,
} from "../controllers/careerChatCtrl.js";

const router = express.Router();


// ======================================
// CAREER CHAT
// ======================================

router
  .route("/")
  .get(protect, getCareerChat)
  .post(protect, addCareerMessage)
  .delete(protect, clearCareerChat);


export default router;