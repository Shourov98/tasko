import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z.string().min(2, "Name is too short"),
    email:    z.string().email("Invalid email"),
    password: z.string().min(6, "Min 6 chars"),
    confirm:  z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don’t match",
    path: ["confirm"],
  });

export const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean().optional(),
});
