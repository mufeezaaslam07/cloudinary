import express from "express";
import { register, getAllUsers } from "../controllers/authController.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// Register a new user
router.post("/register", upload.single("profileImage"), register);
router.get("/users", getAllUsers);

export default router;
