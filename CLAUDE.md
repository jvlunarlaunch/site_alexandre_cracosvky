# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static lead-magnet site for Alexandre Cracovsky (M&A professor / CFA). No build step, no bundler, no package manager. **All HTML files are edited directly** — `index.html`, `diagnostico/*.html`, and `capturas/*.html` are the source of truth.

> `generator.py` and `setup.sh` still exist but are no longer the workflow. Do not run them or use them as a reference for current site state.

## Opening the site

```bash
xdg-open index.html   # Linux
open index.html       # macOS
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which FTP-deploys the entire repo to `valuationma.com.br` (Hostinger). **There is no staging — every push to `main` goes live.** Secrets (`FTP_HOST`, `FTP_USER`, `FTP_PASS`) are stored in GitHub Actions secrets. The `.git*`, `.github/`, and `.gitignore` paths are excluded from the upload.

The workflow uses diff-based sync via `.ftp-deploy-sync-state.json` stored at the server root. **Files added, modified, or deleted in the repo are reflected on the server on the next push.** Never upload files directly to the server via FTP or hPanel — they won't be tracked and will cause drift.

## Architecture

### `index.html` — homepage

Hero + split-screen choice ("Sou Empreendedor" / "Sou Estudante" linking to `/empreendedor` and `/estudante`) + bio, book teaser, newsletter and channels sections. The quiz cards themselves live on the segment pages, not here.

### `empreendedor.html` / `estudante.html` — segment landing pages

Dedicated pages for each audience, each with its own set of quiz cards:

- `empreendedor.html`: diagnósticos 1, 2, 4, 5, 13 (M&A and valuation diagnostics for business owners)
- `estudante.html`: diagnósticos 6, 7, 9 + PDF bundle download (CFA, valuation theory, career)

Nav cross-links them. Internal links use clean extensionless URLs (`/diagnostico/N`, `/capturas/slug`) — `.htaccess` strips `.html` and 301-redirects the legacy `/iscas/isca-N` URLs to `/diagnostico/N`.

Inline `<style>` in `<head>` contains the split-screen CSS. Inline `<script>` just above `</head>` handles the mobile touch animation.

### `diagnostico/N.html` — quiz pages

Each quiz page embeds its config as a `const QUIZ_CONFIG = {...}` JSON object and initialises the engine with `QuizEngine.init(el, QUIZ_CONFIG)`. To change quiz content, edit the JSON directly in the file. Exception: `diagnostico/9.html` does not use the engine — it has its own self-contained inline script.

### `pre-lista-livro.html` — book waitlist page

Standalone root-level page for a book pre-order waitlist. Does **not** use `assets/design-system.css`; it has its own self-contained inline `<style>` with the same CSS variables and Google Fonts `<link>` tags baked in. Edit it independently from the rest of the site.

### `capturas/*.html` — lead-capture pages

One page per PDF/material. Edit directly. Most are numbered (`4-N-slug.html`) matching the cover image in `assets/covers/`. The exception is `capturas/corporate-lideranca-carreira.html`, a bundle page for the full "Corporate, Liderança e Carreira" collection (19 PDFs).

### `assets/design-system.css` — all styles

CSS variables at the top of `:root` define the entire palette:
- `--navy` (#0A1628), `--royal` (#1B3A7A), `--gold` (#B8952A), `--gold2` (#D4AE50), `--ice` (#EEF2F9)
- `--cg` (Cormorant Garamond serif), `--ep` (Epilogue sans), `--mo` (DM Mono)

All visual changes should touch CSS variables, not scattered inline styles.

### `assets/quiz-engine.js` — quiz runtime

`QuizEngine` IIFE. Manages four screens: **welcome → question → capture (lead gen form) → result** (with Highcharts charts). Do not modify unless changing quiz engine behaviour.

**Edit `assets/quiz-engine.js` directly** — é o único arquivo fonte; sem etapa de build ou ofuscação.

### `highcharts.js` / `highcharts-more.js` — vendored Highcharts

Required for polar/radar charts. Do not modify.

## Reference files

- `iscas_digitais.md` — full specification of every quiz: formulas, scoring bands, question dimensions, and which Highcharts chart types each quiz uses. Consult this before editing `QUIZ_CONFIG` in any diagnóstico. (The filename keeps the old "iscas" naming; the pages themselves live in `diagnostico/`.)

## Key Conventions

- **Quiz IDs are not sequential.** Current set: 1, 2, 4–9, 13 (no 3). Filename `diagnostico/N.html` matches the quiz `id` in its JSON. (`8.html` exists but is not currently linked from any page.)
- To add a new quiz: create `diagnostico/N.html` by copying an existing one and replacing the JSON config. Then add a card to `empreendedor.html` or `estudante.html` depending on the audience.
- `design_system_v31_navy_gold.html` — standalone visual reference for the design system; not part of the live site.
- `isca_modelo_de_diagnóstico/` — a separate subproject with its own `CLAUDE.md` and `generator.py`. Independent from this site.
