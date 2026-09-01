#!/usr/bin/env node
/**
 * Drive SiteLili with curl (HTTP) plus Chromium/Chrome via Playwright.
 * Verification scaffolding only — not imported by the Astro app.
 *
 * Usage:
 *   node helpers/drive.mjs --feature home
 *   node helpers/drive.mjs --state /path/to/state.json --feature home
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const out = { feature: "home", state: process.env.SITELILI_VERIFY_STATE || "" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--feature") out.feature = argv[++i];
    else if (a === "--state") out.state = argv[++i];
    else if (a === "--help" || a === "-h") out.help = true;
  }
  return out;
}

function fail(msg) {
  console.error(`verify-sitelili drive: ${msg}`);
  process.exit(1);
}

function resolveStatePath(cliState) {
  if (cliState) return cliState;
  const latest = path.join(SKILL_DIR, ".run", "latest");
  if (fs.existsSync(latest)) return fs.readFileSync(latest, "utf8").trim();
  fail("no state file. Run helpers/launch.sh first.");
}

function assertLocal(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    fail(`invalid baseUrl ${url}`);
  }
  const ok =
    parsed.hostname === "127.0.0.1" ||
    parsed.hostname === "localhost" ||
    parsed.hostname === "::1";
  if (!ok) {
    fail(`refusing non-local URL ${url}. Never drive www.draligianamaffini.com.br as the harness.`);
  }
}

function curlGet(url, destPath) {
  const result = spawnSync(
    "curl",
    ["-sS", "-D", `${destPath}.headers`, "-o", destPath, "-w", "%{http_code}", "--max-time", "15", url],
    { encoding: "utf8" },
  );
  if (result.status !== 0) fail(`curl ${url} failed: ${result.stderr}`);
  return result.stdout.trim();
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
}

async function launchBrowser() {
  const attempts = [
    { channel: "chrome", args: ["--no-sandbox", "--disable-dev-shm-usage"] },
    { executablePath: "/usr/local/bin/google-chrome", args: ["--no-sandbox", "--disable-dev-shm-usage"] },
    { executablePath: "/usr/bin/google-chrome-stable", args: ["--no-sandbox", "--disable-dev-shm-usage"] },
    { args: ["--no-sandbox", "--disable-dev-shm-usage"] },
  ];
  let lastErr;
  for (const opts of attempts) {
    try {
      return await chromium.launch({ headless: true, ...opts });
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
}

async function driveHome({ baseUrl, evidenceDir }) {
  const homeUrl = `${baseUrl}/`;
  const htmlPath = path.join(evidenceDir, "home.curl.html");
  const status = curlGet(homeUrl, htmlPath);
  const html = fs.readFileSync(htmlPath, "utf8");

  const http = {
    action: `GET ${homeUrl}`,
    httpStatus: Number(status),
    checks: {},
  };
  http.checks.status200 = http.httpStatus === 200;
  http.checks.langPtBr = html.includes('lang="pt-BR"');
  http.checks.heroTitleAttr = html.includes("data-hero-title");
  http.checks.crm = html.includes("CRM/PR 17731");
  http.checks.whatsapp = html.includes("https://wa.me/5541995104424");
  http.checks.noForm = !/<form[\s>]/i.test(html);
  http.checks.heroEyebrow = html.includes("Curitiba · Cristo Rei");
  http.checks.abordagemCta = html.includes('href="/abordagem"');
  http.checks.specialtyBand = html.includes("Medicina de Família e Comunidade");
  http.checks.pilaresLink = html.includes('href="/pilares"');

  const browser = await launchBrowser();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(homeUrl, { waitUntil: "networkidle" });
  await page.locator("[data-hero-title]").waitFor({ state: "visible" });

  const heroTitle = (await page.locator("[data-hero-title]").innerText()).trim();
  const eyebrow = (await page.locator("[data-hero-eyebrow]").first().innerText()).trim();
  const whatsappHref = await page
    .locator('[data-hero-cta] a[href^="https://wa.me/"]')
    .first()
    .getAttribute("href");
  const formCount = await page.locator("form").count();
  const navCurrent = await page.locator('nav[aria-label="Principal"] a[aria-current="page"]').innerText();
  const skipLink = await page.locator('a[href="#conteudo"]').count();

  await page.screenshot({
    path: path.join(evidenceDir, "home-hero.png"),
    fullPage: false,
  });
  await page.screenshot({
    path: path.join(evidenceDir, "home-full.png"),
    fullPage: true,
  });

  const ariaDump = [
    `url: ${page.url()}`,
    `h1[data-hero-title]: ${heroTitle}`,
    `p[data-hero-eyebrow]: ${eyebrow}`,
    `hero WhatsApp href: ${whatsappHref}`,
    `nav aria-current: ${navCurrent}`,
    `form count: ${formCount}`,
    `skip link #conteudo: ${skipLink}`,
    `title: ${await page.title()}`,
  ].join("\n");
  fs.writeFileSync(path.join(evidenceDir, "home.browser.txt"), ariaDump + "\n");

  await browser.close();

  const browserChecks = {
    heroTitleHasName: heroTitle.includes("Dra. Ligiana Maffini"),
    heroTitleHasCrm: heroTitle.includes("CRM/PR 17731"),
    eyebrow: eyebrow === "Curitiba · Cristo Rei",
    whatsappHref: whatsappHref === "https://wa.me/5541995104424",
    noForm: formCount === 0,
    navInicioCurrent: navCurrent.trim() === "Início",
    stillOnLocalHome: page.url() === homeUrl || page.url() === `${homeUrl}`,
  };

  const all = { ...http.checks, ...browserChecks };
  const failed = Object.entries(all).filter(([, v]) => !v).map(([k]) => k);
  writeJson(path.join(evidenceDir, "home.proof.json"), {
    feature: "home",
    action: http.action,
    resultingState: {
      heroTitle,
      eyebrow,
      whatsappHref,
      navCurrent: navCurrent.trim(),
      formCount,
    },
    http,
    browserChecks,
    artifacts: ["home.curl.html", "home.curl.html.headers", "home-hero.png", "home-full.png", "home.browser.txt"],
    failed,
  });

  if (failed.length) {
    fail(`home proof failed checks: ${failed.join(", ")}`);
  }
  console.log(`verify-sitelili drive: home OK — evidence in ${evidenceDir}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log("Usage: node drive.mjs --feature home [--state state.json]");
    process.exit(0);
  }
  const statePath = resolveStatePath(args.state);
  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  assertLocal(state.baseUrl);
  const evidenceDir = state.evidenceDir;
  fs.mkdirSync(evidenceDir, { recursive: true });

  if (args.feature !== "home") {
    fail(`this helper implements --feature home. Drive other features with the recipes in features/*.md (curl + Playwright against ${state.baseUrl}).`);
  }
  await driveHome({ baseUrl: state.baseUrl.replace(/\/$/, ""), evidenceDir });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
