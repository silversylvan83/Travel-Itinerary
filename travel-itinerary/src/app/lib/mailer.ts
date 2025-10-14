import nodemailer, { Transporter } from 'nodemailer';

let cached: Transporter | null = null;

export function getMailer(): Transporter {
  if (cached) return cached;

  const host = (process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com').trim();
  const port = Number(process.env.EMAIL_SERVER_PORT || 465);
  const secure = port === 465; // implicit TLS on 465

  const user = process.env.EMAIL_SERVER_USER?.trim();
  const pass = process.env.EMAIL_SERVER_PASSWORD?.trim();
  if (!user || !pass) throw new Error('EMAIL_SERVER_USER/PASSWORD missing');

  cached = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure, // STARTTLS if on 587
    auth: { user, pass },
    tls: {
      minVersion: 'TLSv1.2',
      servername: host, // SNI
      // rejectUnauthorized: true, // leave true in prod; set false only to test behind weird proxies
    },
    logger: true,
    debug: true,
  });

  return cached;
}

export async function sendOtpEmail(to: string, code: string) {
  const mailer = getMailer();
  const from = process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER!;
  const info = await mailer.sendMail({
    from,
    to,
    subject: `Your login code: ${code}`,
    text: `Your code is ${code}. It expires in 10 minutes.`,
    html: `<p>Your code is <b>${code}</b>. It expires in 10 minutes.</p>`,
  });
  return { messageId: info.messageId };
}
