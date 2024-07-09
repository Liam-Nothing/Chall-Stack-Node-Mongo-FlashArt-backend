import { Router } from "express";
import {
  getAllFlashes,
  getFlashById,
  createFlash,
  updateFlash,
  deleteFlash,
} from "../controllers/flashController";
import passport from "passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllFlashes
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getFlashById
);
router.post("/", passport.authenticate("jwt", { session: false }), createFlash);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateFlash
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteFlash
);

export default router;
