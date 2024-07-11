import { Request, Response } from "express";
import Flash, { FlashDocument } from "../models/Flash";
import { ParsedQs } from "qs";

// GET /api/flashes - Get all flashes
export const getAllFlashes = async (req: Request, res: Response) => {
  try {
    const flashes = await Flash.find()
      .populate("id_style")
      .populate("id_tatoueur");
    res.status(200).json(flashes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching flashes" });
  }
};

// GET /api/flashes/:id - Get flash by ID
export const getFlashById = async (req: Request, res: Response) => {
  try {
    const flash = await Flash.findById(req.params.id)
      .populate("id_style")
      .populate("id_tatoueur");
    if (!flash) {
      return res.status(404).json({ error: "Flash not found" });
    }
    res.status(200).json(flash);
  } catch (err) {
    res.status(500).json({ error: "Error fetching flash" });
  }
};

// GET /api/flashes/my - Get flashes by user ID
export const getMyFlashes = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const flashes = await Flash.find({ id_tatoueur: userId })
      .populate("id_style")
      .populate("id_tatoueur");
    res.status(200).json(flashes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching flashes" });
  }
};

// POST /api/flashes - Create a new flash
export const createFlash = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id; // Assume req.user is populated by the authentication middleware
    const { name, id_style, duration, image, description } = req.body;

    const flash = new Flash({
      name,
      id_tatoueur: userId,
      id_style,
      duration,
      image,
      description,
    });

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

// GET /api/flashes/search - Search flashes
export const searchFlashes = async (req: Request, res: Response) => {
  const { tatoueurId, styleIds } = req.query as {
    tatoueurId?: string;
    styleIds?: string | string[] | ParsedQs | ParsedQs[];
  };

  try {
    const query: any = {};

    if (tatoueurId) {
      query["id_tatoueur"] = tatoueurId;
    }

    if (styleIds && typeof styleIds === "string") {
      query["id_style"] = { $in: styleIds.split(",") };
    }

    const flashes = await Flash.find(query)
      .populate("id_style")
      .populate("id_tatoueur");
    res.status(200).json(flashes);
  } catch (err) {
    res.status(500).json({ error: "Error searching flashes" });
  }
};
