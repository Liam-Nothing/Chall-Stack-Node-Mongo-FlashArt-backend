import { Request, Response, NextFunction } from "express";
import { UserDocument } from "../models/User";

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserDocument;
    if (user.role !== role) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};
