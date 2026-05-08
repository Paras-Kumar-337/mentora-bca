import express from "express";

import protect from "../middleware/authMid.js";

import {
  createPost,
  getPosts,
  addReply,
} from "../controllers/communityCtrl.js";

const router = express.Router();


// ==============================
// POSTS
// ==============================

router
  .route("/")
  .post(protect, createPost)
  .get(getPosts);


// ==============================
// REPLIES
// ==============================

router.post(
  "/:id/reply",
  protect,
  addReply
);


export default router;