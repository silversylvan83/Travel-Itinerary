// src/lib/jwt-tokens.ts
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function sign(payload: object, exp: string) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secret);
}

export async function generateAccessAndRefreshTokens(userId: string) {
  const accessToken = await sign({ sub: userId, type: 'access' }, '15m');
  const refreshToken = await sign({ sub: userId, type: 'refresh' }, '7d');
  return { accessToken, refreshToken };
}
