import express from "express";

import protect from "../middleware/authMid.js";

import {
  createTask,
  getTasks,
  toggleTask,
  deleteTask,
  clearCompletedTasks,
} from "../controllers/tasksCtrl.js";

const router = express.Router();


// =====================================
// TASKS
// =====================================

router
  .route("/")
  .post(protect, createTask)
  .get(protect, getTasks);


// =====================================
// TOGGLE TASK
// =====================================

router.put(
  "/:id",
  protect,
  toggleTask
);


// =====================================
// DELETE TASK
// =====================================

router.delete(
  "/completed",
  protect,
  clearCompletedTasks
);

router.route("/:id").put(protect).delete(protect, deleteTask);

export default router;