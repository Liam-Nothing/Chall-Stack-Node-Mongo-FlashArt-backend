import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/flash-art-chall";

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Flash-Art-Chall API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
