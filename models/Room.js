import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  name: String,
  code: { type: String, unique: true },
  createdBy: { type: String, ref: "User" }, // UUID string
  members: [{ type: String, ref: "User" }], // UUID string
});

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
