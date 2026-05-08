import express from "express";

import protect from "../middleware/authMid.js";

import {
  getStudyChat,
  addStudyMessage,
  clearStudyChat,
} from "../controllers/studyChatCtrl.js";

const router = express.Router();


// ======================================
// STUDY CHAT
// ======================================

router
  .route("/")
  .get(protect, getStudyChat)
  .post(protect, addStudyMessage)
  .delete(protect, clearStudyChat);


export default router;