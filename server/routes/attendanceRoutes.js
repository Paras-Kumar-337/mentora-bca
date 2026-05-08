import express from "express";

import protect from "../middleware/authMid.js";

import {
  upsertAttendance,
  getAttendance,
  getAttendanceSummary,
  markAttendance,
} from "../controllers/attendanceCtrl.js";

const router = express.Router();


// ======================================
// ATTENDANCE
// ======================================

router
  .route("/")
  .post(protect, upsertAttendance)
  .get(protect, getAttendance);


// ======================================
// ATTENDANCE SUMMARY
// ======================================

router.get(
  "/summary",
  protect,
  getAttendanceSummary
);

// ======================================
// MARK ATTENDANCE
// ======================================

router.post(
    "/mark",
    protect,
    markAttendance
    );

export default router;