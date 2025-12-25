
import { Router } from "express";
import { getPolicies, getPolicyById, createPolicy, updatePolicy, deletePolicy, getTasksByPolicy, createTask, updateTaskStatus } from "../controllers/compliance.controller";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

const r = Router();
r.get("/policies", requireAuth, getPolicies);
r.get("/policies/:id", requireAuth, getPolicyById);
r.post("/policies", requireAuth, requireRole("ADMIN"), createPolicy);
r.put("/policies/:id", requireAuth, requireRole("ADMIN"), updatePolicy);
r.delete("/policies/:id", requireAuth, requireRole("ADMIN"), deletePolicy);

r.get("/policies/:id/tasks", requireAuth, getTasksByPolicy);
r.post("/policies/:id/tasks", requireAuth, requireRole("ADMIN","REVIEWER"), createTask);
r.patch("/tasks/:id/status", requireAuth, updateTaskStatus);

export default r;
