import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  name: String,
  code: { type: String, unique: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
