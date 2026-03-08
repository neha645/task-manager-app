import Task from "../models/task.model.js";

export const createTask = async (data) => {
  try {
    console.log(`[Service] Creating a new task with data:`, data);
    const task = await Task.create(data);
    console.log(`[Service] Task created successfully in DB: ${task._id}`);
    return task;
  } catch (error) {
    console.error(`[Service] Database error creating task:`, error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    console.log(`[Service] Fetching all tasks from DB`);
    const tasks = await Task.find();
    console.log(`[Service] Successfully retrieved ${tasks.length} tasks from DB`);
    return tasks;
  } catch (error) {
    console.error(`[Service] Database error fetching tasks:`, error);
    throw error;
  }
};

export const updateTask = async (id, data) => {
  try {
    console.log(`[Service] Updating task ${id} in DB with data:`, data);
    const task = await Task.findByIdAndUpdate(id, data, { new: true });
    if(task) {
        console.log(`[Service] Task ${id} updated successfully in DB`);
    } else {
        console.warn(`[Service] Task ${id} not found in DB for update`);
    }
    return task;
  } catch (error) {
    console.error(`[Service] Database error updating task ${id}:`, error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    console.log(`[Service] Deleting task ${id} from DB`);
    const task = await Task.findByIdAndDelete(id);
    if(task) {
        console.log(`[Service] Task ${id} deleted successfully from DB`);
    } else {
        console.warn(`[Service] Task ${id} not found in DB for deletion`);
    }
    return task;
  } catch (error) {
    console.error(`[Service] Database error deleting task ${id}:`, error);
    throw error;
  }
};