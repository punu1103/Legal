
import { Router } from "express";
import multer from "multer";
import path from "node:path";
import { attachDocument, listDocuments } from "../controllers/documents.controller";
import { requireAuth } from "../middleware/auth.middleware";

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "uploads"),
  filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const r = Router();
r.get("/:policyId", requireAuth, listDocuments);
r.post("/:policyId/upload", requireAuth, upload.single("file"), attachDocument);
export default r;
