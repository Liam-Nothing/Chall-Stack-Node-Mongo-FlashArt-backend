import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import passport from "passport";
import statusRoutes from "./routes/statusRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import "./config/passport"; // Import the passport configuration

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/flash-art-chall";

// Use Morgan middleware
app.use(morgan("combined"));

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Flash-Art-Chall API");
});

app.use("/api/status", statusRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // Add user routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
