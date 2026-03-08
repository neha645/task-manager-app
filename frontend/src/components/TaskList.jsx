import TaskItem from "./TaskItem";
import { LayoutTemplate } from "lucide-react";

function TaskList({ tasks, loading, onEdit, onDelete, onStatusChange, onCreateClick }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-4">
         <h2 className="text-xl font-semibold text-slate-800">Your Tasks</h2>
         
         {/* Decorative elements */}
         <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full bg-slate-300"></div>
           <div className="w-2 h-2 rounded-full bg-slate-300"></div>
           <div className="w-2 h-2 rounded-full bg-slate-300"></div>
         </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl border-dashed">
          <LayoutTemplate className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-700 mb-2">No tasks found</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-6">You haven't created any tasks yet. Get started by adding your first task!</p>
          <button
             onClick={onCreateClick}
             className="text-purple-600 hover:text-purple-700 font-medium underline underline-offset-4 decoration-purple-600/30 hover:decoration-purple-600/80 transition-all"
          >
             Create a task
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
