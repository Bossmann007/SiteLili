#!/usr/bin/env node
/**
 * Post-build checks for SiteLili v2 SEO/a11y gates.
 * Run after `npm run build`. Exit 1 on failure.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const root = dist.pathname;
const failures = [];

function fail(msg) {
  failures.push(msg);
}

function walkHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkHtml(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

if (!existsSync(root)) fail('dist/ missing — run npm run build first');

if (existsSync(join(root, 'sobre.md'))) fail('dist/sobre.md must not ship');
if (!existsSync(join(root, '404.html'))) fail('dist/404.html missing');
if (!existsSync(join(root, 'og.jpg'))) fail('dist/og.jpg missing');

const sobre = join(root, 'sobre', 'index.html');
if (existsSync(sobre)) {
  const html = readFileSync(sobre, 'utf8');
  if (!html.includes('rel="canonical" href="https://www.draligianamaffini.com.br/sobre/"')) {
    fail('sobre canonical must end with trailing slash');
  }
  if (html.includes('lastReviewed')) fail('lastReviewed must not appear in HTML');
  if (!html.includes('"@graph"') && !html.includes('"@graph":')) {
    // JSON.stringify may escape differently
    if (!html.includes('@graph')) fail('JSON-LD @graph missing on /sobre/');
  }
}

const home = join(root, 'index.html');
if (existsSync(home)) {
  const html = readFileSync(home, 'utf8');
  if (!html.includes('Médica de Família em Curitiba')) fail('home title intent missing');
  if (!html.includes('/medicina-do-estilo-de-vida/')) fail('home missing MEV internal link');
  if (!html.includes('og:image:width')) fail('og:image:width missing on home');
  if (!html.includes('/og.jpg')) fail('og.jpg not referenced on home');
  if (!html.includes('og:locale')) fail('og:locale missing on home');
  if (html.includes('data-service-expand')) fail('home still has service-expand toggle');
  if (!html.includes('MedicalBusiness')) fail('home JSON-LD missing MedicalBusiness');
  if (!html.includes('Physician')) fail('home JSON-LD missing Physician');
  if (!html.includes('areaServed')) fail('home JSON-LD missing areaServed');
  if (!html.includes('São José dos Pinhais')) fail('home JSON-LD missing metro city');
  if (!html.includes('Região Metropolitana de Curitiba')) fail('home JSON-LD missing RMC areaServed');
  if (html.includes('"areaServed":"BR"')) fail('areaServed must not be country-only BR');
  if (html.includes('"@type":"GeoCoordinates"')) fail('do not invent GeoCoordinates');
  if (!html.includes('https://schema.org/PrimaryCare')) fail('home JSON-LD missing PrimaryCare medicalSpecialty');
  if (html.includes('LifestyleMedicine')) fail('home JSON-LD must not invent LifestyleMedicine');
  if (!html.includes('knowsAbout')) fail('home JSON-LD missing knowsAbout');
}

if (!existsSync(join(root, 'sitemap-index.xml'))) fail('sitemap-index.xml missing');
if (!existsSync(join(root, 'llms.txt'))) fail('llms.txt missing');

const contato = join(root, 'contato', 'index.html');
if (existsSync(contato)) {
  const html = readFileSync(contato, 'utf8');
  if (!html.includes('Rua Zeila Moura dos Santos, 101, sala 503')) fail('contato NAP street missing');
  if (!html.includes('região metropolitana')) fail('contato missing região metropolitana copy');
  if (!html.includes('Quem mora na região metropolitana')) fail('contato local FAQ missing');
  if (!html.includes('A teleconsulta serve para quem está em Curitiba')) fail('contato teleconsulta FAQ missing');
}

const menopausa = join(root, 'menopausa', 'index.html');
if (existsSync(menopausa)) {
  const html = readFileSync(menopausa, 'utf8');
  const h2 = (html.match(/<h2\b/g) || []).length;
  if (h2 < 3) fail(`menopausa expected ≥3 h2 sections, found ${h2}`);
}

const mev = join(root, 'medicina-do-estilo-de-vida', 'index.html');
if (existsSync(mev)) {
  const html = readFileSync(mev, 'utf8');
  for (const phrase of [
    'Medicina do estilo de vida · abordagem em Curitiba',
    'Médica de família com abordagem em medicina do estilo de vida em Curitiba',
    'não especialidade CRM',
    'Quem é a médica com abordagem em medicina do estilo de vida em Curitiba',
    'Medicina do estilo de vida é uma especialidade no CRM',
    'Qual a diferença entre médica de família e medicina do estilo de vida',
  ]) {
    if (!html.includes(phrase)) fail(`MEV page missing phrase: ${phrase}`);
  }
  if (html.includes('LifestyleMedicine')) fail('MEV must not use fake LifestyleMedicine specialty code');
  if (html.includes('Título de Especialista em Medicina do Estilo de Vida')) {
    fail('MEV must not be announced as CRM specialist title');
  }
} else {
  fail('dist/medicina-do-estilo-de-vida/index.html missing');
}

const llms = join(root, 'llms.txt');
if (existsSync(llms)) {
  const text = readFileSync(llms, 'utf8');
  if (!text.includes('médica do estilo de vida')) fail('llms.txt missing MEV search intent line');
}

const pages = existsSync(root) ? walkHtml(root) : [];
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const m = html.match(/rel="canonical" href="([^"]+)"/);
  if (!m) {
    fail(`no canonical in ${file}`);
    continue;
  }
  const href = m[1];
  if (!href.endsWith('/')) fail(`canonical without trailing slash: ${href} (${file})`);
}

if (failures.length) {
  console.error('verify-dist FAILED:');
  for (const f of failures) console.error(' -', f);
  process.exit(1);
}

console.log(`verify-dist OK (${pages.length} html files checked)`);
