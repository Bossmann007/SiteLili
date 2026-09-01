---
name: verify-sitelili
description: Use when verifying SiteLili (sitelili) — the static Astro marketing site for Clínica Dra. Ligiana Maffini — after changing pages, copy, nav, WhatsApp/email links, privacy text, especialidades routes, or the production build. Reach for this when you need to prove the local static web surface, not Cloudflare production.
---

# Verify SiteLili

Project-local control skill for **SiteLili** (`package.json` name `sitelili`): a **100% static** Astro 7 + Tailwind 4 + GSAP site. There is no backend, no patient forms, and no production npm on the host. Agents read this cold and drive a **local** preview (or dev) instance.

Canonical production URL `https://www.draligianamaffini.com.br` is **identity in HTML only**. Never use it as the primary harness. Never invent Google reviews, prices, or clinic hours. Never add health forms.

Keep the map honest as routes change: `/maintain-verification-skill`.

## Launch

Prefer **production-like preview** on an unused port so a human `npm run dev` on 4321 can keep running.

Repo root is the directory whose `package.json` `"name"` is `"sitelili"`. Node **>= 22.12.0** (`engines`). Scripts: `npm run dev` → `astro dev`; `npm run build`; `npm run preview`. README local URL is `http://localhost:4321` — do **not** assume that port is free.

```bash
# from repo root
.cursor/skills/verify-sitelili/helpers/launch.sh
# optional faster loop (not the static dist/):
.cursor/skills/verify-sitelili/helpers/launch.sh --dev
```

`launch.sh` will `npm install` if `node_modules` is missing, `npm run build` (preview mode), pick a free `127.0.0.1` port unless `SITELILI_PORT` is set, start `npx astro preview --host 127.0.0.1 --port <port>` in its own session (`setsid`), and wait until `GET /` returns 200.

Ready: stdout contains `SITELILI_BASE_URL=http://127.0.0.1:<port>` and `verify-sitelili: preview ready`. Export the printed `SITELILI_VERIFY_STATE` for later commands.

Teardown: `.cursor/skills/verify-sitelili/helpers/cleanup.sh` (see Cleanup). After a failed launch, run cleanup too so ports are not stranded.

Do not run `astro dev --background` for this skill — that shares a global background server. Do not kill listeners by name (`pkill astro`, `killall node`).

## Doctor

Run first whenever anything looks off.

```bash
.cursor/skills/verify-sitelili/helpers/doctor.sh
# or
.cursor/skills/verify-sitelili/helpers/doctor.sh "$SITELILI_VERIFY_STATE"
```

Pass only when **all** of these hold:

- `SITELILI_VERIFY_STATE` JSON exists; `baseUrl` is `http://127.0.0.1:*` or `http://localhost:*` (refuse `draligianamaffini.com.br`).
- `launchPid` and `serverPid` are alive; the PID listening on `port` is one of those two.
- `GET {baseUrl}/` → **200**.
- Home HTML contains `lang="pt-BR"`, `Dra. Ligiana Maffini`, `CRM/PR 17731`, `https://wa.me/5541995104424`, `id="conteudo"`, `[data-hero-title]`, `[data-site-header]`.
- Home HTML has **no** `<form`.
- Writes `{evidenceDir}/doctor.json` when the evidence directory exists.

If doctor fails, do not drive. Fix launch or the site, then doctor again.

## Drive

Harness: **curl** for HTTP/HTML assertions + **Playwright** (skill-local, `helpers/package.json`) against **system Chrome**. Playwright is verification scaffolding — it is **not** a production dependency and must not be added to the site `package.json`.

Install once:

```bash
cd .cursor/skills/verify-sitelili/helpers
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install
```

Chrome in this environment: `/usr/local/bin/google-chrome` or `/usr/bin/google-chrome-stable`. Launch with `--no-sandbox` on this VM. Cursor browser tools are an allowed substitute if they capture the same artifacts under `evidence/`.

**Do not** navigate to WhatsApp, Instagram, LinkedIn, Doctoralia, or Google Maps as the proof. Assert `href` / iframe `title` / `mailto:` only.

Stable handles (from this checkout):

