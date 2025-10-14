import bcrypt from 'bcryptjs';

export function generateOtp(): string {
  // 6-digit, leading zeros allowed
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function hashOtp(code: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(code, salt);
}

export async function compareOtp(code: string, hash: string) {
  return bcrypt.compare(code, hash);
}
