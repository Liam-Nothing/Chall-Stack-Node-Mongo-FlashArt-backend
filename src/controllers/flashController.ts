import { Request, Response } from "express";
import Flash, { FlashDocument } from "../models/Flash";

// GET /api/flashes - Get all flashes
export const getAllFlashes = async (req: Request, res: Response) => {
  try {
    const flashes = await Flash.find().populate("id_style");
    res.status(200).json(flashes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching flashes" });
  }
};

// GET /api/flashes/:id - Get flash by ID
export const getFlashById = async (req: Request, res: Response) => {
  try {
    const flash = await Flash.findById(req.params.id).populate("id_style");
    if (!flash) {
      return res.status(404).json({ error: "Flash not found" });
    }
    res.status(200).json(flash);
  } catch (err) {
    res.status(500).json({ error: "Error fetching flash" });
  }
};

// POST /api/flashes - Create a new flash
export const createFlash = async (req: Request, res: Response) => {
  try {
    const flash = new Flash(req.body);
    await flash.save();
    res.status(201).json(flash);
  } catch (err) {
    res.status(500).json({ error: "Error creating flash" });
  }
};

// PUT /api/flashes/:id - Update flash by ID
export const updateFlash = async (req: Request, res: Response) => {
  try {
    const flash = await Flash.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!flash) {
      return res.status(404).json({ error: "Flash not found" });
    }
    res.status(200).json(flash);
  } catch (err) {
    res.status(500).json({ error: "Error updating flash" });
  }
};

// DELETE /api/flashes/:id - Delete flash by ID
export const deleteFlash = async (req: Request, res: Response) => {
  try {
    const flash = await Flash.findByIdAndDelete(req.params.id);
    if (!flash) {
      return res.status(404).json({ error: "Flash not found" });
    }
    res.status(200).json({ message: "Flash deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting flash" });
  }
};
