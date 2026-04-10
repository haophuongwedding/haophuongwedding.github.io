#!/usr/bin/env node
/**
 * Convert studio JPG/JPEG photos to compressed WebP for the web.
 *
 * - Keeps originals (writes alongside as `.webp`)
 * - Rotates based on EXIF
 * - Resizes to a max width/height (fit: inside)
 *
 * Usage:
 *   node scripts/convert-studio-jpg-to-webp.mjs
 *
 * Options:
 *   DIR=public/assets/my_wedding/wedding  (default)
 *   MAX_WIDTH=2400                       (default 2400)
 *   QUALITY=78                           (default 78)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const relDir = process.env.DIR || 'public/assets/my_wedding/wedding';
const absDir = path.join(repoRoot, relDir);

const maxWidth = Number(process.env.MAX_WIDTH) || 2400;
const quality = Number(process.env.QUALITY) || 78;

const extOk = /\.(jpe?g)$/i;

function fmt(n) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let u = 0;
  let v = n;
  while (v >= 1024 && u < units.length - 1) {
    v /= 1024;
    u += 1;
  }
  return u === 0 ? `${v | 0}${units[u]}` : `${v.toFixed(1)}${units[u]}`;
}

async function convertOne(absIn) {
  const parsed = path.parse(absIn);
  const absOut = path.join(parsed.dir, `${parsed.name}.webp`);

  const before = (await fs.stat(absIn)).size;
  const exists = await fs
    .stat(absOut)
    .then((s) => s.size)
    .catch(() => null);

  // Skip if WebP exists and is newer/equal size? We’ll just skip if it exists.
  if (exists !== null) {
    return { skipped: true, absIn, absOut, before, after: exists };
  }

  const webp = await sharp(absIn)
    .rotate()
    .resize({
      width: maxWidth,
      height: maxWidth,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({
      quality,
      effort: 6,
      smartSubsample: true,
    })
    .toBuffer();

  await fs.writeFile(absOut, webp);
  return { skipped: false, absIn, absOut, before, after: webp.length };
}

async function main() {
  const names = await fs.readdir(absDir);
  const inputs = names.filter((n) => extOk.test(n)).sort((a, b) => a.localeCompare(b));
  if (inputs.length === 0) {
    console.log(`No JPG/JPEG found in ${relDir}`);
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let made = 0;
  let skipped = 0;

  for (const name of inputs) {
    const absIn = path.join(absDir, name);
    const r = await convertOne(absIn);
    totalBefore += r.before;
    totalAfter += r.after;
    if (r.skipped) {
      skipped += 1;
      console.log(`${path.relative(repoRoot, r.absIn)} → ${path.relative(repoRoot, r.absOut)}  skip (exists: ${fmt(r.after)})`);
    } else {
      made += 1;
      const pct = (((r.before - r.after) / r.before) * 100).toFixed(1);
      console.log(`${path.relative(repoRoot, r.absIn)} → ${path.relative(repoRoot, r.absOut)}  ${fmt(r.before)} → ${fmt(r.after)} (−${pct}%)`);
    }
  }

  const pctTotal = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
  console.log(
    `Done. Converted ${made} file(s), skipped ${skipped}. total ${fmt(totalBefore)} → ${fmt(totalAfter)} (−${pctTotal}%). MAX_WIDTH=${maxWidth} QUALITY=${quality}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

