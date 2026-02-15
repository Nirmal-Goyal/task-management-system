import { Router } from "express";
import { createTask } from "./task.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { getAllTasks } from "./task.controller";
import { getSingleTask } from "./task.controller";
import { updateTask } from "./task.controller";


const router = Router();
router.post("/", authMiddleware, createTask)
router.get("/", authMiddleware, getAllTasks)
router.get("/:id", authMiddleware, getSingleTask)
router.put("/:id", authMiddleware, updateTask)

export default router;