import express from "express";

import protect from "../middleware/authMid.js";

import {
  createExam,
  getDateSheet,
  getUpcomingExams,
} from "../controllers/datesheetCtrl.js";

const router = express.Router();


// ======================================
// DATE SHEET
// ======================================

router
  .route("/")
  .post(protect, createExam)
  .get(getDateSheet);


// ======================================
// UPCOMING EXAMS
// ======================================

router.get(
  "/upcoming",
  getUpcomingExams
);


export default router;