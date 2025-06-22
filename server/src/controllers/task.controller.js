import {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
} from "../services/task.service.js";

export async function createTaskCtrl(req, res) {
  try {
    const task = await createTask(req.body, req.user.sub);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function listTasksCtrl(req, res) {
  try {
    const tasks = await listTasks(req.user.sub, req.query);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateTaskCtrl(req, res) {
  try {
    const task = await updateTask(req.params.id, req.user.sub, req.body);
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteTaskCtrl(req, res) {
  try {
    await deleteTask(req.params.id, req.user.sub);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}