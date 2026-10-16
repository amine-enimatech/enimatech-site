import type { Metadata } from "next";
import { AuthorizationForm } from "@/components/AuthorizationForm";

export const metadata: Metadata = {
  title: "Autorisation d'intervention",
  description: "Autorisez EnimaTech à intervenir sur vos postes, vos sites ou vos comptes.",
};

export default function AutorisationPage() {
  return (
    <div className="page conteneur">
      <div className="page__corps">
        <h1>Autorisation d'intervention</h1>
        <p className="page__intro">
          Avant d'accéder à vos postes, à vos locaux ou à vos comptes, EnimaTech a besoin de votre accord écrit. Ce
          formulaire prend deux minutes et vous en recevez une copie par courriel.
        </p>
        <AuthorizationForm />
      </div>
    </div>
  );
}
