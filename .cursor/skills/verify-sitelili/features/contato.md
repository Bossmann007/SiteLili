# Contato / WhatsApp

Contato is how a visitor gets NAP (name, address, phone) and starts a conversation. The site never takes clinical data; WhatsApp and email are the only intake channels.

## Sub-features

- `contato-page` serves `/contato` with hero “Estamos em Curitiba” and `Ligiana Maffini Romanus · CRM/PR 17731`.
- `contato-whatsapp` shows label WhatsApp, visible `(41) 99510-4424`, `href="https://wa.me/5541995104424"`.
- `contato-email` shows `draligianamaffini@gmail.com` as `mailto:draligianamaffini@gmail.com`.
- `contato-address` shows `Rua Zeila Moura dos Santos, 101, sala 503, Cristo Rei, Curitiba - PR, 80050-605` and “Abrir no Google Maps”.
- `contato-map-iframe` embeds `iframe[title="Mapa da clínica no bairro Cristo Rei, Curitiba"]` (Google). Do not interact inside the iframe.
- `contato-faq` accordion `[data-faq-accordion]` answers “Como agendar?” with WhatsApp + email (no form).
- `contato-header-cta` desktop `a[data-header-cta]` “Agendar consulta” → same `wa.me` URL.
- `contato-mobile-float` `a[aria-label="Agendar consulta pelo WhatsApp"]` visible below the `md` breakpoint.

## How to get to it (user POV)

- Choose **Contato** in the principal nav (`/contato`).
- Choose **Agendar consulta** in the header (leaves the site for WhatsApp — verify href only).
- On a phone-sized viewport, choose the green **WhatsApp** float or the hamburger **WhatsApp** item.
- From any page footer, use the phone or email links (footer is on every layout).

## Driving it with verify-sitelili

Preconditions:

- Doctor is green. Desktop vs mobile viewport chosen to match the sub-feature.
- Do not log into WhatsApp Web. Do not send messages.

- **Open contato.** `curl -sS -o "$SITELILI_EVIDENCE_DIR/contato.html" -w "%{http_code}" "$SITELILI_BASE_URL/contato"`. HTTP **200**. Body has `Estamos em Curitiba`, `https://wa.me/5541995104424`, `mailto:draligianamaffini@gmail.com`, `Rua Zeila Moura dos Santos, 101`, and **no** `<form`.
- **Nav entry.** Click `nav[aria-label="Principal"] a[href="/contato"]`. Path `/contato`. `aria-current="page"` on Contato.
- **WhatsApp card.** Find heading `WhatsApp` then the adjacent link; `href` is exactly `https://wa.me/5541995104424`, `target="_blank"`, `rel` contains `noopener`.
- **Email card.** Link text `draligianamaffini@gmail.com` with `mailto:draligianamaffini@gmail.com`.
- **Map.** `iframe` title is `Mapa da clínica no bairro Cristo Rei, Curitiba`. `src` hosts `maps.google.com`. Do not click the map or open Google as the proof.
- **FAQ.** Click `[data-faq-trigger]` whose text is `Como agendar?`. `[data-faq-panel]` for that item becomes un-`hidden` and includes `(41) 99510-4424` and `draligianamaffini@gmail.com`. `aria-expanded` on the trigger becomes `true`.
- **Header CTA.** At 1280px, `a[data-header-cta]` text `Agendar consulta` has the same `wa.me` href. At 390px it is not displayed (`hidden md:inline-flex`); use the float instead.
- **Mobile float.** Viewport 390×844. Locator `a[aria-label="Agendar consulta pelo WhatsApp"]` is visible; href `https://wa.me/5541995104424`.
- **Proof.** Screenshot of `/contato` showing address + WhatsApp card, saved HTML, and a note that outbound WhatsApp was **not** opened. Reload; content unchanged.

## Gotchas

- `form-action` in `public/_headers` allows `https://wa.me` and `mailto:` for CSP. That is not a site form. Still assert zero `<form>` elements.
- Contato’s extra “Agendar pelo WhatsApp” button is `md:hidden` — absent on desktop, same destination.
- Instagram handles on the page are outbound; proving contato does not require loading Instagram.
- FAQ panels start `hidden`. Assert expanded state after click, not on first paint.
- Phone display `(41) 99510-4424` vs `tel:+5541995104424` vs `wa.me/5541995104424` — three encodings of the same number from `src/data/site.ts`.
