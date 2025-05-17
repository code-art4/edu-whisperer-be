import mongoose, { Schema } from 'mongoose'

interface ISession {
    title: String,
    startDate: Date,
    endDate: Date
}

const sessionSchema: Schema = new Schema({
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
})

export default mongoose.model<ISession>("Session", sessionSchema)