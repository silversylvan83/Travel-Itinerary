import mongoose from 'mongoose';

const rawUri = process.env.MONGODB_URI;
if (!rawUri) throw new Error('MONGODB_URI missing in env');
const uri: string = rawUri;

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: Promise<typeof mongoose> | undefined;
}

export async function connectDb() {
  if (!global._mongoose) {
    global._mongoose = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB ?? 'travel_itinerary',
      serverSelectionTimeoutMS: 15000,  // fail fast with a clear message
      socketTimeoutMS: 45000,
      retryWrites: true,
      // directConnection: false, // usually leave false with SRV
    })
    .catch((err) => {
      // Surface Atlas-specific hints
      const msg = String(err?.message ?? err);
      console.error('[Mongo connect error]', msg);
      console.error(
        'Checklist:\n' +
        ' - Atlas IP Access List: add your current IP or 0.0.0.0/0 temporarily\n' +
        ' - Connection string exactly as shown by Atlas\n' +
        ' - If password has special chars, URL-encode it\n' +
        ' - If behind corporate DNS/VPN, try non-SRV seed list or different network'
      );
      throw err;
    });
  }
  return global._mongoose;
}
