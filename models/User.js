import mongoose from "mongoose";


// Define User Schema
const UserSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: function () { return !this.isGuest; }, // ❌ not required if guest
    unique: true,
  },

  phone: {
    type: String,
    required: function () { return !this.isGuest; }, // ❌ not required if guest
  },

  passwordHash: {
    type: String,
    required: function () { return !this.isGuest; }, // ❌ not required if guest
  },

  state: String,
  district: String,
  className: String,
  isDeleted: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["student", "superadmin", "contentadmin"],
    default: "student",
  },
  competition: String,
  isGuest: { type: Boolean, default: false },
}, { timestamps: true });

// Check if model exists before defining (Prevents duplicate model errors)
export default mongoose.models.User || mongoose.model("User", UserSchema);
