import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export async function createTask(data, userId) {
  const task = await Task.create({ ...data, ownerId: userId });
  return task;
}

export async function listTasks(userId, filter = {}) {
  const query = { ownerId: userId };
  if (filter.status) query.status = filter.status;
  return Task.find(query).sort({ date: 1 });
}

export async function updateTask(taskId, userId, updates) {
  const task = await Task.findOne({ _id: taskId, ownerId: userId });
  if (!task) throw new Error("Task not found");
  // Prevent category mutation
  if (updates.category && updates.category !== task.category) {
    throw new Error("Category cannot be modified");
  }
  const wasDone = task.status === "Done";
  const willBeDone = updates.status === "Done";
  Object.assign(task, updates);
  // Award points once
  if (!wasDone && willBeDone && !task.pointsAwarded) {
    await User.updateOne({ _id: userId }, { $inc: { points: 20 } });
    task.pointsAwarded = true;
  }
  await task.save();
  return task;
}

export async function deleteTask(taskId, userId) {
  await Task.deleteOne({ _id: taskId, ownerId: userId });
}