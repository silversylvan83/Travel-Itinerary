// src/app/api/me/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getUserIdFromCookies } from '@/server/auth';
import { connectDb } from "@/app/lib/mongo";
import { User } from "@/app/lib/models/User";

type PublicUser = {
  _id: string;
  email: string;
  userName?: string;
  isEmailVerified: boolean;
  createdAt?: Date | string;
};

export async function GET() {
  try {
    const userId = await getUserIdFromCookies();
    if (!userId) return NextResponse.json({ ok: false }, { status: 401 });

    await connectDb();
    const user = await User.findById(userId)
      .select("_id email userName isEmailVerified createdAt")
      .lean<PublicUser>()
      .exec();

    if (!user) return NextResponse.json({ ok: false }, { status: 401 });
    return NextResponse.json({ ok: true, user });
  } catch (err) {
    console.error("/api/me error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
