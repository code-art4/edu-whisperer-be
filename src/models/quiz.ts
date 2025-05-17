import mongoose, { Schema } from "mongoose";

interface IQuiz {
    topic: String,
    options: String[]
}

const QuizSchema = new Schema({
    topic: { type: String, required: true },
    options: { type: Array, required: true }
})

export default mongoose.model<IQuiz>("Quiz", QuizSchema);