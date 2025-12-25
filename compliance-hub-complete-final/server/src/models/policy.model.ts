
import { Schema, model, models, Types } from "mongoose";
export interface IPolicy { _id: string; title: string; code: string; description?: string; owner?: Types.ObjectId; createdAt: Date; updatedAt: Date; }
const PolicySchema = new Schema<IPolicy>(
  { title: { type: String, required: true },
    code: { type: String, unique: true, required: true, index: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User" } },
  { timestamps: true }
);
export const Policy = models.Policy || model<IPolicy>("Policy", PolicySchema);
