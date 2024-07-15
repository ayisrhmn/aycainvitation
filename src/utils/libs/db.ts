/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const NEXT_PUBLIC_DB_URL = process.env.NEXT_PUBLIC_DB_URL;

if (!NEXT_PUBLIC_DB_URL) {
  throw new Error(
    'Please define the NEXT_PUBLIC_DB_URL environment variable inside .env.local'
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    };

    cached.promise = mongoose
      .connect(NEXT_PUBLIC_DB_URL || '', opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
