/**
 * Generates the static OG image and favicons from inline SVG.
 *
 * Run manually after changing branding: `node scripts/generate-assets.mjs`
 * Output lands in /public and is committed, so the build itself stays dependency-free.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
mkdirSync(publicDir, { recursive: true });

const BG = '#0b0d0f';
const TEXT = '#edeae4';
const MUTED = '#8b9099';
const RULE = '#22262b';
const ACCENT = '#d98e32';

/* ------------------------------------------------------------------ *
 * OG image — 1200x630
 * Mirrors the page's ledger grid: mono field label left, display type right.
 * ------------------------------------------------------------------ */

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>

  <line x1="80" y1="132" x2="1120" y2="132" stroke="${RULE}" stroke-width="1"/>
  <line x1="80" y1="530" x2="1120" y2="530" stroke="${RULE}" stroke-width="1"/>

  <text x="80" y="96" font-family="JetBrains Mono, ui-monospace, monospace" font-size="17" font-weight="500" letter-spacing="2.6" fill="${MUTED}">01</text>
  <text x="132" y="96" font-family="JetBrains Mono, ui-monospace, monospace" font-size="17" font-weight="500" letter-spacing="2.6" fill="${TEXT}">DATA ENGINEER</text>

  <text x="80" y="268" font-family="Instrument Serif, Georgia, serif" font-size="88" fill="${TEXT}"><tspan fill="${MUTED}" font-size="52">Engr.</tspan> Reinhard Mari Ramirez</text>

  <text x="80" y="356" font-family="Instrument Serif, Georgia, serif" font-size="46" fill="${ACCENT}">Data engineer who automates</text>
  <text x="80" y="412" font-family="Instrument Serif, Georgia, serif" font-size="46" fill="${ACCENT}">with AI agents.</text>

  <text x="80" y="466" font-family="DejaVu Sans, Verdana, Helvetica, Arial, sans-serif" font-size="22" fill="${MUTED}">Five years of production ETL and AWS data infrastructure,</text>
  <text x="80" y="498" font-family="DejaVu Sans, Verdana, Helvetica, Arial, sans-serif" font-size="22" fill="${MUTED}">now paired with Claude Code agent tooling.</text>

  <text x="80" y="576" font-family="JetBrains Mono, ui-monospace, monospace" font-size="16" letter-spacing="1.6" fill="${MUTED}">AWS CERTIFIED CLOUD PRACTITIONER</text>
  <text x="1120" y="576" text-anchor="end" font-family="JetBrains Mono, ui-monospace, monospace" font-size="16" letter-spacing="1.6" fill="${MUTED}">GITHUB.COM/REINRMZ</text>
</svg>`;

/* ------------------------------------------------------------------ *
 * Favicon — the ledger mark: an accent rule over the monogram.
 * ------------------------------------------------------------------ */

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="8" fill="${BG}"/>
  <rect x="12" y="14" width="40" height="3" fill="${ACCENT}"/>
  <text x="32" y="48" text-anchor="middle" font-family="JetBrains Mono, ui-monospace, monospace" font-size="26" font-weight="500" letter-spacing="0.5" fill="${TEXT}">R</text>
</svg>`;

async function main() {
  writeFileSync(join(publicDir, 'favicon.svg'), favicon, 'utf8');

  // sharp resolves SVG font-family names through fontconfig, which only sees
  // system-installed faces. Point it at the self-hosted woff2 directory so the
  // OG image uses the same type as the site instead of a generic fallback.
  process.env.FONTCONFIG_PATH = join(root, 'scripts');

  const ogBuf = Buffer.from(og);
  await sharp(ogBuf, { density: 144 }).png({ compressionLevel: 9 }).toFile(join(publicDir, 'og.png'));

  const favBuf = Buffer.from(favicon);
  await sharp(favBuf, { density: 384 }).resize(180, 180).png({ compressionLevel: 9 }).toFile(join(publicDir, 'apple-touch-icon.png'));
  await sharp(favBuf, { density: 384 }).resize(32, 32).png({ compressionLevel: 9 }).toFile(join(publicDir, 'favicon.ico'));

  console.log('Wrote og.png, favicon.svg, favicon.ico, apple-touch-icon.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
