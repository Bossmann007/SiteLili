# Especialidades

Especialidades is the clinical-topic index: a visitor picks an area of care and reads a dedicated GEO page. Scheduling still happens only on WhatsApp or email.

## Sub-features

- `esp-index` renders `/especialidades` with `h1[data-hero-title]` containing `Especialidades da Dra. Ligiana Maffini` and `CRM/PR 17731`.
- `esp-grid` lists all seven topics as links to `/{slug}`.
- `esp-slug-pages` serves each static path from `src/pages/[slug].astro` + `src/data/specialties.ts`.
- `esp-from-home` reaches the index via header **Especialidades** or home “Ver índice de especialidades”.
- `esp-to-pilares` links “Seis pilares da Medicina do Estilo de Vida” to `/pilares`.
- `esp-no-form` keeps specialty pages informational (no clinical intake form).

## How to get to it (user POV)

- Choose **Especialidades** in `nav[aria-label="Principal"]` (`/especialidades`).
- From home, choose **Ver índice de especialidades** or a specialty card (`Saiba mais →` goes straight to a slug).
- Open a known slug: `/medicina-de-familia`, `/medicina-do-estilo-de-vida`, `/prevencao`, `/saude-da-mulher`, `/menopausa`, `/emagrecimento`, `/longevidade`.
- From `/pilares`, choose **Todas as especialidades**.

## Driving it with verify-sitelili

Preconditions:

- Doctor is green on `$SITELILI_BASE_URL`.
- These slugs exist in `src/data/specialties.ts` (do not invent extra topics).

- **Open index.** `curl -sS -o "$SITELILI_EVIDENCE_DIR/especialidades.html" -w "%{http_code}" "$SITELILI_BASE_URL/especialidades"`. HTTP **200**. HTML includes `data-hero-title` and each `href="/medicina-de-familia"` … `href="/longevidade"` plus `href="/pilares"`.
- **Nav entry.** Desktop: click `nav[aria-label="Principal"] a[href="/especialidades"]` (name `Especialidades`). URL path is `/especialidades`. That link has `aria-current="page"`.
- **Open one GEO page.** Click `a[href="/medicina-de-familia"]` named `Medicina de Família e Comunidade` (index uses `<h2>` inside the card). Result: `h1[data-hero-title]` equals the specialty `h1` from data (“Medicina de família e comunidade em Curitiba…” and `CRM/PR 17731`). `curl` `$SITELILI_BASE_URL/medicina-de-familia` is 200.
- **MEV page extras.** `$SITELILI_BASE_URL/medicina-do-estilo-de-vida` includes `[data-mev-segment]` and pillar accordion triggers. Other slugs include a text link to `/pilares` instead of the in-page accordion.
- **Unknown slug.** `curl -sS -o /dev/null -w "%{http_code}" "$SITELILI_BASE_URL/nao-existe"` is **404** (static host). Do not treat 404 as a site outage.
- **No form.** Specialty HTML has no `<form` and no health-data fields.
- **Proof.** Save index + one slug HTML, a screenshot of the index grid, and the visible `h1` text. Reload the slug URL; heading is unchanged (static).

## Gotchas

- Index cards say **Ler página completa →**; home band cards say **Saiba mais →**. Same destinations, different chrome.
- `longevidade` uses `lg:col-start-2` on large grids (`specialtyGridItemClass`) — it is still in the list; do not assert a 3×3 visual slot.
- Trailing slashes: Astro may serve `/especialidades` and `/especialidades/`. Normalize before comparing `aria-current`.
- Do not assert prices, hours, or invented testimonials on these pages — they are not in the content.
- `[slug].astro` only emits the seven `getStaticPaths` entries. A new marketing idea is not a route until it is in `specialties.ts`.
