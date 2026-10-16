import { NextResponse } from "next/server";
import { accessTypes, authorizationSchema, flattenErrors } from "@/lib/schemas";
import { clientInfo, looksLikeBot, rateLimited, verifyTurnstile } from "@/lib/security";
import { sendMail } from "@/lib/mailer";
import { site } from "@/content/site";

function reference() {
  const d = new Date();
  const date = d.toISOString().slice(0, 10).replaceAll("-", "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AUT-${date}-${rand}`;
}

const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/\s+/g, " ").trim();

export async function POST(req: Request) {
  const { ip, userAgent } = await clientInfo();
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Trop d'envois en peu de temps. Réessayez dans 10 minutes." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = authorizationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ fieldErrors: flattenErrors(parsed.error) }, { status: 400 });
  }
  const d = parsed.data;

  if (norm(d.signature) !== norm(d.name)) {
    return NextResponse.json(
      { fieldErrors: { signature: "La signature doit correspondre exactement au nom indiqué plus haut." } },
      { status: 400 },
    );
  }
  if (d.endDate && d.endDate < d.startDate) {
    return NextResponse.json({ fieldErrors: { endDate: "La date de fin précède la date de début." } }, { status: 400 });
  }

  if (looksLikeBot(d)) return NextResponse.json({ ok: true, reference: reference() });
  if (!(await verifyTurnstile(d.turnstileToken, ip))) {
    return NextResponse.json({ error: "La vérification anti-robot a échoué. Rechargez la page et réessayez." }, { status: 400 });
  }

  const ref = reference();
  const signedAt = new Date();

  const record = [
    `AUTORISATION D'INTERVENTION — ${ref}`,
    "",
    `Client : ${d.name}${d.role ? `, ${d.role}` : ""}`,
    `Entreprise : ${d.company}`,
    `Courriel : ${d.email}`,
    `Téléphone : ${d.phone || "—"}`,
    "",
    "Interventions autorisées :",
    ...d.access.map((a) => `  - ${accessTypes[a]}`),
    "",
    "Postes, sites ou comptes visés :",
    d.scope,
    "",
    `Période : à partir du ${d.startDate}${d.endDate ? ` jusqu'au ${d.endDate}` : ", jusqu'à révocation écrite"}`,
    "",
    "Déclarations acceptées :",
    "  - Je suis autorisé(e) à accorder cet accès pour les équipements et comptes visés.",
    "  - Je comprends qu'EnimaTech pourrait voir des données présentes sur ces équipements, qu'elles seront traitées de façon confidentielle et uniquement aux fins de l'intervention.",
    "  - Je reconnais qu'une sauvegarde à jour est recommandée avant toute intervention.",
    `  - Je peux révoquer cette autorisation en tout temps en écrivant à ${site.emails.info}.`,
    "",
    `Signature électronique (nom tapé) : ${d.signature}`,
    `Signé le : ${signedAt.toISOString()}`,
    `Adresse IP : ${ip}`,
    `Navigateur : ${userAgent}`,
  ].join("\n");

  try {
    await sendMail({
      to: process.env.MAIL_TO ?? site.emails.info,
      replyTo: d.email,
      subject: `[Autorisation] ${ref} — ${d.company}`,
      text: record,
    });
    await sendMail({
      to: d.email,
      replyTo: site.emails.info,
      subject: `Votre autorisation d'intervention ${ref}`,
      text: [
        `Bonjour ${d.name},`,
        "",
        "Voici la copie de l'autorisation que vous venez de signer. Conservez ce courriel.",
        `Pour la révoquer ou la modifier, répondez simplement à ce message ou écrivez à ${site.emails.info}.`,
        "",
        record,
        "",
        "EnimaTech",
      ].join("\n"),
    });
  } catch (err) {
    console.error("Envoi autorisation échoué :", err);
    return NextResponse.json(
      { error: `L'autorisation n'a pas pu être enregistrée. Écrivez-nous à ${site.emails.info}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, reference: ref });
}
