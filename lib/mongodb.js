// lib/mongodb.js
import mongoose from "mongoose";
import User from "@/models/User";
import Room from "@/models/Room";
import Expense from "@/models/Expense";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;

  // Explicitly register models
  mongoose.models.User = mongoose.models.User || User;
  mongoose.models.Room = mongoose.models.Room || Room;
  mongoose.models.Expense = mongoose.models.Expense || Expense;

  return cached.conn;
}

export default dbConnect;
