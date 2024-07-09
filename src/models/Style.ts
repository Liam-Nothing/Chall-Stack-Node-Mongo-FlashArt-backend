import { Schema, Document, model } from "mongoose";

export interface StyleDocument extends Document {
  label: string;
}

const StyleSchema = new Schema<StyleDocument>({
  label: { type: String, required: true, unique: true },
});

export default model<StyleDocument>("Style", StyleSchema);
