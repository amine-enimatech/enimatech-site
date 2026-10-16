"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#approche", label: "Approche" },
  { href: "/autorisation", label: "Autorisation" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="entete">
      <div className="conteneur entete__rangee">
        {/* Pour utiliser votre logo : déposez-le dans public/logo.svg et remplacez
            le texte par <img src="/logo.svg" alt="EnimaTech" /> */}
        <Link href="/" className="marque">
          <picture>
            <source srcSet="/logo-blanc.png" media="(prefers-color-scheme: dark)" />
            <img src="/logo-noir.png" alt="EnimaTech, accueil" width={99} height={48} />
          </picture>
        </Link>
        <nav className="nav" aria-label="Navigation principale">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
