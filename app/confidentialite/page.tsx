import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Politique de confidentialité" };

// À faire relire : ce texte est un point de départ conforme à l'esprit de la Loi 25, pas un avis juridique.
export default function ConfidentialitePage() {
  return (
    <div className="page conteneur">
      <div className="page__corps prose">
        <h1>Politique de confidentialité</h1>
        <p className="page__intro">Dernière mise à jour : octobre 2026</p>

        <h2>Renseignements recueillis</h2>
        <p>
          Par le formulaire de contact : nom, entreprise, courriel, téléphone et contenu du message. Par le formulaire
          d'autorisation : ces mêmes coordonnées, la fonction, la description des équipements visés, la signature
          tapée, ainsi que la date, l'heure, l'adresse IP et le navigateur utilisés au moment de la signature.
        </p>

        <h2>Utilisation</h2>
        <p>
          Ces renseignements servent uniquement à répondre à votre demande, à préparer une soumission, à réaliser les
          interventions autorisées et à conserver la preuve de votre autorisation. Ils ne sont jamais vendus ni
          utilisés à des fins publicitaires.
        </p>

        <h2>Conservation et accès</h2>
        <p>
          Les envois sont transmis par courriel à {site.name} et conservés le temps de la relation d'affaires, puis
          pendant la durée exigée par les obligations légales et fiscales. Seul {site.name} y a accès. Le site ne
          dépose aucun témoin (cookie) de suivi.
        </p>

        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l'accès à vos renseignements, leur correction ou leur suppression, et retirer votre
          consentement en tout temps.
        </p>

        <h2>Responsable de la protection des renseignements personnels</h2>
        <p>
          {site.privacyOfficer}. Pour toute question ou demande :{" "}
          <a href={`mailto:${site.emails.info}`}>{site.emails.info}</a>.
        </p>
      </div>
    </div>
  );
}
