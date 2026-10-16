# Prépare deploy.tar.gz pour PlanetHoster
$ErrorActionPreference = "Stop"

npm run build
if ($LASTEXITCODE -ne 0) { throw "La compilation a échoué." }

Remove-Item deploy, deploy.tar.gz -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory deploy | Out-Null

# Le serveur autonome va dans deploy\app (N0C réserve node_modules à la racine)
Copy-Item .next\standalone deploy\app -Recurse
Copy-Item .next\static deploy\app\.next\static -Recurse
if (Test-Path public) { Copy-Item public deploy\app\public -Recurse }
Remove-Item deploy\app\.env* -Force -ErrorAction SilentlyContinue

# Le app.js que N0C démarre : il lance simplement le serveur Next.js
@'
process.chdir(__dirname + "/app");
require("./app/server.js");
'@ | Set-Content deploy\app.js -Encoding utf8

tar -czf deploy.tar.gz -C deploy .
Write-Host "Prêt : deploy.tar.gz" -ForegroundColor Green