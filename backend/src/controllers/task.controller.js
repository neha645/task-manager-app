import * as taskService from "../services/task.service.js";

export const createTask = async (req, res) => {
  try {
    console.log(`[POST /api/tasks] Incoming request body:`, req.body);
    const task = await taskService.createTask(req.body);
    console.log(`[POST /api/tasks] Successfully created task: ${task._id}`);
    res.status(201).json(task);
  } catch (error) {
    console.error(`[POST /api/tasks] Error:`, error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    console.log(`[GET /api/tasks] Fetching all tasks`);
    const tasks = await taskService.getTasks();
    console.log(`[GET /api/tasks] Successfully fetched ${tasks?.length || 0} tasks`);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(`[GET /api/tasks] Error:`, error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    console.log(`[PUT /api/tasks/${req.params.id}] Incoming update:`, req.body);
    const task = await taskService.updateTask(
      req.params.id,
      req.body
    );
    if (!task) {
      console.warn(`[PUT /api/tasks/${req.params.id}] Task not found for update`);
      return res.status(404).json({ message: "Task not found" });
    }
    console.log(`[PUT /api/tasks/${req.params.id}] Successfully updated task`);
    res.status(200).json(task);
  } catch (error) {
    console.error(`[PUT /api/tasks/${req.params.id}] Error:`, error.message);
    res.status(400).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    console.log(`[DELETE /api/tasks/${req.params.id}] Request to delete task`);
    const task = await taskService.deleteTask(req.params.id);
    if (!task) {
        console.warn(`[DELETE /api/tasks/${req.params.id}] Task not found for deletion`);
      return res.status(404).json({ message: "Task not found" });
    }
    console.log(`[DELETE /api/tasks/${req.params.id}] Successfully deleted task`);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error(`[DELETE /api/tasks/${req.params.id}] Error:`, error.message);
    res.status(500).json({ message: error.message });
  }
};