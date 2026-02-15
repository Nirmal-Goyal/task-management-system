import { Response } from "express";
import Task from "./task.models";
import { createTaskSchema } from "./task.schema";
import { AuthRequest } from "../../middlewares/auth.middleware";
import mongoose from "mongoose";


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

export const getAllTasks = async (req: AuthRequest, res: Response) => {
    const tasks = await Task.find({userId: req.userId}).sort({
        createdAt: -1,
    })

    res.json({
        count: tasks.length,
        tasks
    })
}

export const getSingleTask = async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            message: "Task not found"
        })
    }

    const task = await Task.findById(id)

    if(!task){
        return res.status(404).json({
            message: "Task not found"
        })
    }

    if(task.userId.toString()!==req.userId){
        return res.status(403).json({message: "Forbidden"})
    }

    res.json(task)
}