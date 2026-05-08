import express from "express";

import protect
from "../middleware/authMid.js";

import {
  improveResume,
} from "../controllers/careerCtrl.js";

const router = express.Router();

router.post(
  "/improve",
  protect,
  improveResume
);

export default router;