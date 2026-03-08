import { useState, useEffect } from "react";
import { taskService } from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Plus, LayoutTemplate, Activity, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      setIsFormOpen(false);
      toast.success("Task created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create task");
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await taskService.updateTask(editingTask._id, taskData);
      setTasks((prev) =>
        prev.map((task) => (task._id === editingTask._id ? updatedTask : task))
      );
      setEditingTask(null);
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedTask = await taskService.updateTask(id, { status: newStatus });
       setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
      if (newStatus === "completed") {
        toast.success("Task marked as completed!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => t.status !== "completed").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-purple-500/30 font-sans relative overflow-x-hidden pb-20">
      {/* Background visual effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/50 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-200/50 rounded-full blur-[150px] mix-blend-multiply animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-purple-800 to-slate-700 mb-3">
                Task Manager App
              </h1>

            </div>
            
            {!isFormOpen && !editingTask && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 shadow-sm px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-purple-500/10 active:scale-95 group"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300 text-purple-600" />
                <span className="font-medium">New Task</span>
              </button>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <LayoutTemplate className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Tasks</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Active</p>
                <p className="text-2xl font-bold text-slate-800">{stats.active}</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-slate-800">{stats.completed}</p>
              </div>
            </div>
          </div>
        </header>

        <main>
          <TaskList 
            tasks={tasks}
            loading={loading}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onCreateClick={() => setIsFormOpen(true)}
          />
        </main>
      </div>

      {/* Modal Overlay for Task Form */}
      {(isFormOpen || editingTask) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => {
              setIsFormOpen(false);
              setEditingTask(null);
            }}
          ></div>
          <div className="relative z-10 w-full max-w-lg transform transition-all">
            <TaskForm
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              initialData={editingTask}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTask(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
