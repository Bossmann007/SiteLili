# Clínica Dra. Ligiana Maffini

Site institucional estático da clínica particular da Dra. Ligiana Maffini (medicina de família e comunidade, Curitiba).

**Este site não coleta dados de paciente** — sem formulários, cadastro ou envio de informações clínicas. Contato apenas via WhatsApp e e-mail.

**Stack:** Astro 7 · Tailwind CSS 4 · GSAP 3 · deploy em Cloudflare Pages

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

A pasta `dist/` é gerada pronta para publicação estática (HTML por rota, incluindo especialidades).

```bash
npm run preview
```

## Publicação

Dois caminhos válidos. O site é **100% estático** — não há backend, banco ou `npm` na hospedagem.

### A) Cloudflare Pages (recomendado)

1. Conecte o repositório [SiteLili](https://github.com/Bossmann007/SiteLili) no [Cloudflare Pages](https://pages.cloudflare.com/)
2. Configuração de build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js:** 22 ou superior
3. Publique. O Cloudflare fornece uma URL `*.pages.dev`
4. Headers de segurança: `public/_headers` (copiado para `dist/` no build)
5. Redirecionamentos opcionais: `public/_redirects`

**DNS no Registro.br**

| Tipo  | Nome | Destino                   |
|-------|------|---------------------------|
| CNAME | www  | `<seu-projeto>.pages.dev` |

- **Não** aponte para `cname.greatpages.com.br` ou hosts antigos
- No Cloudflare, adicione o domínio customizado `www.draligianamaffini.com.br`
- Domínio raiz (`@`): redirecione para `www` ou use os registros A/AAAA indicados pelo Cloudflare
- HTTPS é provisionado automaticamente pelo Cloudflare

**`astro.config.mjs`:** `site: https://www.draligianamaffini.com.br`, `output: 'static'`, integração `@astrojs/sitemap` ativa.

### B) Hostinger (hospedagem estática / public_html)

1. Na sua máquina (Node >= 22.12): `npm install` && `npm run build`
2. Envie **apenas o conteúdo interno** de `dist/` para `public_html` (FTP, Gerenciador de Arquivos ou Git deploy se disponível)
3. **Não** rode `npm install` nem `npm run build` no plano compartilhado Hostinger
4. O arquivo `public/.htaccess` vai para `dist/.htaccess` no build — força HTTPS e `DirectoryIndex index.html`
5. Estrutura esperada em `public_html`: `index.html`, `sobre/`, `especialidades/`, `medicina-de-familia/`, `_astro/`, etc.

## Estrutura do site

| Página      | Rota          |
|-------------|---------------|
| Home        | `/`           |
| Sobre       | `/sobre`      |
| Abordagem   | `/abordagem`  |
| Contato     | `/contato`    |
| Privacidade | `/privacidade`|
| Especialidades | `/especialidades` |
| Pilares MEV | `/pilares`    |

### Páginas por especialidade (GEO)

| Tema | Rota |
|------|------|
| Medicina de família | `/medicina-de-familia` |
| Medicina do estilo de vida | `/medicina-do-estilo-de-vida` |
| Prevenção | `/prevencao` |
| Saúde da mulher 40+ | `/saude-da-mulher` |
| Menopausa | `/menopausa` |
| Emagrecimento clínico | `/emagrecimento` |
| Longevidade | `/longevidade` |

## Segurança e privacidade

- Sem formulários que coletem dados de saúde ou identificação de paciente
- Política LGPD em `/privacidade`
- Headers HTTP via `public/_headers` (Cloudflare Pages): CSP, HSTS, X-Frame-Options, etc.
- Tipografia autohospedada em `public/fonts/` (Cormorant Garamond, Source Sans 3) — sem Google Fonts
- **CSP `script-src`:** `'self' 'unsafe-inline'` — necessário para JSON-LD inline (`application/ld+json`) e leitura pelo Google; scripts de app vêm de `/_astro/` e `theme-init.js`
- Pasta `Logos/` (PDFs de timbrado, cartão, envelope) ignorada no git — não vai para o Pages

## Conteúdo e conformidade

- NAP, CRM e RQE centralizados em `src/data/site.ts`
- JSON-LD `Physician` + `MedicalClinic` em todas as páginas
- Footer com endereço completo em toda página
- Placeholder de foto em `public/images/dra-ligiana-placeholder.svg` (substituir pela foto real)
- Sem preços, horários ou depoimentos inventados

## Animações (GSAP)

- Hero: SplitText no título (`power4.out`)
- Cards: stagger + ScrollTrigger (`once: true`)
- Seções Sobre/reveal: `y` + `opacity`
- `gsap.matchMedia()` respeita `prefers-reduced-motion`
- Apenas `transform` e `opacity`; plugins registrados uma vez em `src/scripts/gsap-setup.ts`

## Substituir ou atualizar fotos

As fotos originais ficam em `imagens/` na raiz do projeto. Cópias para o site em `src/assets/images/`.

1. Substitua ou adicione arquivos em `imagens/`
2. Copie para `src/assets/images/`
3. Atualize os imports nas páginas (`index.astro`, `sobre.astro`, `abordagem.astro`)

O Astro gera WebP otimizado no build (de ~10 MB para poucos KB por tamanho).

## Logotipo

Arquivos de produção em `public/logo/`. A pasta `Logos/` na raiz (incluindo PDFs) fica fora do git — use-a só localmente como referência de marca.
