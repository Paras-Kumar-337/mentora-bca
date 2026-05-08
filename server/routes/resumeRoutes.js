import express from "express";

import protect from "../middleware/authMid.js";

import {
  upsertResume,
  getResume,
  deleteResume,
} from "../controllers/resumeCtrl.js";

const router = express.Router();


// ======================================
// RESUME
// ======================================

router
  .route("/")
  .post(protect, upsertResume)
  .get(protect, getResume)
  .delete(protect, deleteResume);


export default router;