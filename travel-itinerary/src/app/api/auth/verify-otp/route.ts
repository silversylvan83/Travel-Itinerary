export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { connectDb } from '@/app/lib/mongo';
import { User } from '@/app/lib/models/User';
import { generateAccessAndRefreshTokens } from '@/app/lib/jwt-tokens';

type VerifyBody = { otp?: string; code?: string };

export async function POST(req: Request) {
  try {
    await connectDb();

    const body = (await req.json().catch(() => ({}))) as VerifyBody;

    // accept otp OR code; coerce to string, keep only digits
    const raw = body.otp ?? body.code ?? '';
    const otp = String(raw).replace(/\D/g, '').slice(0, 6);

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: 'A valid 6-digit OTP is required' }, { status: 400 });
    }

    const user = await User.findOne({
      emailVerificationRawOTP: otp,
      emailVerificationRawOTPExpires: { $gt: new Date() },
    }).sort({ updatedAt: -1 });

    if (!user) {
      return NextResponse.json({ error: 'OTP is invalid or has expired' }, { status: 489 });
    }

    user.isEmailVerified = true;
    user.emailVerificationRawOTP = undefined;
    user.emailVerificationRawOTPExpires = undefined;
    await user.save({ validateBeforeSave: false });

    // ✅ IMPORTANT: use a STRING id when signing
    const { accessToken, refreshToken } =
      await generateAccessAndRefreshTokens(user._id.toString());

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: 'Authentication tokens missing' }, { status: 401 });
    }

    // Trim user for client response
    const safeUser = {
      _id: user._id.toString(),
      email: user.email,
      userName: user.userName,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    };

    const res = NextResponse.json({ isEmailVerified: true, user: safeUser });

    // Set cookies on the RESPONSE
    const cookieOptions = {
      httpOnly: true as const,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    // Access: 15 minutes; Refresh: 7 days
    res.cookies.set('accessToken', accessToken, { ...cookieOptions, maxAge: 60 * 15 });
    res.cookies.set('refreshToken', refreshToken, { ...cookieOptions, maxAge: 60 * 60 * 24 * 7 });

    return res;
  } catch (err) {
    console.error('verify-otp error:', err);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
