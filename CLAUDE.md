# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static lead-magnet site for Alexandre Cracovsky (M&A professor / CFA). No build step, no bundler, no package manager. **All HTML files are edited directly** — `index.html`, `iscas/isca-*.html`, and `capturas/*.html` are the source of truth.

> `generator.py` and `setup.sh` still exist but are no longer the workflow. Do not run them or use them as a reference for current site state.

## Opening the site

```bash
xdg-open index.html   # Linux
open index.html       # macOS
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which FTP-deploys the entire repo to `valuationma.com.br` (Hostinger). **There is no staging — every push to `main` goes live.** Secrets (`FTP_HOST`, `FTP_USER`, `FTP_PASS`) are stored in GitHub Actions secrets. The `.git*`, `.github/`, and `.gitignore` paths are excluded from the upload.

The workflow uses `dangerous-clean-slate: true` — **on every deploy the entire `public_html` is wiped and re-uploaded from the repo.** This keeps the server as an exact mirror of `main`: files added, modified, or deleted in the repo are reflected on the server. Never upload files directly to the server via FTP or hPanel; they will be deleted on the next push.

## Architecture

### `index.html` — homepage

Split-screen choice page: "Sou Empreendedor" (anchor `#empreendedor`) / "Sou Estudante" (anchor `#estudante`). Each leads to its own section of quiz cards below.

- Empreendedor section: iscas 1, 2, 3, 4, 5, 13 (M&A and valuation diagnostics for business owners)
- Estudante section: iscas 6, 7, 8 + PDF download (CFA, valuation theory, career)

### `empreendedor.html` / `estudante.html` — segment landing pages

Dedicated pages for each audience. Each renders the same quiz cards as their respective section of `index.html` but on a standalone URL. Nav cross-links them. Edit card content here (or `index.html`) depending on where they appear.

Inline `<style>` in `<head>` contains the split-screen CSS. Inline `<script>` just above `</head>` handles the mobile touch animation.

### `iscas/isca-N.html` — quiz pages

Each quiz page embeds its config as a `const QUIZ_CONFIG = {...}` JSON object and initialises the engine with `QuizEngine.init(el, QUIZ_CONFIG)`. To change quiz content, edit the JSON directly in the file.

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

### `highcharts.js` / `highcharts-more.js` — vendored Highcharts

Required for polar/radar charts. Do not modify.

## Reference files

- `iscas_digitais.md` — full specification of every quiz: formulas, scoring bands, question dimensions, and which Highcharts chart types each quiz uses. Consult this before editing `QUIZ_CONFIG` in any isca.

## Key Conventions

- **Quiz IDs are not sequential.** Current set: 1–8 and 13. Filename `isca-N.html` matches the quiz `id` in its JSON.
- To add a new quiz: create `iscas/isca-N.html` by copying an existing one and replacing the JSON config. Then add a card to the correct segment section in `index.html`.
- `design_system_v31_navy_gold.html` — standalone visual reference for the design system; not part of the live site.
- `isca_modelo_de_diagnóstico/` — a separate subproject with its own `CLAUDE.md` and `generator.py`. Independent from this site.
