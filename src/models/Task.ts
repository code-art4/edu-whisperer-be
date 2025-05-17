import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    subject: string;
    categories: string[];
    dueDate: Date;
    timeToFinish: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
}

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String, required: true },
    categories: [{ type: String, required: true }],
    dueDate: { type: Date, required: true },
    timeToFinish: { type: String, required: true },
    priority: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

export default mongoose.model<ITask>("Task", TaskSchema);
