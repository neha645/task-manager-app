import { useState, useEffect } from "react";
import { X, Save, Plus } from "lucide-react";

const TaskForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "pending",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
    };
    onSubmit(submitData);
    if (!initialData) {
      setFormData({
        title: "",
        description: "",
        status: "pending",
      });
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-semibold text-slate-800">
          {initialData ? "Edit Task" : "Create New Task"}
        </h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 ml-1">Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="E.g., Complete project proposal"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 ml-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add details about this task..."
            rows="3"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 ml-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
          >
            <option value="pending" className="bg-white text-slate-900">Pending</option>
            <option value="in-progress" className="bg-white text-slate-900">In Progress</option>
            <option value="completed" className="bg-white text-slate-900">Completed</option>
          </select>
        </div>

        <div className="pt-4 flex gap-3">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]"
          >
            {initialData ? (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Create Task
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
