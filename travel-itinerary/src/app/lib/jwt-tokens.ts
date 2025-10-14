// src/lib/jwt-tokens.ts
import { SignJWT, type JWTPayload } from 'jose';

const rawSecret = process.env.JWT_SECRET;
if (!rawSecret) throw new Error('JWT_SECRET missing in env');
const secret = new TextEncoder().encode(rawSecret);

const ISS = 'globetrail';        // optional: keep consistent across app
const AUD = 'web';               // optional: audience scoping

type AccessPayload = JWTPayload & { sub: string; type: 'access' };
type RefreshPayload = JWTPayload & { sub: string; type: 'refresh' };

async function sign<T extends JWTPayload>(payload: T, exp: string): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISS)
    .setAudience(AUD)
    .setExpirationTime(exp)
    .sign(secret);
}

export async function generateAccessAndRefreshTokens(userId: string) {
  const accessPayload: AccessPayload = { sub: userId, type: 'access' };
  const refreshPayload: RefreshPayload = { sub: userId, type: 'refresh' };

  const accessToken = await sign(accessPayload, '15m');
  const refreshToken = await sign(refreshPayload, '7d');

  return { accessToken, refreshToken };
}
