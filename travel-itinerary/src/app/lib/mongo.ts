// src/lib/mongo.ts
import mongoose from 'mongoose';

// Narrow env first
const rawUri = process.env.MONGODB_URI;
if (!rawUri) throw new Error('MONGODB_URI missing in env');
const uri: string = rawUri;

// Augment the Node global object to cache the connection (no `any`)
declare global {
  var _mongoose: Promise<typeof mongoose> | undefined;
}

export async function connectDb() {
  if (!global._mongoose) {
    global._mongoose = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB ?? 'travel_itinerary',
    });
  }
  return global._mongoose;
}
