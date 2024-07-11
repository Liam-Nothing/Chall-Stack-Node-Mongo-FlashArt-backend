import { Router } from "express";
import {
  getAllSlots,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot,
} from "../controllers/slotController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateJWT, getAllSlots);
router.get("/:id", authenticateJWT, getSlotById);
router.post("/", authenticateJWT, createSlot);
router.put("/:id", authenticateJWT, updateSlot);
router.delete("/:id", authenticateJWT, deleteSlot);

export default router;
