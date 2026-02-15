import { title } from "node:process";
import {z} from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(3, "Title must be atleast 3 characters"),
    description: z.string().optional()
})

export const updateTaskSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    status: z.enum(["PENDING", "IN-PROGRESS", "COMPLETED"]).optional(),
})