// src/lib/mongodb.ts
import { MongoClient, Db, ServerApiVersion } from "mongodb";

const rawUri = process.env.MONGODB_URI;

// Explicit runtime + type check
if (!rawUri) {
  throw new Error("MONGODB_URI missing in environment variables");
}
const uri: string = rawUri; // <-- now it's definitely a string

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;

  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    // Pick DB from URI path or fallback
    const dbNameFromUri = (() => {
      try {
        const parsed = new URL(uri);
        const name = parsed.pathname.replace("/", "");
        return name || "app";
      } catch {
        return "app";
      }
    })();

    db = client.db(dbNameFromUri);
    return db;
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    const msg = String(error?.message ?? "");

    if (error?.code === "ENOTFOUND" || /querySrv/i.test(msg)) {
      console.error(
        [
          "Mongo DNS/SRV lookup failed. Check:",
          " - MONGODB_URI uses the correct Atlas SRV string",
          ' - API routes use Node.js runtime (export const runtime = "nodejs")',
          " - Atlas Network Access allows your IP",
          " - Corporate/VPN DNS isn’t blocking _mongodb._tcp lookups",
        ].join("\n")
      );
    }

    throw error;
  }
}
