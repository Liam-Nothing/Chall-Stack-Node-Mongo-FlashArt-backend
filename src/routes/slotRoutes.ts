import { Router } from "express";
import {
  getAllSlots,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot,
  bookSlot,
  getAvailableSlotsByTatoueur,
  getMySlots,
} from "../controllers/slotController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateJWT, getAllSlots);
router.get("/my", authenticateJWT, getMySlots);
router.get("/available", authenticateJWT, getAvailableSlotsByTatoueur);
router.get("/:id", authenticateJWT, getSlotById);
router.post("/", authenticateJWT, createSlot);
router.put("/:id", authenticateJWT, updateSlot);
router.delete("/:id", authenticateJWT, deleteSlot);
router.put("/:id/book", authenticateJWT, bookSlot);

export default router;
