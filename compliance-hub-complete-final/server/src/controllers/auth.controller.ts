
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

function signTokens(user: any) {
  const accessToken = jwt.sign({ sub: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

export async function register(req: Request, res: Response) {
  const { email, name, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: "Email already in use" });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, name, password: hash, role: role || "USER" });
  const tokens = signTokens(user);
  res.status(201).json({ user: { id: user._id, email: user.email, name: user.name, role: user.role }, ...tokens });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const tokens = signTokens(user);
  res.json({ user: { id: user._id, email: user.email, name: user.name, role: user.role }, ...tokens });
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;
  try {
    const payload: any = jwt.verify(refreshToken, process.env.JWT_SECRET!);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: "Invalid token" });
    const tokens = signTokens(user);
    res.json(tokens);
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
