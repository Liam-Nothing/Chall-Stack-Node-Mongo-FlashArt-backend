import { Router } from "express";
import mongoose from "mongoose";
import passport from "passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const state = mongoose.connection.readyState;
    res.json({ status: state === 1 ? "connected" : "disconnected" });
  }
);

export default router;