| Handle | Where |
| --- | --- |
| `header[data-site-header]` | Every page |
| `nav[aria-label="Principal"]` | Desktop header (`md+`). Items: Início `/`, Sobre `/sobre`, Especialidades `/especialidades`, Abordagem `/abordagem`, Contato `/contato` |
| `a[data-header-cta]` | Desktop “Agendar consulta” → `https://wa.me/5541995104424` |
| `a[data-header-logo]` | Logo home |
| `[data-theme-toggle]` | `aria-label="Alternar modo claro e escuro"` |
| `details` + summary “Abrir menu” | Mobile nav (`md:hidden`) |
| `a[aria-label="Agendar consulta pelo WhatsApp"]` | Green float, **`md:hidden` only** |
| `main#conteudo` | Skip-link target |
| `h1[data-hero-title]`, `[data-hero-eyebrow]`, `[data-hero-cta]` | Home + inner heroes |
| `footer a[href="/privacidade"]` | “Privacidade (LGPD)” |
| FAQ | `[data-faq-accordion] [data-faq-trigger]` / `[data-faq-panel]` |
| MEV segment | `[data-mev-segment]` links `/pilares` and `/medicina-do-estilo-de-vida` |

Home one-shot (mapped feature `home`):

```bash
node .cursor/skills/verify-sitelili/helpers/drive.mjs --feature home
```

Other mapped features: follow `features/*.md`. Example especialidades:

```bash
curl -sS -D - -o /tmp/esp.html "$SITELILI_BASE_URL/especialidades"
# expect 200, h1 with Especialidades + CRM/PR 17731, links /medicina-de-familia … /longevidade, /pilares
```

Viewport **≥ 768px** for desktop nav; **< 768px** for the WhatsApp float and hamburger.

## Evidence

Directory: **`.cursor/skills/verify-sitelili/evidence/<runId>/`**. Launch sets `evidenceDir` in state (default that path). Generator proof uses **`.cursor/skills/verify-sitelili/evidence/proof/`**.

Cleanup **must not** delete this tree.

Proof standards:

- Exercise the **user path** (open the page, click header/footer links). Do not “prove” by reading `src/` instead of HTTP/browser.
- Capture the **action** (request, click) **and** the resulting state (status, h1 text, screenshot), not only a final PNG.
- Side effects: this app writes none (static). The side-effect check is negative: **no form POST**, no patient fields. Confirm with `form` count `0` and no `input[type=email|text]` / `textarea` in page HTML.
- Mocks: none. Do not stub WhatsApp. Do not fetch production to “confirm”.
- Dry-run: N/A. If a helper is named dry-run, do not add one that still hits the public site.

Minimum home artifacts: `home.curl.html`, `home.curl.html.headers`, `home-hero.png`, `home-full.png`, `home.browser.txt`, `home.proof.json`, plus `doctor.json` from doctor.

## Cleanup

```bash
.cursor/skills/verify-sitelili/helpers/cleanup.sh
# or
.cursor/skills/verify-sitelili/helpers/cleanup.sh "$SITELILI_VERIFY_STATE"
```

Sends SIGTERM to the **process group recorded at launch** (`setsid` PID), then SIGKILL if needed. Removes `.cursor/skills/verify-sitelili/.run/<runId>/` scratch (logs + state). Does **not** kill other Node/Astro processes. Does **not** remove `evidence/`.

After cleanup, `test -f .cursor/skills/verify-sitelili/evidence/proof/home-hero.png` (or your run’s PNG) must still succeed.

## Helpers

All scripts are executable. From repo root:

| Command | What it does |
| --- | --- |
| `helpers/launch.sh` `[--dev]` | Isolated preview (default) or dev server; prints env vars |
| `helpers/doctor.sh` `[state]` | Read-only “worth driving?” |
| `node helpers/drive.mjs --feature home` | Curl + Chrome proof of home/hero |
| `helpers/cleanup.sh` `[state]` | Kill only this run’s PIDs |
| `helpers/run-home-proof.sh` | Full loop used to prove this skill |

`helpers/package.json` is Playwright-only. `helpers/common.sh` is sourced by the bash helpers — not invoked alone.

Full loop:

```bash
.cursor/skills/verify-sitelili/helpers/run-home-proof.sh
```
