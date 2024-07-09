import { Router } from "express";
import {
  getAllStyles,
  getStyleById,
  createStyle,
  updateStyle,
  deleteStyle,
} from "../controllers/styleController";
import passport from "passport";

const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), getAllStyles);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getStyleById
);
router.post("/", passport.authenticate("jwt", { session: false }), createStyle);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateStyle
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteStyle
);

export default router;
