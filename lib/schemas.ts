import { z } from "zod";
import { accessTypes } from "./accessTypes";

const common = {
  website: z.string().optional(), // champ piège
  startedAt: z.number().optional(),
  turnstileToken: z.string().optional(),
};

export const contactSchema = z.object({
  name: z.string("Indiquez votre nom.").trim().min(2, "Indiquez votre nom.").max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.email("Adresse courriel invalide.").max(200),
  phone: z.string().trim().max(40).optional().default(""),
  topic: z.enum(["soutien", "soumission", "autre"], "Choisissez le sujet de votre demande."),
  message: z.string("Écrivez votre message.").trim().min(10, "Votre message est trop court.").max(5000),
  privacy: z.literal(true, "Vous devez accepter la politique de confidentialité."),
  ...common,
});

export { accessTypes };

export const authorizationSchema = z.object({
  name: z.string("Indiquez votre nom.").trim().min(2, "Indiquez votre nom.").max(120),
  role: z.string().trim().max(120).optional().default(""),
  company: z.string("Indiquez le nom de l'entreprise.").trim().min(2, "Indiquez le nom de l'entreprise.").max(160),
  email: z.email("Adresse courriel invalide.").max(200),
  phone: z.string().trim().max(40).optional().default(""),
  access: z
    .array(z.enum(Object.keys(accessTypes) as [keyof typeof accessTypes, ...(keyof typeof accessTypes)[]]))
    .min(1, "Choisissez au moins un type d'intervention."),
  scope: z.string("Décrivez les postes, sites ou comptes visés.").trim().min(5, "Décrivez les postes, sites ou comptes visés.").max(3000),
  startDate: z.string("Indiquez une date de début.").regex(/^\d{4}-\d{2}-\d{2}$/, "Date de début invalide."),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .or(z.literal(""))
    .default(""),
  authorized: z.literal(true, "Confirmez que vous êtes autorisé(e) à donner cet accès."),
  confidentiality: z.literal(true, "Confirmez avoir pris connaissance de l'accès aux données."),
  backup: z.literal(true, "Confirmez la recommandation de sauvegarde."),
  revocation: z.literal(true, "Confirmez avoir compris comment révoquer l'autorisation."),
  signature: z.string("Tapez votre nom complet comme signature.").trim().min(2, "Tapez votre nom complet comme signature.").max(120),
  ...common,
});

export type FieldErrors = Record<string, string>;

export function flattenErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
