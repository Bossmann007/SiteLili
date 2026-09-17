<!-- ENZO-PORTFOLIO-BRAND -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:111111,100:C2416C&height=165&section=header&text=Dra.%20Ligiana%20Maffini&fontSize=36&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Site%20institucional%20%C2%B7%20medicina%20de%20fam%C3%ADlia%20em%20Curitiba&descAlignY=57&descSize=14" alt="site Dra. Ligiana Maffini" />
</p>

<p align="center"><strong>Astro · Tailwind CSS · GSAP</strong></p>

---

# site Dra. Ligiana Maffini

Site institucional estático da clínica particular da Dra. Ligiana Maffini — **Medicina de Família e Comunidade** em Curitiba (Cristo Rei), com **abordagem em medicina do estilo de vida** (formação, não segunda especialidade anunciada).

**Repositório:** [Bossmann007/site-Dra-Ligiana-Maffini](https://github.com/Bossmann007/site-Dra-Ligiana-Maffini)

**Este site não coleta dados de paciente** — sem formulários, cadastro ou envio de informações clínicas. Contato apenas via WhatsApp e e-mail.

**Stack:** Astro 7 · Tailwind CSS 4 · GSAP 3 · Cloudflare (Pages / Workers Assets)

**URL canônica:** https://www.draligianamaffini.com.br

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra http://localhost:4321

## Build de produção

Requisito: **Node.js >= 22.12** (ver `engines` em `package.json`).

```bash
npm install
npm run build
```

A pasta `dist/` é gerada pronta para publicação estática (HTML por rota).

```bash
npm run preview
npm run check:site   # astro check + build + verify-dist
```

## Publicação

O site é **100% estático** — sem backend, banco ou `npm` na hospedagem. Não use `@astrojs/cloudflare`.

### A) Cloudflare Pages / Workers Assets (recomendado)

O repo inclui `wrangler.toml` com `[assets]` → `./dist` (404-page + trailing slash).

1. Conecte o repositório [site-Dra-Ligiana-Maffini](https://github.com/Bossmann007/site-Dra-Ligiana-Maffini) no Cloudflare
2. Build:
   - **Build command:** `npm run build`
   - **Output:** `dist` (Pages) · deploy `npx wrangler deploy` (Workers Builds)
   - **Node.js:** 22+
3. Domínio customizado: `www.draligianamaffini.com.br`
4. Headers: `public/_headers` (Pages). Em Workers Assets, confirme se os headers aplicam ou use Transform Rules.
5. Redirects opcionais: `public/_redirects`

**DNS**

| Tipo  | Nome | Destino |
|-------|------|---------|
| CNAME | www  | hostname do projeto Cloudflare |

- Apex (`@`): redirect 301 para `www` (ou A/AAAA do Cloudflare)
- Não apontar para hosts antigos (ex.: GreatPages)

**`astro.config.mjs`:** `site: https://www.draligianamaffini.com.br`, `trailingSlash: 'always'`, `output: 'static'`, `@astrojs/sitemap`.

### B) Hostinger (estático / `public_html`)

1. Localmente: `npm install` && `npm run build`
2. Enviar só o conteúdo de `dist/` para `public_html`
3. Não rodar `npm` no plano compartilhado
4. `public/.htaccess` → `dist/.htaccess` no build

## Estrutura do site

| Página | Rota |
|--------|------|
| Home | `/` |
| Sobre | `/sobre/` |
| Abordagem | `/abordagem/` |
| Contato | `/contato/` |
| Privacidade | `/privacidade/` |
| Especialidades (índice) | `/especialidades/` |
| Pilares MEV | `/pilares/` |

### Landings de atuação (GEO / Curitiba)

| Tema | Rota | Nota |
|------|------|------|
| Medicina de família | `/medicina-de-familia/` | Especialidade (SBMFC) |
| Medicina do estilo de vida | `/medicina-do-estilo-de-vida/` | Abordagem / formação |
| Prevenção | `/prevencao/` | |
| Saúde da mulher 40+ | `/saude-da-mulher/` | |
| Menopausa | `/menopausa/` | |
| Emagrecimento clínico | `/emagrecimento/` | |
| Longevidade | `/longevidade/` | |

**Área de atendimento:** consultório presencial só no Cristo Rei, Curitiba. Pacientes da região metropolitana (ex.: São José dos Pinhais, Colombo, Pinhais, Araucária) se consultam nesse endereço; teleconsulta para continuidade quando indicada. Idiomas: português; teleconsulta também EN / IT / DE conforme disponibilidade.

## Segurança e privacidade

- Sem formulários de dados de saúde
- LGPD em `/privacidade/`
- Headers em `public/_headers` (CSP, HSTS, X-Frame-Options, …)
- Fontes autohospedadas em `public/fonts/` (Cormorant Garamond, Source Sans 3)
- CSP `script-src 'self'` only; `style-src` com `'unsafe-inline'` (Astro/Tailwind)
- Pasta `Logos/` (PDFs de marca) fora do git

## Conteúdo e conformidade

- NAP, CRM, RQE, idiomas e `serviceArea` em `src/data/site.ts`
- JSON-LD: `Physician` + `MedicalBusiness` (+ FAQ / breadcrumbs conforme a página)
- Footer com endereço completo em toda página
- Sem preços, horários ou depoimentos inventados
- YMYL: não inventar fontes de rodapé nem datas de revisão clínica sem confirmação da doutora

## Animações (GSAP)

- Hero: SplitText no título
- Cards: stagger + ScrollTrigger (`once: true`)
- `gsap.matchMedia()` respeita `prefers-reduced-motion`
- Plugins em `src/scripts/gsap-setup.ts`

## Fotos

Originais em `imagens/`; assets do site em `src/assets/images/` (inclui frames do consultório na home).

1. Atualize `imagens/` e copie para `src/assets/images/`
2. Ajuste imports / `photos.ts` conforme necessário

`Photo.astro` usa `astro:assets` `Image` (WebP + `srcset` no build).

## Logotipo

Produção em `public/logo/`. `Logos/` na raiz fica fora do git (referência local).

<!-- ENZO-PORTFOLIO-BRAND-FOOTER -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:111111,100:C2416C&height=85&section=footer" alt="Footer" />
</p>
