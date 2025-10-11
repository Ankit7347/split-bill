import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  addedBy: { type: String, ref: "User" },
  description: String,
  amount: Number,
  splitAmong: [{ type: String, ref: "User" }],
  perHead: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
