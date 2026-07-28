/**
 * Optimizes raw app screenshots into the web assets the project cards embed.
 *
 * Source PNGs live in scripts/shots-src/ (captured from the live apps).
 * Output goes to public/shots/ as WebP at a fixed 1280x800 crop so every card
 * shares one aspect ratio and the <img> can carry explicit dimensions.
 *
 * Run: node scripts/optimize-shots.mjs
 */
import { mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'scripts', 'shots-src');
const outDir = join(root, 'public', 'shots');

// Max width for a card screenshot. Height is derived from each source's own
// proportions rather than forced to a shared ratio — cropping every shot to
// 16:10 cut the bottom off the taller ones, losing the part that proves the
// app works. Cards read the real dimensions back out and set width/height on
// the <img>, so varying ratios still cost no layout shift.
const W = 1280;
const MAX_H = 1100;

/**
 * Per-source framing.
 *
 * `trim` auto-detects the content bounding box and drops the uniform
 * background around it — needed for apps that centre a narrow column in a wide
 * viewport, where the empty gutters would otherwise dominate the thumbnail.
 */
const FRAME = {
  'business-inventory': {},
  // Streamlit centres a ~1450px column in a 2560px viewport.
  'ph-tax-calculator': { trim: true },
};

mkdirSync(outDir, { recursive: true });

if (!existsSync(srcDir)) {
  console.error(`No source directory at ${srcDir}`);
  process.exit(1);
}

const files = readdirSync(srcDir).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
if (!files.length) {
  console.error(`No source images in ${srcDir}`);
  process.exit(1);
}

for (const file of files) {
  const { name } = parse(file);
  const src = join(srcDir, file);
  const meta = await sharp(src).metadata();

  const out = join(outDir, `${name}.webp`);
  const { trim = false } = FRAME[name] ?? {};

  let input = src;
  let trimNote = '';
  if (trim) {
    const { data, info } = await sharp(src)
      .trim({ threshold: 12 })
      .toBuffer({ resolveWithObject: true });
    trimNote = `trimmed ${meta.width}x${meta.height}->${info.width}x${info.height}, `;
    input = data;
  }

  // `inside` preserves aspect ratio and never enlarges past the source.
  await sharp(input)
    .resize(W, MAX_H, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(out);

  const outMeta = await sharp(out).metadata();
  const { size } = statSync(out);
  console.log(
    `${file} -> shots/${name}.webp ` +
      `(${outMeta.width}x${outMeta.height}, ${trimNote}${(size / 1024).toFixed(0)} KB)`
  );
  console.log(`    data: width: ${outMeta.width}, height: ${outMeta.height},`);
}
