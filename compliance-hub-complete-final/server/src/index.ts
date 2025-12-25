
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import path from "node:path";
import { MongoMemoryServer } from "mongodb-memory-server";

import authRoutes from "./routes/auth.routes";
import complianceRoutes from "./routes/compliance.routes";
import documentsRoutes from "./routes/documents.routes";
import { errorHandler } from "./middleware/error.middleware";

async function connectMongo(): Promise<void> {
  const uri = process.env.MONGO_URI;
  if (uri && uri.trim().length > 0) {
    await mongoose.connect(uri);
    console.log("MongoDB connected:", uri);
    return;
  }
  const mem = await MongoMemoryServer.create();
  const memUri = mem.getUri();
  await mongoose.connect(memUri);
  console.log("MongoDB (in-memory) connected:", memUri);
}

async function start() {
  await connectMongo();

  const app = express();
  app.use(helmet());
  app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
  app.use(express.json());
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  app.get("/api/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

  app.use("/api/auth", authRoutes);
  app.use("/api/compliance", complianceRoutes);
  app.use("/api/documents", documentsRoutes);

  app.use(errorHandler);

  const PORT = Number(process.env.PORT || 8080);
  app.listen(PORT, () => console.log(`API listening on :${PORT}`));
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
