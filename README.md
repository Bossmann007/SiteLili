# Clínica Dra. Ligiana Maffini

Site institucional estático da clínica particular da Dra. Ligiana Maffini (medicina de família e comunidade, Curitiba).

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

Arquivos em `Logos/02 Logotipos/`:

- `4.png` → header e footer (`public/logo/logo-horizontal.png`)
- `6.png` → favicon (`public/logo/logo-icon.png`)

Para trocar a versão do logo, substitua esses PNGs em `public/logo/` e rode `npm run build`.
