// src/server/auth.ts
// import 'server-only';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function getUserIdFromCookies(): Promise<string | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get('accessToken')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });
    return typeof payload.sub === 'string' ? payload.sub : null;
  } catch {
    return null;
  }
}
