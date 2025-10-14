// src/lib/models/User.ts
import mongoose, { Schema, InferSchemaType } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    userName: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationRawOTP: { type: String },           // same fields you used
    emailVerificationRawOTPExpires: { type: Date },      // ^
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof UserSchema>;

export const User =
  mongoose.models.User || mongoose.model<UserDoc>('User', UserSchema);
