import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { UserDocument } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user: UserDocument) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export const register = async (req: Request, res: Response) => {
  const {
    email,
    password,
    role,
    name,
    lastname,
    pseudo,
    description,
    socialLinks,
  } = req.body;
  try {
    const user = new User({
      email,
      password,
      role,
      name,
      lastname,
      pseudo,
      description,
      socialLinks,
    });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Error registering new user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }, { password: 1 });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
};
