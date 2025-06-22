import { Router } from "express";
import {
  createTaskCtrl,
  listTasksCtrl,
  updateTaskCtrl,
  deleteTaskCtrl,
} from "../controllers/task.controller.js";
import {
  validateTaskCreate,
  validateTaskUpdate,
} from "../middlewares/validation.middleware.js";

export const taskRouter = Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     security: [{ cookieAuth: [] }]
 *     summary: List tasks for current user
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: ["Pending","In Progress","Done"] }
 *     responses:
 *       200: { description: OK }
 */
taskRouter.get("/", listTasksCtrl);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     security: [{ cookieAuth: [] }]
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [category, description, date]
 */
taskRouter.post("/", validateTaskCreate, createTaskCtrl);

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     security: [{ cookieAuth: [] }]
 *     summary: Update task description or status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 */
taskRouter.patch("/:id", validateTaskUpdate, updateTaskCtrl);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     security: [{ cookieAuth: [] }]
 *     summary: Delete a task
 *     description: Delete a task by its ID. Only the owner of the task can delete it.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID to delete
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       400:
 *         description: Invalid task ID or task not found
 *       401:
 *         description: Unauthorized - must be authenticated
 *       403:
 *         description: Forbidden - user is not the owner of the task
 */
taskRouter.delete("/:id", deleteTaskCtrl);