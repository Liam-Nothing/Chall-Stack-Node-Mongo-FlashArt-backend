import { Router } from "express";
import {
  getAllFlashes,
  getFlashById,
  getMyFlashes,
  createFlash,
  updateFlash,
  deleteFlash,
  searchFlashes,
} from "../controllers/flashController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getAllFlashes);
router.get("/search", searchFlashes);
router.get("/my", authenticateJWT, getMyFlashes);
router.get("/:id", getFlashById);
router.post("/", authenticateJWT, createFlash);
router.put("/:id", authenticateJWT, updateFlash);
router.delete("/:id", authenticateJWT, deleteFlash);

export default router;
