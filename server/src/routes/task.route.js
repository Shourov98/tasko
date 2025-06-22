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

taskRouter.delete("/:id", deleteTaskCtrl);