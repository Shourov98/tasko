import mongoose from "mongoose";

const categories = [
  "Arts & Crafts",
  "Nature",
  "Family",
  "Sport",
  "Friends",
  "Meditation",
];

const statuses = ["Pending", "In Progress", "Done"];

const taskSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: { type: String, enum: categories, required: true },
    description: { type: String, maxlength: 100, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: statuses, default: "Pending" },
    pointsAwarded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

taskSchema.index({ ownerId: 1, status: 1 });

const Task = mongoose.model("Task", taskSchema);
export default Task;