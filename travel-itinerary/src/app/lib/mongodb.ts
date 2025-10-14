// src/lib/mongodb.ts
import { MongoClient, Db, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI missing in env');
}

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;

  try {
    client = new MongoClient(uri, {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    });
    await client.connect();
    // Pick DB from URI path or default
    const dbNameFromUri = (() => {
      try { return new URL(uri).pathname.replace('/', '') || 'app'; } catch { return 'app'; }
    })();
    db = client.db(dbNameFromUri);
    return db;
  } catch (err: any) {
    // Add context for SRV/DNS issues
    if (err?.code === 'ENOTFOUND' || /querySrv/i.test(String(err))) {
      console.error(
        'Mongo DNS/SRV lookup failed. Check:\n' +
        ' - MONGODB_URI uses the exact Atlas SRV string\n' +
        ' - API routes use Node.js runtime (export const runtime = "nodejs")\n' +
        ' - Atlas Network Access allows your IP\n' +
        ' - Corporate/VPN DNS isn’t blocking _mongodb._tcp lookups'
      );
    }
    throw err;
  }
}
