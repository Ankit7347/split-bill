import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: String,
  amount: Number,
  splitAmong: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  perHead: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
