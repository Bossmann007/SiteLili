# Home / hero

The home page is the first thing a visitor sees: who the doctor is, where she practices, and how to schedule on WhatsApp — without filling any form.

## Sub-features

- `home-identity` shows `h1[data-hero-title]` with Dra. Ligiana Maffini and `CRM/PR 17731`, eyebrow `Curitiba · Cristo Rei`.
- `home-whatsapp-cta` exposes “Agendar pelo WhatsApp” to `https://wa.me/5541995104424` (`target=_blank`, `rel=noopener noreferrer`).
- `home-abordagem-cta` links “Conhecer a abordagem” to `/abordagem`.
- `home-nav-current` marks Início as `aria-current="page"` in `nav[aria-label="Principal"]` (desktop).
- `home-specialties-teaser` lists specialty cards linking to `/medicina-de-familia` and the other slugs, plus “Ver índice de especialidades” → `/especialidades`.
- `home-pilares-teaser` lists the six MEV pillar cards linking to `/pilares`.
- `home-no-form` has zero `<form>` and no patient-data inputs.
- `home-footer-nap` repeats address, `tel:+5541995104424`, and `mailto:draligianamaffini@gmail.com`.

## How to get to it (user POV)

- Open the site root `/` (header logo `a[data-header-logo]`, skip link “Ir para o conteúdo”).
- Choose **Início** in the principal nav.
- Land from production DNS — still verify on the **local** preview URL, not Cloudflare.

## Driving it with verify-sitelili

Preconditions:

- Preview (or `--dev`) is healthy at `$SITELILI_BASE_URL`.
- `helpers/doctor.sh` passed for this state file.
- Desktop viewport ≥768px unless proving the mobile float (that is `contato`).

- **Open home.** Run `curl -sS -D "$SITELILI_EVIDENCE_DIR/home.curl.html.headers" -o "$SITELILI_EVIDENCE_DIR/home.curl.html" -w "%{http_code}" "$SITELILI_BASE_URL/"`. HTTP **200**. Body includes `data-hero-title`, `CRM/PR 17731`, `https://wa.me/5541995104424`, and no `<form`.
- **Rendered hero.** Run `node .cursor/skills/verify-sitelili/helpers/drive.mjs --feature home`. `h1[data-hero-title]` is visible and contains `Dra. Ligiana Maffini` and `CRM/PR 17731`. `[data-hero-eyebrow]` equals `Curitiba · Cristo Rei`.
- **Primary CTA href.** The first link inside `[data-hero-cta]` with text `Agendar pelo WhatsApp` has `href="https://wa.me/5541995104424"`. Do not click through to WhatsApp.
- **Secondary CTA.** Link `Conhecer a abordagem` has `href="/abordagem"`. Optional: click it and confirm `/abordagem` h1 loads; return via Início before capturing home proof.
- **Nav current.** `nav[aria-label="Principal"] a[href="/"]` has `aria-current="page"` and visible text `Início`.
- **Teasers.** Specialty card “Medicina de Família e Comunidade” links to `/medicina-de-familia`. A pillar card (e.g. `Alimentação`) links to `/pilares`.
- **Proof.** Artifacts `home-hero.png`, `home-full.png`, `home.browser.txt`, `home.proof.json` show the hero identity. Failed checks in `home.proof.json` mean the feature is not verified.

## Gotchas

- Header “Agendar consulta” (`[data-header-cta]`) is **desktop-only**; the green float is **mobile-only**. A 1280px screenshot without the float is expected.
- GSAP may animate opacity on `[data-hero-title]`. Wait for visibility, not a fixed sleep. `prefers-reduced-motion` skips most motion (`src/scripts/animations.ts`).
- Canonical `<link rel="canonical">` still points at `https://www.draligianamaffini.com.br/`. That is correct in local HTML — do not GET the production URL to “match” it.
- Service cards hide “Agendar consulta” until `[data-service-toggle]` (“Saiba mais”) is expanded. Collapsed cards are not a missing CTA.
- `npm run dev` on 4321 may be someone else. Doctor must match **this run’s** PID and port.
