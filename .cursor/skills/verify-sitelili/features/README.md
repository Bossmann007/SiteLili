# SiteLili verification map

This directory is the maintained source for verifying user-facing behavior of **SiteLili** (Clínica Dra. Ligiana Maffini static site). Read this index, then the matching feature file.

## Baseline preconditions

- Launch a **local** instance with `.cursor/skills/verify-sitelili/helpers/launch.sh` (Astro `preview` of `dist/` on `127.0.0.1` + a free port).
- Export `SITELILI_VERIFY_STATE` / `SITELILI_BASE_URL` from launch stdout.
- Run `.cursor/skills/verify-sitelili/helpers/doctor.sh` and require HTTP 200, `lang="pt-BR"`, `Dra. Ligiana Maffini`, `CRM/PR 17731`, WhatsApp `https://wa.me/5541995104424`, and **no** `<form`.
- Never drive `https://www.draligianamaffini.com.br` as the harness.
- Never drive an instance this run did not start.
- Playwright lives in `helpers/` only. Site `package.json` has no Playwright/Cypress.

## Driving conventions

- Start every recipe from doctor-green local `SITELILI_BASE_URL`.
- Prefer the `data-*` attributes, ARIA names, and routes in this map over CSS position.
- Treat quoted strings and hrefs as literals from `src/data/site.ts` / pages.
- HTTP: `curl -sS` against `SITELILI_BASE_URL`.
- Browser: Playwright (`helpers/drive.mjs` for home) or Cursor browser tools; viewport ≥768px for desktop nav, &lt;768px for the WhatsApp float.
- Do not follow `wa.me`, Instagram, maps, or mailto destinations. Assert attributes only.
- Cleanup kills the launched PIDs. Do not delete `evidence/`.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screenshot.
- UI proof includes extracted heading/href text and a screenshot that shows the clinic identity (name + CRM).
- HTTP proof includes status code and a saved body (or headers file).
- There is no mutation API. The stored-value check is: reload the same URL and see the same HTML.
- Record the feature file name with every artifact.
- If a path is unreachable, report the attempted URL and the unmet doctor/precondition — do not mark it verified via a different page.

## Feature entry contract

Each feature file starts with an H1 and one paragraph of user-visible behavior, then exactly four H2 sections in this order:

1. `Sub-features`
2. `How to get to it (user POV)`
3. `Driving it with verify-sitelili`
4. `Gotchas`

## Features

- [Home / hero](./home.md) — first screen, identity, primary WhatsApp CTA, specialty and pilares teasers.
- [Especialidades](./especialidades.md) — index plus GEO specialty pages (`[slug].astro`).
- [Contato / WhatsApp](./contato.md) — NAP, WhatsApp/email only, FAQ accordion, map iframe (do not drive Google).
- [Privacidade](./privacidade.md) — LGPD page and the “no patient forms” guarantee.
- [Pilares MEV](./pilares.md) — six lifestyle-medicine pillars accordion and segment toggle.

`/sobre` and `/abordagem` are real header routes; they are not seeded here. Drive them only when a change touches those pages.
