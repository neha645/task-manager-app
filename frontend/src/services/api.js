import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const taskService = {
  getTasks: async () => {
    try {
      const response = await api.get("/tasks");
      return response.data;
    } catch (error) {
      console.error(`[Frontend API] Error fetching tasks:`, error);
      throw error;
    }
  },
  createTask: async (taskData) => {
    try {
      const response = await api.post("/tasks", taskData);
      return response.data;
    } catch (error) {
      console.error(`[Frontend API] Error creating task:`, error);
      throw error;
    }
  },
  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`[Frontend API] Error updating task ${id}:`, error);
      throw error;
    }
  },
  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`[Frontend API] Error deleting task ${id}:`, error);
      throw error;
    }
  },
};

export default api;
