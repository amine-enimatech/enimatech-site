import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produit un serveur autonome dans .next/standalone : rien à installer sur PlanetHoster
  output: "standalone",
  // L'optimiseur d'images dépend d'un module natif propre à chaque système.
  // Compilé sur Windows, il ne fonctionnerait pas sur le serveur Linux.
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;