import { Schema, Document, model } from "mongoose";

export interface SlotDocument extends Document {
  id_tatoueur: Schema.Types.ObjectId;
  id_visitor: Schema.Types.ObjectId;
  start_date_time: Date;
  end_date_time: Date;
}

const SlotSchema = new Schema<SlotDocument>({
  id_tatoueur: { type: Schema.Types.ObjectId, ref: "User", required: true },
  id_visitor: { type: Schema.Types.ObjectId, ref: "User" },
  start_date_time: { type: Date, required: true },
  end_date_time: { type: Date, required: true },
});

export default model<SlotDocument>("Slot", SlotSchema);
