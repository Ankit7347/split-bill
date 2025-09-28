// lib/mongodb.js
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

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

  // Auto-load all schemas from models folder
  const modelsPath = path.resolve("./models");
  fs.readdirSync(modelsPath).forEach((file) => {
    if (file.endsWith(".js")) {
      const model = require(path.join(modelsPath, file));
      // Ensure the model is registered with mongoose
      if (model.default && model.default.modelName) {
        mongoose.models[model.default.modelName] = model.default;
      }
    }
  });

  return cached.conn;
}

export default dbConnect;
