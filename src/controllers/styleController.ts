import { Request, Response } from "express";
import Style, { StyleDocument } from "../models/Style";

// GET /api/styles - Get all styles
export const getAllStyles = async (req: Request, res: Response) => {
  try {
    const styles = await Style.find();
    res.status(200).json(styles);
  } catch (err) {
    res.status(500).json({ error: "Error fetching styles" });
  }
};

// GET /api/styles/:id - Get style by ID
export const getStyleById = async (req: Request, res: Response) => {
  try {
    const style = await Style.findById(req.params.id);
    if (!style) {
      return res.status(404).json({ error: "Style not found" });
    }
    res.status(200).json(style);
  } catch (err) {
    res.status(500).json({ error: "Error fetching style" });
  }
};

// POST /api/styles - Create a new style
export const createStyle = async (req: Request, res: Response) => {
  try {
    const style = new Style(req.body);
    await style.save();
    res.status(201).json(style);
  } catch (err) {
    res.status(500).json({ error: "Error creating style" });
  }
};

// PUT /api/styles/:id - Update style by ID
export const updateStyle = async (req: Request, res: Response) => {
  try {
    const style = await Style.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!style) {
      return res.status(404).json({ error: "Style not found" });
    }
    res.status(200).json(style);
  } catch (err) {
    res.status(500).json({ error: "Error updating style" });
  }
};

// DELETE /api/styles/:id - Delete style by ID
export const deleteStyle = async (req: Request, res: Response) => {
  try {
    const style = await Style.findByIdAndDelete(req.params.id);
    if (!style) {
      return res.status(404).json({ error: "Style not found" });
    }
    res.status(200).json({ message: "Style deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting style" });
  }
};
