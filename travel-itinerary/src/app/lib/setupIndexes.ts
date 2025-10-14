import { getDb } from './mongodb';

let done = false;
export async function ensureIndexes() {
  if (done) return;
  const db = await getDb();
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('otp_codes').createIndex({ email: 1 });
  await db.collection('otp_codes').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL auto cleanup
  done = true;
}
