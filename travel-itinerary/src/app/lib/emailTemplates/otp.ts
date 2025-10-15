// src/lib/emailTemplates/otp.ts
export default function emailVerificationOtp(code: string) {
  return `
  <div style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    background: linear-gradient(135deg, #eef2ff, #fdf2f8);
    padding: 32px 24px;
    border-radius: 12px;
    max-width: 520px;
    margin: 0 auto;
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    color: #1e1b4b;
  ">
    <div style="text-align:center; margin-bottom:24px;">
      <h1 style="
        font-size:22px;
        font-weight:700;
        margin:0;
        color:#3730a3;
      ">🌍 GlobeTrail</h1>
      <p style="
        font-size:14px;
        color:#4b5563;
        margin:8px 0 0 0;
      ">AI Travel Itinerary Planner</p>
    </div>

    <div style="background:white; border-radius:10px; padding:24px; border:1px solid #e5e7eb;">
      <h2 style="
        font-size:18px;
        font-weight:600;
        margin:0 0 12px 0;
        color:#111827;
        text-align:center;
      ">Verify your email</h2>
      <p style="
        font-size:15px;
        line-height:1.6;
        color:#374151;
        text-align:center;
        margin:0 0 16px 0;
      ">
        Use the following one-time code to complete your sign-in to <b>GlobeTrail</b>:
      </p>
      <p style="
        font-size:32px;
        font-weight:700;
        letter-spacing:6px;
        text-align:center;
        color:#4f46e5;
        margin:20px 0;
      ">${code}</p>
      <p style="
        font-size:13px;
        color:#6b7280;
        text-align:center;
        margin:0;
      ">
        This code expires in <b>5 minutes</b>. Please do not share it with anyone.
      </p>
    </div>

    <p style="
      font-size:12px;
      text-align:center;
      color:#6b7280;
      margin-top:24px;
      line-height:1.5;
    ">
      You’re receiving this email because someone tried to sign in with your address.
      <br>If this wasn’t you, you can safely ignore it.
    </p>
  </div>
  `;
}
