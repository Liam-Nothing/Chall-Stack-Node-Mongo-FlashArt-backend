import { Request, Response } from "express";
import User, { UserDocument } from "../models/User";

// GET /api/users - Get all users, with optional role filter
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const role = req.query.role;
    let users;
    if (role) {
      users = await User.find({ role: role });
    } else {
      users = await User.find();
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// GET /api/users/:id - Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

// PUT /api/users/:id - Update user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error updating user" });
  }
};

// DELETE /api/users/:id - Delete user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

// GET /api/users/me - Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserDocument;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching current user" });
  }
};
