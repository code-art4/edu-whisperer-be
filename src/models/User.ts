import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email?: string;
    password?: string;
    avatar?: string;
    role: "user" | "admin";
    isGuest: boolean;
    token: "string"
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
    avatar: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isGuest: { type: Boolean, default: false },
});

export default mongoose.model<IUser>("User", UserSchema);
