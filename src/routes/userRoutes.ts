import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCurrentUser,
} from "../controllers/userController";
import passport from "passport";
import { requireRole } from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  // requireRole("admin"),
  getAllUsers
);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  requireRole("admin"),
  getUserById
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  requireRole("admin"),
  updateUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  requireRole("admin"),
  deleteUser
);

export default router;
