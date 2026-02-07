import mongoose, {Document, Schema} from "mongoose";
import bcrypt from "bcrypt"

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        }
    },
    {timestamps: {createdAt: true, updatedAt: true}}
)

userSchema.pre("save", async function (this: IUser) {
    if(!this.isModified("password")) return 

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (this: IUser, candidatePassword: string): Promise<boolean>{
    return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model<IUser>("User", userSchema)

export default User;