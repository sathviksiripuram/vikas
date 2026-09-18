import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = Record<string, string | undefined>;

const esc = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept so bots do not retry.
  if (body.company) return NextResponse.json({ ok: true });

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Please fill in your name, email and phone number." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Destination", body.country || "Not specified"],
    ["Service", body.service || "General enquiry"],
    ["Qualification", body.qualification || "Not specified"],
    ["Message", body.message || "—"],
  ];

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Without email credentials the form still succeeds; the lead is logged
  // in the Vercel runtime logs so nothing is lost during initial setup.
  if (!apiKey || !to || !from) {
    console.warn(
      "[contact] Email not configured — logging enquiry instead:",
      Object.fromEntries(rows),
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((a) => a.trim()),
      replyTo: email,
      subject: `New website enquiry — ${name}${
        body.country ? ` (${body.country})` : ""
      }`,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:640px">
          <h2 style="color:#0b1f3a;margin:0 0 4px">New enquiry from vikasoverseas.com</h2>
          <p style="color:#5d6b7f;margin:0 0 20px;font-size:14px">
            Received ${new Date().toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })} IST
          </p>
          <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
            ${rows
              .map(
                ([k, v]) => `
              <tr>
                <td style="padding:10px 14px;background:#f2f6fb;border:1px solid #e3ecf7;font-weight:600;color:#12325c;width:150px;vertical-align:top">${k}</td>
                <td style="padding:10px 14px;border:1px solid #e3ecf7;color:#1d4176;white-space:pre-wrap">${esc(v)}</td>
              </tr>`,
              )
              .join("")}
          </table>
        </div>
      `,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      {
        error:
          "We could not send your enquiry right now. Please call or WhatsApp us on +91 98493 03673.",
      },
      { status: 500 },
    );
  }
}
