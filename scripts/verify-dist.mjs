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
  if (!html.includes('og:image:width')) fail('og:image:width missing on home');
  if (!html.includes('/og.jpg')) fail('og.jpg not referenced on home');
  if (html.includes('data-service-expand')) fail('home still has service-expand toggle');
}

const menopausa = join(root, 'menopausa', 'index.html');
if (existsSync(menopausa)) {
  const html = readFileSync(menopausa, 'utf8');
  const h2 = (html.match(/<h2\b/g) || []).length;
  if (h2 < 3) fail(`menopausa expected ≥3 h2 sections, found ${h2}`);
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
