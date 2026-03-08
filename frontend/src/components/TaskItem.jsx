import {
  CheckCircle2,
  Circle,
  Clock,
  Trash2,
  Calendar,
  Edit2,
  FileText
} from "lucide-react";

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  const isCompleted = task.status === "completed";

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div
      className={`relative group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 ${
        isCompleted ? "opacity-60 bg-slate-50" : "opacity-100"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={() =>
            onStatusChange(
              task._id,
              isCompleted ? "pending" : "completed"
            )
          }
          className="mt-1 transition-transform active:scale-95"
        >
          {getStatusIcon(task.status)}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3
              className={`text-lg font-semibold truncate transition-colors ${
                isCompleted
                  ? "text-slate-400 line-through"
                  : "text-slate-800 group-hover:text-purple-600"
              }`}
            >
              {task.title}
            </h3>
          </div>

          <p
            className={`text-sm mb-4 line-clamp-2 transition-colors ${
              isCompleted ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {task.description || "No description provided."}
          </p>

          <div className="flex items-center gap-4 text-xs font-medium mt-auto">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${
                isCompleted
                  ? "bg-slate-50 text-slate-400 border-slate-200"
                  : "bg-slate-50 text-slate-500 border-slate-200"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(task.createdAt || Date.now()).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-2 bg-slate-50 hover:bg-blue-50 text-blue-500 hover:text-blue-600 rounded-lg transition-colors border border-transparent hover:border-blue-200"
            title="Edit task"
          >
             <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 bg-slate-50 hover:bg-red-50 text-red-500 hover:text-red-600 rounded-lg transition-colors border border-transparent hover:border-red-200"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
