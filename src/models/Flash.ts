import { Schema, Document, model } from "mongoose";

export interface FlashDocument extends Document {
  name: string;
  id_tatoueur: Schema.Types.ObjectId;
  id_style: Schema.Types.ObjectId[];
  duration: string;
  image: string;
  description: string;
}

const FlashSchema = new Schema<FlashDocument>({
  name: { type: String, required: true },
  id_tatoueur: { type: Schema.Types.ObjectId, ref: "User", required: true },
  id_style: [{ type: Schema.Types.ObjectId, ref: "Style", required: true }],
  duration: { type: String, default: "1/2J" },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

export default model<FlashDocument>("Flash", FlashSchema);
