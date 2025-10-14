import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const ISS = 'travel-itinerary';
const AUD = 'web';

export type JwtPayload = { sub: string; email: string };

export async function signAuthJwt(payload: JwtPayload, days = 7) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setIssuer(ISS)
    .setAudience(AUD)
    .setExpirationTime(`${days}d`)
    .sign(secret);
}

export async function verifyAuthJwt(token: string) {
  const { payload } = await jwtVerify(token, secret, { issuer: ISS, audience: AUD });
  return payload as unknown as JwtPayload & { iat: number; exp: number };
}
