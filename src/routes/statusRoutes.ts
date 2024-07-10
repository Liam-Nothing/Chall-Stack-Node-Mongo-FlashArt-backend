import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  const state = mongoose.connection.readyState;
  res.json({ status: state === 1 ? "connected" : "disconnected" });
});

export default router;
