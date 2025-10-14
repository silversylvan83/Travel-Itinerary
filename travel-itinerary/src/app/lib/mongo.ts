// src/lib/mongo.ts
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI!;
let cached = (global as any)._mongoose as Promise<typeof mongoose> | undefined;

export async function connectDb() {
  if (!cached) {
    cached = mongoose.connect(uri, { dbName: process.env.MONGODB_DB || 'travel_itinerary' });
    (global as any)._mongoose = cached;
  }
  return cached;
}
