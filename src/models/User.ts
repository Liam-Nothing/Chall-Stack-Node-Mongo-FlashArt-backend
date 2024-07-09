import { Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface Rating {
  rating: number;
  comment: string;
  ratedBy: Schema.Types.ObjectId;
}

export interface UserDocument extends Document {
  email: string;
  password: string;
  role: "utilisateur" | "tatoueur" | "admin" | "organisateur_event";
  name: string;
  lastname: string;
  pseudo: string;
  description?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    [key: string]: string | undefined;
  };
  rating: Rating[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const RatingSchema = new Schema<Rating>({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  ratedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["utilisateur", "tatoueur", "admin", "organisateur_event"],
    default: "utilisateur",
  },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  pseudo: { type: String, required: true },
  description: { type: String },
  socialLinks: { type: Map, of: String },
  rating: { type: [RatingSchema], default: [] },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default model<UserDocument>("User", UserSchema);
