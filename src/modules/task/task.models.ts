import mongoose, {Schema, Document} from "mongoose";

export type TaskStatus = "PENDING" | "IN-PROGRESS || COMPLETED"

export interface ITask extends Document {
    title: string;
    description?: string;
    status: TaskStatus;
    userId: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
            minlength: 3,
            trim: true
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ["PENDING", "IN-PROGRESS", "COMPLETED"],
            default: "PENDING"
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
    },
    {timestamps: true}
)

const Task = mongoose.model<ITask>("Task", taskSchema)
export default Task;