import express from "express";
import { createEmbeddingsHandler, upsertVectorsHandler } from "./handlers.js";

const router = express.Router();

router.post("/api/create-embeddings", createEmbeddingsHandler);
router.post("/api/upsert-vectors", upsertVectorsHandler);

export default router;
