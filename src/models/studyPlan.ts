import mongoose, { Schema, Document } from 'mongoose';

export interface ISession {
    title: String,
    startDate: Date,
    endDate: Date
}

export interface IStudyPlan extends Document {
    title: String,
    subject: String,
    startDate: Date,
    endDate: Date,
    studyGoal: String,
    category: String,
    session: ISession[]
}

const StudyPlanSchema: Schema = new Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    studyGoal: { type: String, required: true },
    category: { type: String, required: true },
    session: { type: Array, required: true }
})

export default mongoose.model<IStudyPlan>("StudyPlan", StudyPlanSchema);
