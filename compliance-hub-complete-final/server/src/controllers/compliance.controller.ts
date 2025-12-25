
import { Request, Response } from "express";
import { Policy } from "../models/policy.model";
import { Task } from "../models/task.model";

// Policies
export async function getPolicies(_req: Request, res: Response) {
  const list = await Policy.find().populate("owner", "name email role").sort({ updatedAt: -1 });
  res.json(list);
}

export async function getPolicyById(req: Request, res: Response) {
  const { id } = req.params;
  const policy = await Policy.findById(id).populate("owner", "name email role");
  if (!policy) return res.status(404).json({ error: "Not found" });
  res.json(policy);
}

export async function createPolicy(req: Request, res: Response) {
  const { title, code, description, ownerId } = req.body;
  try {
    const p = await Policy.create({ title, code, description, owner: ownerId });
    res.status(201).json(p);
  } catch (e: any) {
    if (e.code === 11000) return res.status(409).json({ error: "Policy code already exists" });
    res.status(500).json({ error: "Failed to create policy" });
  }
}

export async function updatePolicy(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, ownerId } = req.body;
  const updated = await Policy.findByIdAndUpdate(id, { title, description, owner: ownerId }, { new: true });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
}

export async function deletePolicy(req: Request, res: Response) {
  const { id } = req.params;
  await Task.deleteMany({ policy: id }); // cascade tasks
  const del = await Policy.findByIdAndDelete(id);
  if (!del) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
}

// Tasks
export async function getTasksByPolicy(req: Request, res: Response) {
  const { id } = req.params;
  const tasks = await Task.find({ policy: id }).populate("assignee", "name email").sort({ createdAt: -1 });
  res.json(tasks);
}

export async function createTask(req: Request, res: Response) {
  const { id } = req.params;           // policy id
  const { title, dueDate, assigneeId } = req.body;
  const task = await Task.create({ title, dueDate, assignee: assigneeId, policy: id });
  res.status(201).json(task);
}

export async function updateTaskStatus(req: Request, res: Response) {
  const { id } = req.params;           // task id
  const { status } = req.body;
  const updated = await Task.findByIdAndUpdate(id, { status }, { new: true });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
}
