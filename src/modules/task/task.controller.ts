import { Response } from "express";
import Task from "./task.models";
import { createTaskSchema } from "./task.schema";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const createTask = async (req: AuthRequest, res: Response) => {
    const parsed = createTaskSchema.safeParse(req.body)
    if(!parsed.success){
        return res.status(400).json({
            message: "Validation failed",
            errors: parsed.error.issues
        })
    }

    const task = await Task.create({
        ...parsed.data,
        userId: req.userId,
    })

    res.status(201).json({
        message: "Task created",
        task
    })
}