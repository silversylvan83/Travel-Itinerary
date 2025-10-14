export const runtime = 'nodejs';

import emailVerificationOtp from '@/app/lib/emailTemplates/otp';
import { User } from '@/app/lib/models/User';
import { connectDb } from '@/app/lib/mongo';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function genOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    await connectDb();

    const { email } = (await req.json()) as { email?: string };
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const otp = genOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    const normalized = String(email).trim().toLowerCase();

    let user = await User.findOne({ email: normalized });

    if (user) {
      user.emailVerificationRawOTP = otp;
      user.emailVerificationRawOTPExpires = otpExpiry;
    } else {
      const baseUserName = normalized.split('@')[0].slice(0, 5);
      const userName = baseUserName;

      user = new User({
        email: normalized,
        userName,
        emailVerificationRawOTP: otp,
        emailVerificationRawOTPExpires: otpExpiry,
        isEmailVerified: false,
      });
    }

    await user.save({ validateBeforeSave: false });

    // Configure SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_SERVER_PORT || 465),
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER ?? '',
        pass: process.env.EMAIL_SERVER_PASSWORD ?? '',
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
      to: normalized,
      subject: 'Your OTP for Email Verification',
      html: emailVerificationOtp(otp),
      text: `Your code is ${otp}. It expires in 5 minutes.`,
    });

    return NextResponse.json({
      message: 'OTP has been sent to your email address',
    });
  } catch (err: unknown) {
    // Type-safe narrowing
    const error = err as Error & { responseCode?: number };
    console.error('request-otp error:', error);

    const msg =
      error?.responseCode === 535
        ? 'Email credentials rejected by SMTP (check App Password/host/port).'
        : `Failed to send OTP: ${error.message ?? 'Unknown error'}`;

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
