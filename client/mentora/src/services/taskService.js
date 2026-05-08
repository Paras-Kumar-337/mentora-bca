import API from "./api";


// ======================================
// GET TASKS
// ======================================

export const getTasks = async () => {

  const { data } = await API.get(
    "/tasks"
  );

  return data;
};


// ======================================
// CREATE TASK
// ======================================

export const createTask = async (
  taskData
) => {

  const { data } = await API.post(
    "/tasks",
    taskData
  );

  return data;
};


// ======================================
// UPDATE TASK
// ======================================

export const updateTask = async (
  id,
  taskData
) => {

  const { data } = await API.put(
    `/tasks/${id}`,
    taskData
  );

  return data;
};


// ======================================
// DELETE TASK
// ======================================

export const deleteTask = async (id) => {

  const { data } = await API.delete(
    `/tasks/${id}`
  );

  return data;
};

// ======================================
// CLEAR COMPLETED TASKS
// ======================================

export const clearCompletedTasks =
  async () => {

    const { data } =
      await API.delete(
        "/tasks/completed"
      );

    return data;
};