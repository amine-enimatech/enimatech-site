import { headers } from "next/headers";

// Limite simple en mémoire : 5 envois par IP par 10 minutes.
// Suffisant pour un site vitrine sur une seule instance.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

export async function clientInfo() {
  const h = await headers();
  const ip =
    h.get("cf-connecting-ip") ??
    h.get("x-forwarded-for")?.split(",")[0].trim() ??
    h.get("x-real-ip") ??
    "inconnue";
  return { ip, userAgent: h.get("user-agent") ?? "inconnu" };
}

export function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

// Champ piège invisible + délai minimal de remplissage (les robots sont rapides).
export function looksLikeBot(form: { website?: string; startedAt?: number }) {
  if (form.website && form.website.trim() !== "") return true;
  if (form.startedAt && Date.now() - form.startedAt < 3000) return true;
  return false;
}

export async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile désactivé
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}
