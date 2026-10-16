import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="pied">
      <div className="conteneur pied__rangee">
        <p>
          © {new Date().getFullYear()} {site.name}, {site.city}
        </p>
        <nav aria-label="Liens secondaires">
          
          <Link href="/autorisation">Autorisation d'intervention</Link>
          <Link href="/confidentialite">Confidentialité</Link>
        </nav>
      </div>
    </footer>
  );
}
