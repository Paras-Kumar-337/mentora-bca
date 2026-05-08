import Task from "../models/Task.js";


// ======================================
// CREATE TASK
// ======================================

export const createTask = async (req, res) => {
  try {

    const { title, dueDate } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      dueDate,
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// GET USER TASKS
// ======================================

export const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// TOGGLE TASK COMPLETE
// ======================================

export const toggleTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }


    // SECURITY CHECK
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }


    task.completed = !task.completed;

    await task.save();

    res.status(200).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// DELETE TASK
// ======================================

export const deleteTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }


    // SECURITY CHECK
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }


    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const clearCompletedTasks =
  async (req, res) => {

    try {

      await Task.deleteMany({
        user: req.user._id,
        completed: true,
      });

      res.status(200).json({
        message:
          "Completed tasks cleared",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
};