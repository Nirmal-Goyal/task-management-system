import { Router } from "express";
import { createTask } from "./task.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
router.post("/", authMiddleware, createTask)

export default router;