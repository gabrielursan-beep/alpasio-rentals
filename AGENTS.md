# Proiect: alpasio-rentals

Acest fișier conține regulile proiectului. Este citit nativ de agenți precum
Codex si Cursor. Claude Code îl primește prin importul din `CLAUDE.md`.

## Regula numărul unu: un singur proiect

Lucrezi DOAR la proiectul `alpasio-rentals`, adică fișierele din acest director
(`/srv/projects/alpasio-rentals/`). Reguli:

1. Nu atinge fișiere din afara acestui director. Alte proiecte trăiesc în alte
   directoare `/srv/projects/<categorie>/<alt-nume>/` si nu au legătură cu acesta.
2. Dacă cererea pare să fie despre alt proiect, despre server în general, sau e
   ambiguă, OPREȘTE-TE si întreabă întâi la ce proiect lucrăm. Nu ghici.
3. Nu porni lucrări care ating producția (Coolify, DNS, baze de date) din
   contextul acestui proiect fără confirmare explicită.

## Cine e Gabriel

Administrator începător ("vibe coder"). Explică pe pași simpli, în română. Cere
confirmare înainte de acțiuni greu reversibile.

## Stil de scriere (important)

În textele pentru oameni NU folosi em-dash (—) sau en-dash (–). Folosește
virgulă, două puncte, paranteze sau propoziții separate. Cratima normală (-)
din cuvinte compuse si opțiuni de linie de comandă e permisă. Regula nu se
aplică în cod.

## Mediul comun

Uneltele, serverele MCP si harta secretelor sunt documentate în `/srv/documentation/SERVER.md`.
Nu duplica acele informații aici; trimite la ele.

## Note despre acest proiect

Scrie aici, pe măsură ce afli: ce este proiectul, cum se rulează local, unde se
deployează, variabile de mediu (doar NUMELE, nu valorile), particularități.
