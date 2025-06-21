import { Router } from "express";
import { signup, login, refresh, logout } from "../controllers/auth.controller.js";
import { validateSignup, validateLogin } from "../middlewares/validation.middleware.js";

export const authRouter = Router();

authRouter.post("/signup", validateSignup, signup);
authRouter.post("/login", validateLogin, login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);
