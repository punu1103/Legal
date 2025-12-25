
import { Schema, model, models, Types } from "mongoose";
export interface IDocument { _id: string; name: string; url: string; policy: Types.ObjectId; createdAt: Date; }
const DocumentSchema = new Schema<IDocument>(
  { name: { type: String, required: true },
    url:  { type: String, required: true },
    policy: { type: Schema.Types.ObjectId, ref: "Policy", required: true, index: true } },
  { timestamps: { createdAt: true, updatedAt: false } }
);
export const Document = models.Document || model<IDocument>("Document", DocumentSchema);
