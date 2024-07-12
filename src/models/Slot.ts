import { Schema, Document, model, Types } from "mongoose";

export interface SlotDocument extends Document {
  id_tatoueur: Types.ObjectId;
  id_visitor?: Types.ObjectId;
  start_date_time: Date;
  end_date_time: Date;
  is_available: boolean;
}

const SlotSchema = new Schema<SlotDocument>({
  id_tatoueur: { type: Schema.Types.ObjectId, ref: "User", required: true },
  id_visitor: { type: Schema.Types.ObjectId, ref: "User" },
  start_date_time: { type: Date, required: true },
  end_date_time: {
    type: Date,
    required: true,
    default: () => new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
  },
  is_available: { type: Boolean, default: true },
});

export default model<SlotDocument>("Slot", SlotSchema);
