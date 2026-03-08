import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    default: "Pending"
  },
  createdDate: {
    type: Date,
    default: Date.now
  } 
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
