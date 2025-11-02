// app/db.server.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!;
const DB_NAME = process.env.MONGODB_DB || "shopify_app";

if (!MONGO_URI) {
  throw new Error("❌ MONGODB_URI not defined in environment variables.");
}

declare global {
  var mongooseGlobal: typeof mongoose | undefined;
}

if (!global.mongooseGlobal) {
  mongoose.connect(MONGO_URI, { dbName: DB_NAME })
    .then(() => console.log(`✅ MongoDB connected to "${DB_NAME}"`))
    .catch((err) => console.error("❌ MongoDB connection failed:", err));
  global.mongooseGlobal = mongoose;
}

const db = global.mongooseGlobal;
export default db;
