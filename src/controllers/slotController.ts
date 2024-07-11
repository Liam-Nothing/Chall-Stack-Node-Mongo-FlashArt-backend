import { Request, Response } from "express";
import Slot, { SlotDocument } from "../models/Slot";

// GET /api/slots - Get all slots or get slots by user ID
export const getAllSlots = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const slots = await Slot.find({ id_tatoueur: userId })
      .populate("id_tatoueur")
      .populate("id_visitor");
    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ error: "Error fetching slots" });
  }
};

// GET /api/slots/:id - Get slot by ID
export const getSlotById = async (req: Request, res: Response) => {
  try {
    const slot = await Slot.findById(req.params.id)
      .populate("id_tatoueur")
      .populate("id_visitor");
    if (!slot) {
      return res.status(404).json({ error: "Slot not found" });
    }
    res.status(200).json(slot);
  } catch (err) {
    res.status(500).json({ error: "Error fetching slot" });
  }
};

// POST /api/slots - Create a new slot
export const createSlot = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { start_date_time, end_date_time } = req.body;

    const slot = new Slot({
      id_tatoueur: userId,
      start_date_time,
      end_date_time,
      is_available: true,
    });

    await slot.save();
    res.status(201).json(slot);
  } catch (err) {
    res.status(500).json({ error: "Error creating slot" });
  }
};

// PUT /api/slots/:id - Update slot by ID
export const updateSlot = async (req: Request, res: Response) => {
  try {
    const slot = await Slot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!slot) {
      return res.status(404).json({ error: "Slot not found" });
    }
    res.status(200).json(slot);
  } catch (err) {
    res.status(500).json({ error: "Error updating slot" });
  }
};

// DELETE /api/slots/:id - Delete slot by ID
export const deleteSlot = async (req: Request, res: Response) => {
  try {
    const slot = await Slot.findByIdAndDelete(req.params.id);
    if (!slot) {
      return res.status(404).json({ error: "Slot not found" });
    }
    res.status(200).json({ message: "Slot deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting slot" });
  }
};
