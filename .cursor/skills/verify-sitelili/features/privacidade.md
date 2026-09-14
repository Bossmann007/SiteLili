# Privacidade

Privacidade is the LGPD notice: the visitor learns the site is informational, collects no patient registry, and can email the controller. It is the contractual “no health forms” proof.

## Sub-features

- `priv-page` serves `/privacidade` with h1 `Política de privacidade` and “Lei Geral de Proteção de Dados (LGPD)”.
- `priv-controller` names `Ligiana Maffini Romanus`, `CRM/PR 17731`, and `mailto:draligianamaffini@gmail.com`.
- `priv-no-cadastro` states the site **Não cadastra pacientes**, has no logged-in area, and **Não há formulário de contato no site**.
- `priv-no-form` the page itself contains no `<form>` and no clinical inputs.
- `priv-footer-entry` is linked from every footer as `Privacidade (LGPD)` → `/privacidade`.
- `priv-terceiros` mentions Google Maps (contato iframe), WhatsApp/Meta, and Cloudflare Pages — as disclosure, not as systems to log into.

## How to get to it (user POV)

- Scroll to the footer on any page and choose **Privacidade (LGPD)**.
- Open `/privacidade` directly.

There is no header nav item for privacy.

## Driving it with verify-sitelili

Preconditions:

- Doctor is green. Any page’s footer is a valid entry (home is enough).

- **Footer entry.** From `$SITELILI_BASE_URL/`, click `footer a[href="/privacidade"]` (name `Privacidade (LGPD)`). Resulting path `/privacidade`.
- **HTTP.** `curl -sS -o "$SITELILI_EVIDENCE_DIR/privacidade.html" -w "%{http_code}" "$SITELILI_BASE_URL/privacidade"`. HTTP **200**.
- **Headings and claims.** Visible h1 `Política de privacidade`. Body includes `Não cadastra pacientes` and `Não há formulário de contato no site`. Body includes `draligianamaffini@gmail.com`.
- **No form.** `grep -iE '<form[ >]'` on the saved HTML finds nothing. Playwright `page.locator('form').count()` is `0`. No `input[type=text]`, `input[type=email]`, `textarea`.
- **Controller email.** The privacy contact mailto is `mailto:draligianamaffini@gmail.com` (same inbox as clinical email — still not a form).
- **Proof.** Screenshot of the “O que este site faz — e o que não faz” section plus saved HTML. Action = click footer (or GET). Result = those sentences visible. Reload; unchanged.

## Gotchas

- Privacy is **not** in `nav` (`src/data/site.ts` `nav` array). If you only click header links you will miss it.
- Do not “improve” the page by adding a contact form during verification — that would violate the claim you are proving.
- Do not invent a DPO portal or cookie banner; this site documents no tracking cookies (`privacidade.astro` + autohosted fonts).
- Canonical URL in HTML still uses the production host. Prove against localhost.
- CSP in `public/_headers` is a deploy artifact. Local `astro preview` may not send those Cloudflare headers; do not fail privacidade because `X-Frame-Options` is absent on preview. Assert **document** text, not CDN headers, unless you are explicitly testing `public/_headers` copy-through in `dist/_headers` after `npm run build`.
