// Lancé par N0C. Charge les paramètres du serveur, puis démarre Next.js.
const path = require("path");

try {
  process.loadEnvFile(path.join(__dirname, ".env"));
} catch (err) {
  console.error("Fichier .env introuvable ou illisible :", err.message);
}

process.chdir(path.join(__dirname, "app"));
require("./app/server.js");