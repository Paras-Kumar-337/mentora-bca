import express from "express";

import {
    addStudyMessage,
} from "../controllers/studyChatCtrl.js";

import protect from "../middleware/authMid.js";

import upload from "../middleware/uploadMid.js";

const router = express.Router();

router.post(
  "/chat",
  protect,
  upload.single("image"),
  addStudyMessage
);

export default router;