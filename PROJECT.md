# PROJECT.md: alpasio-rentals

Manifestul acestui proiect. Il citeste orice agent AI inainte sa lucreze aici.

## Ce este

- **Scop**: Reconstrucție completă de la zero a site-ului Alpasio Rentals - apartamente în regim hotelier Galați, la standarde state of the art august 2026. Site de prezentare rapid, SEO local, bilingv ro/en, fără CMS, fără booking extern la lansare.
- **Client / brand**: Client extern - Alpasio Rentals (separat complet de Alpasio Agro, fără legătură vizuală presupusă)
- **Categorie**: websites
- **Status**: preview (pe https://alpasio-rentals-preview.ursan.org, cu noindex). Producție https://alpasio.ro la cutover controlat, numai cu acord explicit Gabriel + client.
- **Domenii**: preview https://alpasio-rentals-preview.ursan.org (Cloudflare A 159.195.108.59, proxied, LetsEncrypt wildcard *.ursan.org), producție https://alpasio.ro + https://www.alpasio.ro la cutover

## Limite

- **Directorul acestui proiect**: `/srv/projects/websites/alpasio-rentals/`
- **Ai voie**: doar în acest director și în resursele Coolify listate mai jos.
- **NU ai voie**: în alte proiecte din `/srv/projects/`, în `~/.secrets/`, în `~/.claude/`, în infrastructura serverului (firewall, SSH, backup, DNS) fără acordul explicit al lui Gabriel. Nu atinge alpasio.ro DNS până la cutover aprobat.
- **Proiecte fără legătură**: toate celelalte din `/srv/documentation/PROJECT_REGISTRY.yaml`, inclusiv alpasio-agro (proiect separat). Nu presupune legături.
- **Gard tehnic**: `/usr/local/bin/claude-project-fence.sh` blochează ieșirea din proiect, inclusiv prin MCP. Scrierile GitHub permise doar către repo-ul declarat.

## Infrastructura asociată

| Ce | Valoare |
|---|---|
| Proiect Coolify | `clienti-externi` - `vwnh0l1o64hpfrpghnv3yych` |
| Environment | `production` - `gzn57v5jqg54exrbc636a4tb` |
| Server | `localhost` (Netcup RS 2000 G12, KVM, Ubuntu 24.04) - `zv7f9d5pj1izacna3y7mzbyc` - `host.docker.internal` |
| Aplicație | `alpasio-rentals` - `tkouzp9qk8hxzzj3pyvo4gpk` - https://alpasio-rentals-preview.ursan.org |
| Destinatie | `alpasio-rentals` - `iqm1q46rg8otewtbpxygq8sk` - network `alpasio-rentals` |
| Baze de date | - (fără DB la lansare, conținut în MDX/TS) |
| Volume | - |
| Rețea Docker | `alpasio-rentals` (bridge, standalone) |
| Repo GitHub | `gabrielursan-beep/alpasio-rentals` - ramura `main` (GitHub App `coolify-gabrielursan` - `xyu4x5kpv1r1aurdu1pwuen7`) |
| Secrete | `.secrets/` local (necomis) + Coolify env vars (SMTP când va fi nevoie). Momentan fără secrete, placeholder `alpasio-rentals-placeholder` pentru Umami |

## Variabile de mediu

| Nume | Unde e setată | La ce folosește |
|---|---|---|
| `SMTP_HOST` | Coolify (când se activează mail) | trimitere formular contact |
| `SMTP_USER` | Coolify | auth SMTP |
| `SMTP_PASS` | Coolify | auth SMTP |
| `CONTACT_TO` | Coolify | destinatar formular (office.alpasio@gmail.com) |
| `CONTACT_FROM` | Coolify | expeditor |
| `UMAMI_WEBSITE_ID` | Coolify (viitor) | analytics pe analytics.gabrielursan.ro |

Valorile stau în Coolify și în `.secrets/` local, niciodată în repo.

## Comenzi

```bash
cd /srv/projects/websites/alpasio-rentals

# dezvoltare
pnpm install
pnpm run dev        # http://localhost:4321

# build exact ca în Coolify
pnpm run build      # iese în dist/client + dist/server (node standalone)
pnpm start          # node ./dist/server/entry.mjs (port 3000)

# verificări
pnpm run build && echo "build ok"
# teste: momentan fără teste automate (lipsă cunoscută, nu omisiune)
```

**Definiția lui "gata de push"**: `pnpm run build` trece fără erori, paginile principale (/ro/, /ro/apartamente/m19/, /ro/contact/) răspund 200 la `curl --resolve` via Cloudflare, formularul POST la /api/contact/ dă 303 spre /ro/multumim/, sitemap și robots corecte.

## Deploy

- **Cum**: auto la push pe `main` prin Coolify GitHub App (is_auto_deploy_enabled true, instant_deploy true). Fiecare push declanșează nixpacks plan cu Node 22 + pnpm 11.20.
- **Build în Coolify**: `install_command` = `npm i -g pnpm@11.20.0 && pnpm install`, `build_command` = `pnpm run build`, `start_command` = `pnpm start`, `build_pack` = `nixpacks`, `ports_exposes` = `3000`, healthcheck `GET /` port 3000.
- **Înainte de deploy**: build local reușit; variabile noi adăugate în Coolify ÎNAINTE de push.
- **După deploy, verifică**: `curl -I https://alpasio-rentals-preview.ursan.org/ro/` => 200, `curl https://alpasio-rentals-preview.ursan.org/sitemap-index.xml` => 200, container `running:healthy`, loguri fără erori.
- **Reguli comune**: `/srv/documentation/DEPLOYMENT_RULES.md`.

## Rollback

- **Codul**: în Coolify la Deployments alegi deployment-ul anterior (ex. `0255b20` sau `2ff184b`) și dai Redeploy, sau `git revert <commit>` și push. Durată ~2 min, downtime 0 (rolling update).
- **Baza de date**: nu există, nu e nevoie de rollback DB.
- **DNS/Traefik**: dacă preview pică, nu afectează alpasio.ro (încă separat). La cutover, rollback înseamnă mutarea FQDN înapoi pe origin vechi în <15 min.
- **Cât durează**: 2-3 min, utilizatorul vede maxim un refresh.

## Backup

- **Cod**: în git `gabrielursan-beep/alpasio-rentals` (backup implicit).
- **Date**: fără DB, fără volume. Imaginile rămân optimizate în repo (remote de la alpasio.ro, dar se vor self-host la producție). Nu se pierde nimic dacă serverul dispare acum, totul e în git.
- **Backup server**: restic zilnic 3:30 include `/home/gabriel` și dump coolify-db, dar nu e critic pentru acest proiect static.

## Reguli de lucru pentru acest proiect

- **Necesită aprobarea lui Gabriel**: orice atingere DNS (alpasio.ro cutover), ștergere conținut, schimbare domeniu, creare ștergere aplicație Coolify.
- **Nu se modifică niciodată fără aprobare**: structura bazei (nu există), textele legale finale (sunt draft), siglele cardurilor vacanță.
- **Particularități**:
  - `trailingSlash: 'always'` - toate URL-urile au slash final, canonical absolut.
  - `security.checkOrigin: false` - necesar pentru POST formular via Cloudflare (altfel 403 Cross-site).
  - `pnpm-workspace.yaml` șters intenționat (cauza `packages field missing` la build).
  - `allowScripts: {esbuild, sharp}` în package.json pentru imagini.
  - Preview are `noindex, nofollow` via meta + `X-Robots-Tag` + `robots.txt Disallow: /` și sitemap filtrat.
  - Build Nixpacks folosește `pnpm@11.20.0` via `npm i -g`, nu `pnpm-9_x` din nixpkgs 23.

## Jurnal

- 2026-08-25: audit complet alpasio.ro (9 pagini, 2 apartamente active, 92 media, SEO Yoast, reCAPTCHA, Google Fonts), deep research concurență Galați, keywords, plan 32 livrabile aprobat de Gabriel.
- 2026-08-25: repo nou `gabrielursan-beep/alpasio-rentals`, proiect local `/srv/projects/websites/alpasio-rentals`, Astro 7 + Tailwind 4 + Node adapter, bilingv ro/en, 2 apartamente M19/M2 cu galerie, contact cu honeypot+rate limit, blog 2+6, legale placeholder, Umami, push main `3987b2d`.
- 2026-08-25: creare destinație `alpasio-rentals` + aplicație Coolify `tkouzp9qk8hxzzj3pyvo4gpk` în `clienti-externi` pe `alpasio-rentals-preview.ursan.org`. Primul deploy eșuat pnpm workspace, fix `0255b20` + `instant_deploy` cu pnpm 11, build reușit 2.1s, container healthy 17:40:39.
- 2026-08-25: DNS Cloudflare `A alpasio-rentals-preview.ursan.org -> 159.195.108.59` proxied, certificat LetsEncrypt wildcard *.ursan.org emis 17:41:26, rate limit 5 eșecuri inițiale (NXDOMAIN înainte de DNS) până la 17:52, remediat după flush. Preview live 200 via Cloudflare la 18:41, verificat toate rutele /ro/, /en/, sitemap, robots, formular POST 303 spre /ro/multumim/ cu fix checkOrigin false `08e8fb6` + `2ff184b`.
- TODO: self-host fonts (acum Google Fonts), înlocuire sigle carduri cu SVG-uri oficiale, creare website în Umami cu ID real, test Lighthouse, monitorizare UptimeRobot la lansare.
