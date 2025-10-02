import mongoose from "mongoose";


// Define User Schema
const UserSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  state: { type: String },
  district: { type: String },
  className: { type: String }, // For school/college students
  passwordHash: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
  updated: { type: Date, default: Date.now },
  role: { type: String, enum: ["student", "superadmin","contentadmin"], default: "student" },
  competition: { type: String }, // If user is preparing for a competitive exam
  isGuest: { type: Boolean, default: false },
});

// Check if model exists before defining (Prevents duplicate model errors)
export default mongoose.models.User || mongoose.model("User", UserSchema);
