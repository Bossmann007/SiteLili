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

```bash
npm run build
```

A pasta `dist/` é gerada pronta para publicação estática.

```bash
npm run preview
```

## Deploy no Cloudflare Pages

1. Conecte este repositório no [Cloudflare Pages](https://pages.cloudflare.com/)
2. Configuração de build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js:** 22 ou superior
3. Publique. O Cloudflare fornecerá uma URL `*.pages.dev`

## DNS no Registro.br

Após o deploy, aponte o domínio **www.draligianamaffini.com.br** para o Cloudflare Pages.

### Registro CNAME (recomendado)

No painel do Registro.br, em **DNS**, crie:

| Tipo  | Nome | Destino                          |
|-------|------|----------------------------------|
| CNAME | www  | `<seu-projeto>.pages.dev`        |

Substitua `<seu-projeto>` pelo subdomínio exibido no Cloudflare Pages após o primeiro deploy.

### Domínio raiz (opcional)

O Registro.br não aceita CNAME na raiz (`@`). Opções:

- Redirecionar `@` → `www` no Registro.br ou no Cloudflare
- Usar os registros A/AAAA que o Cloudflare indicar ao adicionar o domínio customizado

### Importante

- **Não** aponte o domínio para `cname.greatpages.com.br` ou outros hosts antigos
- No Cloudflare Pages, adicione o domínio customizado `www.draligianamaffini.com.br` e siga a validação indicada
- Mantenha HTTPS ativo (Cloudflare provisiona certificado automaticamente)

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
- **CSP `script-src`:** apenas `'self'`. O bootstrap de tema está em `public/theme-init.js`. Se o build passar a exigir `'unsafe-inline'` em scripts, documente aqui antes de afrouxar a política.
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
