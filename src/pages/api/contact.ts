import type { APIRoute } from 'astro';

export const prerender = false;

// Simple in-memory rate limit (per instance)
const hits = new Map<string, { count: number; ts: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > 3600_000) {
    hits.set(ip, { count: 1, ts: now });
    return true;
  }
  entry.count++;
  if (entry.count > 5) return false;
  return true;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
  if (!rateLimit(ip)) {
    return new Response('Too many requests', { status: 429 });
  }

  const form = await request.formData();
  // honeypot
  if (form.get('website')) {
    return new Response(null, { status: 303, headers: { Location: '/ro/multumim/' } });
  }

  const firstName = String(form.get('firstName') || '').trim();
  const lastName = String(form.get('lastName') || '').trim();
  const email = String(form.get('email') || '').trim();
  const phone = String(form.get('phone') || '').trim();
  const message = String(form.get('message') || '').trim();
  const consent = form.get('consent');

  if (!firstName || !lastName || !email || !phone || !consent) {
    return new Response('Missing required fields', { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return new Response('Invalid email', { status: 400 });
  }

  const payload = {
    firstName, lastName, email, phone,
    apartment: String(form.get('apartment') || ''),
    guests: String(form.get('guests') || ''),
    checkin: String(form.get('checkin') || ''),
    checkout: String(form.get('checkout') || ''),
    payment: String(form.get('payment') || ''),
    message,
    ip,
    ua: request.headers.get('user-agent') || '',
    date: new Date().toISOString(),
  };

  // TODO: send via SMTP/Brevo - for preview just log
  console.log('[contact]', JSON.stringify(payload));

  // In production, here you would send email via SMTP
  // Example: await sendMail({...})

  return new Response(null, { status: 303, headers: { Location: '/ro/multumim/' } });
};
