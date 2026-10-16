import { NextResponse } from "next/server";
import { contactSchema, flattenErrors } from "@/lib/schemas";
import { clientInfo, looksLikeBot, rateLimited, verifyTurnstile } from "@/lib/security";
import { sendMail } from "@/lib/mailer";

const topics = { soutien: "Demande de soutien", soumission: "Demande de soumission", autre: "Autre question" };

export async function POST(req: Request) {
  const { ip, userAgent } = await clientInfo();
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Trop d'envois en peu de temps. Réessayez dans 10 minutes." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ fieldErrors: flattenErrors(parsed.error) }, { status: 400 });
  }
  const d = parsed.data;

  // Un robot reçoit une fausse réussite : il n'a aucune raison de réessayer.
  if (looksLikeBot(d)) return NextResponse.json({ ok: true });
  if (!(await verifyTurnstile(d.turnstileToken, ip))) {
    return NextResponse.json({ error: "La vérification anti-robot a échoué. Rechargez la page et réessayez." }, { status: 400 });
  }

  const text = [
    `Sujet : ${topics[d.topic]}`,
    `Nom : ${d.name}`,
    `Entreprise : ${d.company || "—"}`,
    `Courriel : ${d.email}`,
    `Téléphone : ${d.phone || "—"}`,
    "",
    d.message,
    "",
    "---",
    `Reçu le ${new Date().toISOString()} depuis ${ip}`,
    `Navigateur : ${userAgent}`,
  ].join("\n");

  try {
    await sendMail({
      to: process.env.MAIL_TO ?? "info@enimatech.com",
      replyTo: d.email,
      subject: `[Site web] ${topics[d.topic]} — ${d.name}`,
      text,
    });
  } catch (err) {
    console.error("Envoi contact échoué :", err);
    return NextResponse.json(
      { error: "Le message n'a pas pu être envoyé. Écrivez-nous directement à info@enimatech.com." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
