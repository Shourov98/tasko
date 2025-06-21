import { body, validationResult } from "express-validator";

export const validateSignup = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
  body("confirmPassword")
    .custom((v, { req }) => v === req.body.password)
    .withMessage("Passwords do not match"),
  (req, res, next) => handleValidationErrors(req, res, next),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password required"),
  (req, res, next) => handleValidationErrors(req, res, next),
];

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({ errors: errors.array() });
}