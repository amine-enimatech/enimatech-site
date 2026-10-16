import type { Metadata } from "next";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site, hero } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://enimatech.com"),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: hero.lead,
  openGraph: { type: "website", locale: "fr_CA", siteName: site.name },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA">
      <body>
        <a className="saut" href="#contenu">Aller au contenu</a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
