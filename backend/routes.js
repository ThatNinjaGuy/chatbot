import express from "express";
import {
  createEmbeddingsHandler,
  upsertVectorsHandler,
  completeChatHandler,
} from "./handlers.js";

const router = express.Router();

router.post("/api/create-embeddings", createEmbeddingsHandler);
router.post("/api/upsert-vectors", upsertVectorsHandler);
router.post("/api/complete-chat", completeChatHandler);

export default router;
