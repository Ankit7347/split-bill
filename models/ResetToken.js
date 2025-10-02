// models/ResetToken.ts
import mongoose  from "mongoose";

const resetTokenSchema = new mongoose.Schema({
  email: { type: String, required: true,unique: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 1800 }, // 30 min TTL
});

export default mongoose.models.ResetToken ||  mongoose.model("ResetToken", resetTokenSchema);
