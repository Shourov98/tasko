import { Router } from "express";
import { authGuard } from "../middlewares/auth.middleware.js";

export const protectedRouter = Router();

protectedRouter.get("/", authGuard, (req, res) => {
  res.json({ message: "Protected content", user: req.user });
});