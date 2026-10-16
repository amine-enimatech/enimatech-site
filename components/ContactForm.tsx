"use client";

import Link from "next/link";
import { useState } from "react";
import { Field, Honeypot } from "./Field";
import { Turnstile } from "./Turnstile";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { site } from "@/content/site";

export function ContactForm() {
  const { submit, sending, errors, formError, done } = useFormSubmit("/api/contact");
  const [token, setToken] = useState("");

  if (done) {
    return (
      <div className="confirmation" role="status">
        <h2>Message envoyé</h2>
        <p>Merci. Vous recevrez une réponse par courriel, habituellement en moins d'un jour ouvrable.</p>
      </div>
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    submit({
      name: f.get("name"),
      company: f.get("company"),
      email: f.get("email"),
      phone: f.get("phone"),
      topic: f.get("topic"),
      message: f.get("message"),
      privacy: f.get("privacy") === "on",
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
        <legend className="sr-only">Vos coordonnées</legend>
        <div className="deux-colonnes">
          <Field name="name" label="Nom" error={errors.name}>
            {(p) => <input {...p} type="text" autoComplete="name" required />}
          </Field>
          <Field name="company" label="Entreprise" optional error={errors.company}>
            {(p) => <input {...p} type="text" autoComplete="organization" />}
          </Field>
          <Field name="email" label="Courriel" error={errors.email}>
            {(p) => <input {...p} type="email" autoComplete="email" required />}
          </Field>
          <Field name="phone" label="Téléphone" optional error={errors.phone}>
            {(p) => <input {...p} type="tel" autoComplete="tel" />}
          </Field>
        </div>
        <Field name="topic" label="Votre demande concerne" error={errors.topic}>
          {(p) => (
            <select {...p} defaultValue="soumission">
              <option value="soumission">Une soumission ou un nouveau mandat</option>
              <option value="soutien">Un problème technique</option>
              <option value="autre">Autre chose</option>
            </select>
          )}
        </Field>
        <Field name="message" label="Message" error={errors.message}>
          {(p) => <textarea {...p} required placeholder="Décrivez votre situation : nombre de postes, outils utilisés, ce qui vous préoccupe." />}
        </Field>
        <p className="formulaire__aide">
          Déjà client avec un problème urgent ? Écrivez directement à{" "}
          <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a>.
        </p>
      </fieldset>

      <div>
        <label className="coche">
          <input type="checkbox" name="privacy" required aria-invalid={errors.privacy ? true : undefined} />
          <span>
            J'accepte qu'EnimaTech utilise ces renseignements pour répondre à ma demande, selon la{" "}
            <Link href="/confidentialite">politique de confidentialité</Link>.
          </span>
        </label>
        {errors.privacy && <span className="erreur">{errors.privacy}</span>}
      </div>

      <Honeypot />
      <Turnstile onToken={setToken} />

      <div>
        <button className="bouton" type="submit" disabled={sending}>
          {sending ? "Envoi en cours…" : "Envoyer le message"}
        </button>
      </div>
    </form>
  );
}
