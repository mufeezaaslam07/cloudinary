import { body } from "express-validator";

const registrationRules = () => [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export { registrationRules };
