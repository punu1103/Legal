
import { Request, Response } from "express";
import { Document } from "../models/document.model";

export async function listDocuments(req: Request, res: Response) {
  const { policyId } = req.params;
  const docs = await Document.find({ policy: policyId }).sort({ createdAt: -1 });
  res.json(docs);
}

export async function attachDocument(req: Request, res: Response) {
  const { policyId } = req.params;
  const file = (req as any).file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });
  const doc = await Document.create({ policy: policyId, name: file.originalname, url: `/uploads/${file.filename}` });
  res.status(201).json(doc);
}
