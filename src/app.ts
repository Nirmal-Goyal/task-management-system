import express from "express"
import authRoutes from "./modules/auth/auth.routes"
import { authMiddleware } from "./middlewares/auth.middleware"

const app = express()

app.use(express.json())

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Task Management API running")
})

app.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You are authorized"
    })
})

export default app