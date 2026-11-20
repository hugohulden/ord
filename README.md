# Ordträning

Personlig PWA för att träna uttal och stavning av svåra engelska ord och namn.
Aktiv återkallning, facit direkt och FSRS-schemaläggning. Fungerar helt offline,
all data ligger i telefonen.

## Var finns vad

| Fil | Innehåll |
|---|---|
| `src/app.html` | Hela appen (samma sida som claude.ai-versionen). Ren logik i `<script id="core">`. |
| `public/sw.js` | Service worker: offline och uppdateringar |
| `public/manifest.webmanifest` + ikoner | Gör att den kan läggas på hemskärmen som en app |
| `tools/build.py` | Bygger `dist/` med riktigt `<head>` |
| `tools/test.mjs` | Tester av FSRS, stavning och streak (`node tools/test.mjs`) |

## Publicera (GitHub Pages)

1. På GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Varje push till `main` kör testerna, bygger och publicerar.
   Adressen blir `https://<användarnamn>.github.io/ord/`.

## Hemskärmen (iPhone)

Öppna adressen i **Safari** → dela-knappen → **Lägg till på hemskärmen**. Starta alltid från ikonen.

## Uppdateringar

Appen söker efter ny version när den öppnas, var 30:e minut och med
**Inställningar → Sök efter uppdatering**. Den byter aldrig version mitt i ett pass.

## Backup och flytt

**Inställningar → Backup och flytt.** Exportera som fil (iPhone: Spara i Filer) eller kopiera som text,
och läs in i den andra appen. Import ersätter all data.
