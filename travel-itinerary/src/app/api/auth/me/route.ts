import { verifyAuthJwt } from '@/app/lib/jwt';
import { getDb } from '@/app/lib/mongodb';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


const COOKIE_NAME = 'access_token';

export async function GET() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 200 });

  try {
    const payload = await verifyAuthJwt(token);
    const db = await getDb();
    const user = await db.collection('users')
      .findOne({ _id: new (await import('mongodb')).ObjectId(payload.sub) }, { projection: { email: 1, _id: 1, name: 1 }});
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
