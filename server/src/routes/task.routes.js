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
 *     description: Create a new task for the authenticated user. The task will be automatically associated with the current user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [category, description, date]
 *             properties:
 *               category:
 *                 type: string
 *                 enum: ["Arts & Crafts", "Nature", "Family", "Sport", "Friends", "Meditation"]
 *                 description: Category of the task
 *                 example: "Nature"
 *               description:
 *                 type: string
 *                 maxLength: 100
 *                 description: Description of the task
 *                 example: "Go for a morning walk in the park"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date when the task should be completed
 *                 example: "2025-06-25"
 *               status:
 *                 type: string
 *                 enum: ["Pending", "In Progress", "Done"]
 *                 description: Initial status of the task (defaults to "Pending" if not provided)
 *                 example: "Pending"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the created task
 *                 category:
 *                   type: string
 *                 description:
 *                   type: string
 *                 date:
 *                   type: string
 *                 status:
 *                   type: string
 *                 ownerId:
 *                   type: string
 *                   description: ID of the task owner (current user)
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the validation failure
 *       401:
 *         description: Unauthorized - user must be logged in
 *       403:
 *         description: Forbidden - user cannot create tasks for other users
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