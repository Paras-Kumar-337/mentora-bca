import express from "express";

import protect from "../middleware/authMid.js";

import {
  upsertPerformance,
  getPerformance,
} from "../controllers/performanceCtrl.js";

const router = express.Router();


// ======================================
// PERFORMANCE
// ======================================

router
  .route("/")
  .post(protect, upsertPerformance)
  .get(protect, getPerformance);


export default router;