# Pilares MEV

Pilares is the educational page for the six Lifestyle Medicine pillars. A visitor reads clinical meaning and how each pillar shows up in consultation, then can jump to the MEV specialty page — still without submitting health data.

## Sub-features

- `pilares-page` serves `/pilares` with `h1[data-hero-title]` containing `Seis pilares da Medicina do Estilo de Vida` and `CRM/PR 17731`.
- `pilares-accordion` lists six `[data-faq-trigger]` titles: `Alimentação`, `Movimento`, `Sono`, `Gerenciamento do estresse`, `Conexões sociais`, `Redução de tóxicos`.
- `pilares-expand` reveals `clinical` + “Na consulta:” copy from `src/data/mev-pillars.ts` when a trigger is opened.
- `pilares-segment` `[data-mev-segment]` marks **Pilares MEV** `aria-current="page"` and links **Medicina do estilo de vida** to `/medicina-do-estilo-de-vida`.
- `pilares-from-home` is reachable from home pillar cards (`href="/pilares"`) and from `/especialidades`.
- `pilares-cta` “Agendar pelo WhatsApp” uses `https://wa.me/5541995104424` (href only).

## How to get to it (user POV)

- On home, choose a pillar card (`Alimentação`, …) or “Ver detalhes →”.
- On `/especialidades`, choose **Seis pilares da Medicina do Estilo de Vida**.
- On a specialty page (except MEV), choose the pilares text link.
- Open `/pilares` directly.
- From `/medicina-do-estilo-de-vida`, use the segment control **Pilares MEV**.

## Driving it with verify-sitelili

Preconditions:

- Doctor is green. Titles below are literals from `mev-pillars.ts` — do not rename them in assertions.

- **Open page.** `curl -sS -o "$SITELILI_EVIDENCE_DIR/pilares.html" -w "%{http_code}" "$SITELILI_BASE_URL/pilares"`. HTTP **200**. HTML includes all six pillar titles and `data-faq-trigger`.
- **Home entry.** From `/`, click a card whose heading is `Alimentação` (`a[href="/pilares"]`). Result path `/pilares`. Hero h1 visible.
- **Expand one pillar.** Click `button[data-faq-trigger]` with name `Alimentação`. Panel `#pillar-panel-0` is not `hidden`; text includes `Na consulta:` and mentions hábitos / metas (from data). `aria-expanded="true"`.
- **Segment.** `nav[aria-label="Navegação entre pilares MEV e medicina do estilo de vida"] a[href="/pilares"]` has `aria-current="page"`. Optional: click `a[href="/medicina-do-estilo-de-vida"]` and confirm that specialty h1; return via segment **Pilares MEV**.
- **No form.** Zero `<form>` on `/pilares`.
- **Proof.** Screenshot with at least one pillar expanded so “Na consulta:” is readable, plus saved HTML. Reload; accordion may collapse (client state) — that is expected; HTTP body still contains all six titles.

## Gotchas

- Home uses **cards** (not accordion). `/pilares` uses **accordion** (`useAccordion={true}`). Do not look for `#pillar-trigger-0` on home.
- `/medicina-do-estilo-de-vida` also mounts the accordion. Proving pilares the page means `/pilares` specifically; the specialty page is `especialidades`.
- Accordion IDs are `pillar-trigger-${index}` in `MevPillarsBand.astro` — index order is the `mevPillars` array order, not alphabetical.
- Segment indicator is decorative (`aria-hidden`). Assert `aria-current` on the `<a>`, not the sliding pill position.
- Educational disclaimer on the page (“não substitui consulta”) is required copy, not a failure.
