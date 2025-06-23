import { z } from "zod";

// Common fields used in both create and edit
const baseTaskSchema = z.object({
  category: z.enum([
    "Arts & Crafts",
    "Nature",
    "Family",
    "Sport",
    "Friends",
    "Meditation"
  ]).describe("Task category"),
  description: z.string()
    .min(1, "Description is required")
    .max(100, "Description must be less than 100 characters"),
  date: z.string()
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date >= new Date();
    }, "Date must be a valid future date"),
});

// Schema for creating a new task
export const createTaskSchema = baseTaskSchema.extend({
  status: z.enum(["Pending", "In Progress", "Done"]).default("Pending"),
});

// Schema for editing an existing task
export const editTaskSchema = baseTaskSchema.extend({
  status: z.enum(["Pending", "In Progress", "Done"]).optional(),
  description: z.string()
    .min(1, "Description is required")
    .max(100, "Description must be less than 100 characters")
    .optional(),
});

// Schema for filtering tasks
export const filterTaskSchema = z.object({
  status: z.enum(["Pending", "In Progress", "Done"]).optional(),
  category: z.enum([
    "Arts & Crafts",
    "Nature",
    "Family",
    "Sport",
    "Friends",
    "Meditation"
  ]).optional(),
  date: z.string().optional()
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "Date must be a valid date"),
});

// Helper function to validate a date string
export function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
