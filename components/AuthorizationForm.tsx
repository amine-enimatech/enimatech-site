"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Field, Honeypot } from "./Field";
import { Turnstile } from "./Turnstile";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { accessTypes } from "@/lib/accessTypes";
import { site } from "@/content/site";

const declarations = [
  {
    name: "authorized",
    text: "Je suis autorisé(e) à accorder cet accès pour les équipements, sites et comptes décrits ci-dessus, au nom de l'entreprise.",
  },
  {
    name: "confidentiality",
    text: "Je comprends qu'EnimaTech pourrait voir des données présentes sur ces équipements ou comptes. Elles seront traitées de façon confidentielle, uniquement aux fins de l'intervention, et ne seront ni copiées ni conservées sans mon accord.",
  },
  {
    name: "backup",
    text: "Je reconnais qu'une sauvegarde à jour de mes données est recommandée avant toute intervention.",
  },
  {
    name: "revocation",
    text: `Je peux révoquer ou limiter cette autorisation en tout temps en écrivant à ${site.emails.info}.`,
  },
] as const;

export function AuthorizationForm() {
  const { submit, sending, errors, formError, done } = useFormSubmit("/api/autorisation");
  const [token, setToken] = useState("");
  const startRef = useRef<HTMLInputElement>(null);
  // Date du jour fixée dans le navigateur (la page est pré-générée à la compilation).
  useEffect(() => {
    if (startRef.current && !startRef.current.value) startRef.current.value = new Date().toLocaleDateString("en-CA");
  }, []);

  if (done) {
    return (
      <div className="confirmation" role="status">
        <h2>Autorisation enregistrée</h2>
        <p>
          Numéro de référence : <span className="reference">{done.reference}</span>
        </p>
        <p>Une copie vient de vous être envoyée par courriel. Conservez-la avec vos documents.</p>
      </div>
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    submit({
      name: f.get("name"),
      role: f.get("role"),
      company: f.get("company"),
      email: f.get("email"),
      phone: f.get("phone"),
      access: f.getAll("access"),
      scope: f.get("scope"),
      startDate: f.get("startDate"),
      endDate: f.get("endDate"),
      ...Object.fromEntries(declarations.map((d) => [d.name, f.get(d.name) === "on"])),
      signature: f.get("signature"),
      website: f.get("website"),
      turnstileToken: token,
    });
  }

  return (
    <form className="formulaire" onSubmit={onSubmit} noValidate>
      {formError && (
        <p className="alerte" role="alert">
          {formError}
        </p>
      )}

      <fieldset>
        <legend>Qui autorise</legend>
        <div className="deux-colonnes">
          <Field name="name" label="Nom complet" error={errors.name}>
            {(p) => <input {...p} type="text" autoComplete="name" required />}
          </Field>
          <Field name="role" label="Fonction" optional error={errors.role}>
            {(p) => <input {...p} type="text" autoComplete="organization-title" placeholder="Ex. : propriétaire, directrice" />}
          </Field>
          <Field name="company" label="Entreprise" error={errors.company}>
            {(p) => <input {...p} type="text" autoComplete="organization" required />}
          </Field>
          <Field name="email" label="Courriel" error={errors.email}>
            {(p) => <input {...p} type="email" autoComplete="email" required />}
          </Field>
          <Field name="phone" label="Téléphone" optional error={errors.phone}>
            {(p) => <input {...p} type="tel" autoComplete="tel" />}
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>Ce qui est autorisé</legend>
        <div className="coches" role="group" aria-label="Types d'intervention">
          {Object.entries(accessTypes).map(([value, label]) => (
            <label key={value} className="coche">
              <input type="checkbox" name="access" value={value} />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {errors.access && <span className="erreur">{errors.access}</span>}

        <Field name="scope" label="Postes, sites ou comptes visés" error={errors.scope}>
          {(p) => (
            <textarea
              {...p}
              required
              placeholder="Ex. : le portable de la réception et le poste de la comptabilité; le compte administrateur Microsoft 365; le bureau du 123, rue Exemple."
            />
          )}
        </Field>

        <div className="deux-colonnes">
          <Field name="startDate" label="À partir du" error={errors.startDate}>
            {(p) => <input {...p} ref={startRef} type="date" required />}
          </Field>
          <Field name="endDate" label="Jusqu'au" optional error={errors.endDate}>
            {(p) => <input {...p} type="date" />}
          </Field>
        </div>
        <p className="formulaire__aide">Sans date de fin, l'autorisation reste valide jusqu'à ce que vous la révoquiez par écrit.</p>
      </fieldset>

      <fieldset>
        <legend>Déclarations</legend>
        <div className="coches">
          {declarations.map((d) => (
            <div key={d.name}>
              <label className="coche">
                <input type="checkbox" name={d.name} required aria-invalid={errors[d.name] ? true : undefined} />
                <span>{d.text}</span>
              </label>
              {errors[d.name] && <span className="erreur">{errors[d.name]}</span>}
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Signature</legend>
        <Field name="signature" label="Tapez votre nom complet pour signer" error={errors.signature}>
          {(p) => <input {...p} type="text" required autoComplete="off" />}
        </Field>
        <p className="formulaire__aide">
          En signant, vous confirmez les renseignements ci-dessus. La date, l'heure et l'adresse IP de l'envoi sont
          consignées avec l'autorisation, et une copie vous est envoyée par courriel. Voir la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </fieldset>

      <Honeypot />
      <Turnstile onToken={setToken} />

      <div>
        <button className="bouton" type="submit" disabled={sending}>
          {sending ? "Enregistrement…" : "Signer l'autorisation"}
        </button>
      </div>
    </form>
  );
}
