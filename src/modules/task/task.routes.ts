import { Router } from "express";
import { createTask } from "./task.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { getAllTasks } from "./task.controller";

const router = Router();
router.post("/", authMiddleware, createTask)
router.get("/", authMiddleware, getAllTasks)

export default router;