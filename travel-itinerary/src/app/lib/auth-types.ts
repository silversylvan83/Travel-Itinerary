export type User = {
  _id?: string;
  email: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OtpCode = {
  _id?: string;
  email: string;
  codeHash: string;       // bcrypt hash of the 6-digit code
  attempts: number;       // rate-limit brute forcing
  expiresAt: Date;        // TTL
  createdAt: Date;
};
