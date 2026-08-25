# PROJECT.md: alpasio-rentals

Manifestul acestui proiect. Il citeste orice agent AI inainte sa lucreze aici.
Completeaza-l la prima sesiune si tine-l la zi. Fara secrete: doar NUMELE
variabilelor, niciodata valorile.

Acesta e SINGURUL jurnal al proiectului. Nu tine note in paralel in alt fisier:
doua jurnale inseamna doua adevaruri partiale.

## Ce este

- **Scop**: (o fraza: ce face proiectul si pentru cine)
- **Client / brand**: (abeauty | sensai | gabriel | client extern: nume)
- **Categorie**: (websites | applications | internal-tools | experiments | archived)
- **Status**: (in dezvoltare | preview | live | arhivat)
- **Domenii**: (adresele reale si cele de preview)

## Limite (foarte important)

- **Directorul acestui proiect**: `/srv/projects/<categorie>/alpasio-rentals/`
- **Ai voie**: doar in acest director si in resursele Coolify listate mai jos.
- **NU ai voie**: in alte proiecte din `/srv/projects/`, in `~/.secrets/`, in
  `~/.claude/`, in infrastructura serverului (firewall, SSH, backup, DNS)
  fara acordul explicit al lui Gabriel.
- **Proiecte fara nicio legatura cu acesta**: toate celelalte din
  `/srv/documentation/PROJECT_REGISTRY.yaml`. Nu presupune legaturi doar fiindca
  apartin aceleiasi persoane sau firme.
- Gardul tehnic (`/usr/local/bin/claude-project-fence.sh`) blocheaza automat
  iesirea din proiect, inclusiv prin uneltele MCP: scrierile in GitHub sunt
  permise doar catre repo-ul declarat mai jos. Daca te blocheaza, nu il ocoli:
  explica-i lui Gabriel ce voiai sa faci si cere-i acordul.

## Infrastructura asociata

| Ce | Valoare |
|---|---|
| Proiect Coolify | (nume + uuid) |
| Aplicatii | (uuid-uri) |
| Baze de date | (uuid + tip) |
| Volume | (nume) |
| Retea Docker | (numele retelei proprii; fara ea proiectul sta langa celelalte) |
| Repo GitHub | (owner/repo, ramura de productie) |
| Secrete | `.secrets/` din acest director (doar numele fisierelor) |

## Variabile de mediu

Doar NUMELE, niciodata valorile. Valorile stau in Coolify si in `.secrets/`.

| Nume | Unde e setata | La ce foloseste |
|---|---|---|
| | | |

Daca proiectul are `.env.example`, tine-l sincronizat cu tabelul de mai sus.

## Comenzi

```bash
# dezvoltare (pornire locala)
# build (exact comanda pe care o ruleaza si Coolify)
# teste
# verificari de cod (lint, typecheck)
```

**Definitia lui "gata de push"**: build-ul trece, testele trec, verificarile de
cod trec. Daca proiectul nu are inca teste, scrie asta explicit aici, ca sa
stim ca e o lipsa cunoscuta, nu o omisiune.

## Deploy

- **Cum**: (auto la push pe main prin Coolify | manual din Coolify | altfel)
- **Inainte de deploy**: build local reusit; migratii pregatite daca schema se
  schimba; variabile noi adaugate in Coolify INAINTE de push (altfel aplicatia
  porneste fara ele).
- **Dupa deploy, verifica**: containerul e pornit, pagina principala raspunde
  200, o pagina care atinge baza raspunde corect, logurile nu au erori noi.
- Reguli comune tuturor proiectelor: `/srv/documentation/DEPLOYMENT_RULES.md`.

## Rollback

- **Codul**: in Coolify, la Deployments, alegi deployment-ul anterior si dai
  Redeploy. Alternativ: `git revert <commit>` si push.
- **Baza de date**: (daca proiectul are migratii, scrie aici cum se da inapoi
  ultima migratie, si daca e reversibila. O migratie care sterge o coloana NU
  se poate da inapoi fara restaurare din backup.)
- **Cat dureaza si ce se vede**: (estimare onesta)

## Backup

- Datele intra in backupul zilnic al serverului (3:30), prin dump logic al
  bazei si copierea volumelor. Restaurare: `/srv/documentation/BACKUP_AND_RESTORE.md`.
- **Ce e specific aici**: (ex. fisiere incarcate de utilizatori si unde stau,
  date care NU sunt in baza, lucruri care nu s-ar putea reface din cod)
- **Ce s-ar pierde daca serverul dispare acum**: (raspunde sincer; daca
  raspunsul e "nimic, totul e in git si in baza", scrie asta)

## Reguli de lucru pentru acest proiect

- **Necesita aprobarea lui Gabriel**: (ex. orice atingere a bazei de productie,
  schimbari de domeniu, stergeri de continut, migratii ireversibile)
- **Nu se modifica niciodata**: (ex. structura bazei fara migratie, textele
  legale, elemente impuse de un finantator)
- **Particularitati de stiut**: (capcane descoperite, versiuni fixate,
  workaround-uri si de ce exista)

## Jurnal

- (data): ce s-a facut, ce a mers, ce nu, ce a ramas de verificat
