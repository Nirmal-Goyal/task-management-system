import mongoose, {Schema, Document} from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document{
    name: string,
    email: string,
    password: string,
    comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
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
        },
    },
    {timestamps: true}
)

userSchema.pre("save", async function (){
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (
    candidate: string
): Promise<boolean>{
    return bcrypt.compare(candidate, this.password)
}

const User = mongoose.model<IUser>("User", userSchema)

export default User;