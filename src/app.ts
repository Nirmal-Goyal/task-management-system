import express from "express"
import authRoutes from "./modules/auth/auth.routes"

const app = express()

app.use(express.json())

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Task Management API running")
})

export default app