import { Router } from "express";
import {
  getAllSlots,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot,
  bookSlot,
  getAvailableSlotsByTatoueur,
} from "../controllers/slotController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateJWT, getAllSlots);
router.get("/available", authenticateJWT, getAvailableSlotsByTatoueur); // New route for available slots
router.get("/:id", authenticateJWT, getSlotById);
router.post("/", authenticateJWT, createSlot);
router.put("/:id", authenticateJWT, updateSlot);
router.delete("/:id", authenticateJWT, deleteSlot);
router.put("/:id/book", authenticateJWT, bookSlot);

export default router;
