import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Nous joindre" };

export default function ContactPage() {
  return (
    <div className="page conteneur">
      <div className="page__corps">
        <h1>Nous joindre</h1>
        <p className="page__intro">
          Parlez-nous de votre entreprise et de ce qui vous occupe. Vous pouvez aussi écrire à{" "}
          <a href={`mailto:${site.emails.info}`}>{site.emails.info}</a>.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
