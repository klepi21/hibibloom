import nodemailer from "nodemailer"
import { content } from "@/content"

// The inbox reads Greek labels whichever language the visitor used.
const { contact, site } = content.el

/**
 * Contact form handler. Sends through the Hostinger mailbox itself, so no third
 * party ever sees a parent's message. Needs SMTP_PASS (the mailbox password) in
 * the Vercel environment; SMTP_HOST/PORT/USER default to the Hostinger values.
 */

export const runtime = "nodejs"

const MAX = { name: 120, email: 200, phone: 40, child: 60, area: 120, message: 4000 }

type Field = keyof typeof MAX

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }

  // Honeypot: real visitors never see this field, bots fill everything.
  if (typeof body.website === "string" && body.website.trim()) {
    return Response.json({ ok: true })
  }

  const f = {} as Record<Field, string>
  for (const key of Object.keys(MAX) as Field[]) {
    f[key] = String(body[key] ?? "").trim().slice(0, MAX[key])
  }

  if (!f.name || !f.message || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) {
    return Response.json({ ok: false }, { status: 422 })
  }

  const pass = process.env.SMTP_PASS
  if (!pass) {
    console.error("[contact] SMTP_PASS is not set; message not sent")
    return Response.json({ ok: false }, { status: 503 })
  }

  const user = process.env.SMTP_USER ?? contact.details.email
  const port = Number(process.env.SMTP_PORT ?? 465)
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.hostinger.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  const rows: [string, string][] = [
    [contact.form.name, f.name],
    [contact.form.email, f.email],
    [contact.form.phone, f.phone],
    [contact.form.child, f.child],
    [contact.form.area, f.area],
  ]

  const text = [...rows.map(([k, v]) => `${k}: ${v || "-"}`), "", f.message].join("\n")
  const html = `<table cellpadding="4">${rows
    .map(([k, v]) => `<tr><td><b>${escape(k)}</b></td><td>${escape(v || "-")}</td></tr>`)
    .join("")}</table><p style="white-space:pre-wrap">${escape(f.message)}</p>`

  try {
    await transport.sendMail({
      from: { name: `${site.name} site`, address: user },
      to: process.env.CONTACT_TO ?? contact.details.email,
      replyTo: { name: f.name, address: f.email },
      subject: `Νέο μήνυμα από ${f.name}${f.area ? ` (${f.area})` : ""}${body.lang === "en" ? " [EN]" : ""}`,
      text,
      html,
    })
  } catch (err) {
    console.error("[contact] send failed", err)
    return Response.json({ ok: false }, { status: 502 })
  }

  return Response.json({ ok: true })
}
