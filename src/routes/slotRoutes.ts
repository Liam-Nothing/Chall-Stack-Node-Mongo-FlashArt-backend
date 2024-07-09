import { Router } from "express";
import {
  getAllSlots,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot,
} from "../controllers/slotController";
import passport from "passport";

const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), getAllSlots);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getSlotById
);
router.post("/", passport.authenticate("jwt", { session: false }), createSlot);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateSlot
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteSlot
);

export default router;
