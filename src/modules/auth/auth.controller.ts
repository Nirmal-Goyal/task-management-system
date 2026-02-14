import {Request, Response} from "express"
import User from './user.models'
import { registerSchema } from "./auth.schema"

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