import nodemailer from 'nodemailer';
export const runtime = 'nodejs';

const error = (message, status) => Response.json({ error: message }, { status });

function isAllowedOrigin(request) {
  const value = request.headers.get('origin');
  if (!value) return true;
  try {
    const origin = new URL(value);
    if (!['http:', 'https:'].includes(origin.protocol) || origin.origin !== value) return false;
    const target = new URL(request.url);
    // Next.js can reconstruct request.url with an internal hostname behind a proxy.
    // Host retains the address the browser actually requested, including its port.
    if (origin.origin === target.origin || origin.host === request.headers.get('host')) return true;
    if (process.env.SITE_URL && origin.origin === new URL(process.env.SITE_URL).origin) return true;
    const loopback = host => ['localhost', '127.0.0.1', '[::1]'].includes(host);
    return process.env.NODE_ENV === 'development' && loopback(origin.hostname) && loopback(target.hostname) && origin.port === target.port && origin.protocol === target.protocol;
  } catch { return false; }
}

export async function POST(request) {
  if (!isAllowedOrigin(request)) {
    return error('Please submit your enquiry from our website.', 403);
  }
  if (!request.headers.get('content-type')?.includes('application/json')) return error('Invalid submission.', 415);
  let data;
  try {
    const reader = request.body.getReader();
    const chunks = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16000) { await reader.cancel(); return error('Your enquiry is too long.', 413); }
      chunks.push(Buffer.from(value));
    }
    data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch { return error('Invalid submission.', 400); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return error('Invalid submission.', 400);
  if (data.website) return error('Unable to submit this enquiry.', 400);
  const limits = { name: 120, email: 254, destination: 30, guests: 3, date: 10, package: 250, message: 5000 };
  for (const [field, max] of Object.entries(limits)) {
    if (typeof data[field] !== 'string' || data[field].length > max) return error('Please check your enquiry fields.', 400);
    data[field] = data[field].trim();
  }
  if (!data.name || /[\r\n]/.test(data.name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || !['Sri Lanka', 'Kenya'].includes(data.destination) || !/^\d+$/.test(data.guests) || Number(data.guests) < 1 || Number(data.guests) > 100) {
    return error('Please enter a valid name, email, destination and traveller count.', 400);
  }
  if (data.date && (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !Number.isFinite(Date.parse(data.date)) || new Date(data.date).toISOString().slice(0, 10) !== data.date)) return error('Please check your travel date.', 400);
  if (!process.env.GMAIL_SMTP_USER || !process.env.GMAIL_APP_PASSWORD) {
    return error('Online enquiries are temporarily unavailable. Please contact travels@emeraldisle.lk or use WhatsApp. Your details have not been sent.', 503);
  }
  const text = [`Name: ${data.name}`, `Email: ${data.email}`, `Destination: ${data.destination}`, `Travellers: ${data.guests}`, `Preferred date: ${data.date || 'Flexible'}`, `Journey: ${data.package || 'Tailor-made'}`, '', data.message].join('\n');
  try {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com', port: 465, secure: true,
      auth: { user: process.env.GMAIL_SMTP_USER, pass: process.env.GMAIL_APP_PASSWORD.replace(/\s/g, '') },
      connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
    });
    const result = await transport.sendMail({
      from: { name: 'Emerald Isle Travels website', address: process.env.GMAIL_SMTP_USER },
      to: 'travels@emeraldisle.lk', replyTo: data.email,
      subject: `Journey enquiry · ${data.destination}`, text,
      disableFileAccess: true, disableUrlAccess: true,
    });
    if (!result.accepted?.includes('travels@emeraldisle.lk')) return error('We could not send your enquiry. Please try again or contact us by WhatsApp.', 502);
    return Response.json({ ok: true });
  } catch { return error('We could not confirm your enquiry was sent. Please contact us before submitting again.', 502); }
}
