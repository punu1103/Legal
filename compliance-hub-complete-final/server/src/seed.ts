
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/user.model";
import { Policy } from "./models/policy.model";
import { Task } from "./models/task.model";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connectForSeed() {
  const uri = process.env.MONGO_URI;
  if (uri && uri.trim()) { await mongoose.connect(uri); return; }
  const mem = await MongoMemoryServer.create();
  await mongoose.connect(mem.getUri());
}
async function run() {
  await connectForSeed();

  const adminEmail = "admin@example.com";
  const admin = await User.findOne({ email: adminEmail }) ||
    await User.create({ email: adminEmail, name: "Admin", role: "ADMIN", password: await bcrypt.hash("admin123", 10) });

  const p = await Policy.create({ title: "Safety Compliance", code: "POL-001", description: "Workplace safety", owner: admin._id });
  await Task.create({ title: "PPE Audit", policy: p._id, assignee: admin._id, status: "PENDING" });

  console.log("Seed done");
  process.exit(0);
}
run().catch((e) => { console.error(e); process.exit(1); });
