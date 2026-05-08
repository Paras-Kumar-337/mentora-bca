import express from "express";

import protect from "../middleware/authMid.js";

import {
  createNote,
  getNotes,
  deleteNote,
} from "../controllers/notesCtrl.js";

const router = express.Router();


// ======================================
// NOTES
// ======================================

router
  .route("/")
  .post(protect, createNote)
  .get(getNotes);


// ======================================
// DELETE NOTE
// ======================================

router.delete(
  "/:id",
  protect,
  deleteNote
);


export default router;