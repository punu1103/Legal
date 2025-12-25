
import { Schema, model, models } from "mongoose";
export type Role = "ADMIN" | "REVIEWER" | "USER";
export interface IUser { _id: string; email: string; name: string; role: Role; password: string; createdAt: Date; updatedAt: Date; }
const UserSchema = new Schema<IUser>(
  { email: { type: String, unique: true, required: true, index: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "REVIEWER", "USER"], default: "USER" },
    password: { type: String, required: true } },
  { timestamps: true }
);
export const User = models.User || model<IUser>("User", UserSchema);
