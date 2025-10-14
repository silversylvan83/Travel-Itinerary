// src/lib/emailTemplates/otp.ts
export default function emailVerificationOtp(code: string) {
  return `
    <div style="font-family:system-ui,Segoe UI,Roboto,Arial">
      <h2>Your verification code</h2>
      <p>Use the following code to sign in:</p>
      <p style="font-size:28px;letter-spacing:3px;"><b>${code}</b></p>
      <p>This code expires in 5 minutes.</p>
    </div>
  `;
}
