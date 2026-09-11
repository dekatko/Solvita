// Cloudflare Pages Function backing the contact form (src/components/ContactForm.astro).
// POST /api/kontakt
//
// Spam defenses (no CAPTCHA, no third-party embed):
// - honeypot: the "firma" field must arrive empty (bots that fill every field trip this)
// - timestamp trap: "loadedAt" is set client-side on page load; a submission
//   arriving less than MIN_FILL_TIME_MS later is rejected as too fast for a human
//
// Nothing is persisted here — on success the message is forwarded by email
// and the request body is discarded.
//
// TODO(daniel): pick an email provider and set RESEND_API_KEY (or swap the
// sendEmail() body below for whichever provider/SMTP relay you prefer) as a
// Cloudflare Pages environment variable. Until that's configured this
// function validates correctly but returns 500 on the send step — see
// docs/HANDOVER.md for the deploy step that sets this up.

interface Env {
  RESEND_API_KEY?: string;
}

const MIN_FILL_TIME_MS = 3000;
const DESTINATION_EMAIL = 'info@energy-solvita.de';
const FROM_EMAIL = 'kontaktformular@energy-solvita.de';

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function sendEmail(
  env: Env,
  fields: { name: string; email: string; phone: string; message: string; service: string },
) {
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const text = [
    fields.service
      ? `Neue Anfrage (${fields.service}) auf energy-solvita.de`
      : `Neue Anfrage über das Kontaktformular auf energy-solvita.de`,
    ``,
    `Name: ${fields.name}`,
    `E-Mail: ${fields.email || '(nicht angegeben)'}`,
    `Telefon: ${fields.phone || '(nicht angegeben)'}`,
    ``,
    `Nachricht:`,
    fields.message,
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `SolVita Kontaktformular <${FROM_EMAIL}>`,
      to: [DESTINATION_EMAIL],
      ...(fields.email ? { reply_to: fields.email } : {}),
      subject: fields.service
        ? `Neue Anfrage (${fields.service}) von ${fields.name}`
        : `Neue Anfrage von ${fields.name}`,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`email provider responded ${response.status}`);
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();

  const honeypot = String(form.get('firma') ?? '');
  const loadedAt = Number(form.get('loadedAt') ?? 0);
  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const phone = String(form.get('phone') ?? '').trim();
  const service = String(form.get('service') ?? '').trim();
  const message = String(form.get('message') ?? '').trim() ||
    (service ? `Kurzanfrage über das Formular „${service}“ — bitte zurückrufen.` : '');

  // Bots that fill every field, or submit faster than a human could:
  // pretend success so we don't teach them which defense tripped.
  const isBot = honeypot !== '' || !loadedAt || Date.now() - loadedAt < MIN_FILL_TIME_MS;
  if (isBot) {
    return jsonResponse({ ok: true }, 200);
  }

  // The full contact form requires email + message; the compact per-service
  // lead form (QuickLeadForm.astro) only collects name + phone, so a way to
  // reach the person (email or phone) is what's actually required.
  if (!name || (!email && !phone) || !message) {
    return jsonResponse({ ok: false, error: 'missing_fields' }, 400);
  }

  try {
    await sendEmail(env, { name, email, phone, message, service });
  } catch (error) {
    console.error('kontakt: send failed', error);
    return jsonResponse({ ok: false, error: 'send_failed' }, 500);
  }

  return jsonResponse({ ok: true }, 200);
};
