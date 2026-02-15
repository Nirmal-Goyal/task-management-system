import { Request, Response, NextFunction } from "express";
import { success } from "zod";

export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"

    res.status(statusCode).json({
        success: false,
        message,
        ...err(process.env.NODE_ENV === "development" && {stack: err.stack})
    })
}