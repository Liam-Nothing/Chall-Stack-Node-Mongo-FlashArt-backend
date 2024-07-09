import { Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  role: "utilisateur" | "tatoueur" | "admin" | "organisateur_event";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ["utilisateur", "tatoueur", "admin", "organisateur_event"],
    default: "utilisateur",
  },
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
