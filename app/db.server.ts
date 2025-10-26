import mongoose from "mongoose";

let isConnected = false; // global connection flag

export async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    // already connected
    return mongoose.connection;
  }
  
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  try {
    const db = await mongoose.connect(mongoUri, {
      dbName: process.env.MONGODB_DB || "shopify_app",
    });

    isConnected = true;
    console.log("MongoDB connected:", db.connection.name);
    return db.connection;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}
