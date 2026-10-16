"use client";

import { useRef, useState } from "react";

type Result = { ok?: boolean; reference?: string; error?: string; fieldErrors?: Record<string, string> };

export function useFormSubmit(endpoint: string) {
  const startedAt = useRef(Date.now());
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [done, setDone] = useState<Result | null>(null);

  async function submit(payload: Record<string, unknown>) {
    setSending(true);
    setErrors({});
    setFormError("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, startedAt: startedAt.current }),
      });
      const data: Result = await res.json().catch(() => ({
        error: "Réponse inattendue du serveur. Réessayez ou écrivez-nous par courriel.",
      }));
      if (res.ok && data.ok) {
        setDone(data);
        window.scrollTo({ top: 0 });
      } else {
        setErrors(data.fieldErrors ?? {});
        setFormError(data.error ?? (data.fieldErrors ? "Certains champs sont à corriger." : "L'envoi a échoué."));
      }
    } catch {
      setFormError("Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.");
    } finally {
      setSending(false);
    }
  }

  return { submit, sending, errors, formError, done };
}
