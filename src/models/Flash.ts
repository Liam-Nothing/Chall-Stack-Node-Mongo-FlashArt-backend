import { Schema, Document, model } from "mongoose";

export interface FlashDocument extends Document {
  id_style: Schema.Types.ObjectId[];
  duration: string;
  image: string;
  description: string;
}

const FlashSchema = new Schema<FlashDocument>({
  id_style: [{ type: Schema.Types.ObjectId, ref: "Style", required: true }],
  duration: { type: String, default: "1/2J" },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

export default model<FlashDocument>("Flash", FlashSchema);
