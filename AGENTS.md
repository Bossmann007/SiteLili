## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related topics:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Learned User Preferences

- Portuguese OK for chat; keep code and identifiers in English
- Prefer `/poteto-mode` for non-trivial SiteLili engineering; keep diffs minimal
- Do not invent clinical claims, prices, reviews, or AI-generated clinic images — use only approved copy and real photo/video frames
- Do not deploy, change DNS, or edit Doctoralia without an explicit ask
- Do not add on-site search (Pagefind/Algolia) while the site stays around a dozen pages
- Clinic gallery frames must exclude patients, other people, documents, charts, screens, names, phones, or other personal data
- Until the doctor confirms in writing: keep Medicina do Estilo de Vida as formação/abordagem (not a second announced specialty); do not invent YMYL footer sources or clinical review dates

## Learned Workspace Facts

- App code lives in `Projects/SiteLili/repo` (Astro 7 static, Cloudflare Pages, canonical `https://www.draligianamaffini.com.br`)
- `trailingSlash: 'always'`; shared helper `src/lib/paths.ts` `withTrailingSlash`
- NAP, CRM/RQE, specialty wording, and FAQs are centralized in `src/data/site.ts`; specialty landings in `src/data/specialties.ts`
- No patient forms — contact is WhatsApp/email only
- Home `homeGallery` alternates three Dra. portraits with `clinic-video-1.webp` / `clinic-video-2.webp` / `clinic-video-3.webp`
- Quality gate: `npm run check:site` runs `astro check`, build, and `scripts/verify-dist.mjs`
- Outside the repo until fixed: apex `draligianamaffini.com.br` DNS → `www`; Doctoralia still contradicts Curitiba NAP / teleconsulta
