import {Request, Response} from "express"
import User from './user.models'
import { registerSchema } from "./auth.schema"
import jwt from "jsonwebtoken"
import { loginSchema } from "./auth.schema"

export const registerUser = async (req: Request, res: Response) => {
    const parsed = registerSchema.safeParse(req.body)
    if(!parsed.success){
        return res.status(400).json({
            message: "Validation failed",
            errors: parsed.error.issues,
        })
    }

    const {name, email, password} = parsed.data

    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            message: "Email already register"
        })
    }

    const user = await User.create({
        name,
        email,
        password
    })

    res.status(201).json({
        message: "User register successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
}

export const loginUser = async (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body)
    if(!parsed.success){
        return res.status(400).json({
            message: "Validation failed",
            errors: parsed.error.issues,
        })
    }

    const {email, password} = parsed.data

    const user = await User.findOne({email})

    if(!user){
        return res.status(401).json({message: "Invalid credentials"})
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET as string,
        {expiresIn: "1d"}
    );

    res.json({
        message: "Login successfull",
        token,
    })
}