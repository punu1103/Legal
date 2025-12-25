
import { Schema, model, models, Types } from "mongoose";
export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
export interface ITask { _id: string; title: string; status: TaskStatus; dueDate?: Date; policy: Types.ObjectId; assignee?: Types.ObjectId; createdAt: Date; updatedAt: Date; }
const TaskSchema = new Schema<ITask>(
  { title: { type: String, required: true },
    status: { type: String, enum: ["PENDING","IN_PROGRESS","COMPLETED","BLOCKED"], default: "PENDING", index: true },
    dueDate: { type: Date },
    policy: { type: Schema.Types.ObjectId, ref: "Policy", required: true, index: true },
    assignee: { type: Schema.Types.ObjectId, ref: "User" } },
  { timestamps: true }
);
export const Task = models.Task || model<ITask>("Task", TaskSchema);
