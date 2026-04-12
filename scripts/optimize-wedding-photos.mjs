#!/usr/bin/env node
/**
 * Resize + compress JPEGs for the web (caps pixel width, strips metadata).
 * Run from repo root: npm run optimize:wedding
 *
 * Defaults: max width 1920px, JPEG quality 82, skip enlarging small files.
 * Configure with env: MAX_WIDTH=2400 QUALITY=80
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dirs = [
  'public/assets/my_wedding/wedding/vertical',
  'public/assets/my_wedding/wedding/horizontal',
  'public/assets/my_wedding/engagement',
].map((d) => path.join(repoRoot, d));

const maxWidth = Number(process.env.MAX_WIDTH) || 1920;
const quality = Number(process.env.QUALITY) || 82;

const extOk = /\.(jpe?g)$/i;

async function optimizeFile(absPath) {
  const buf = await sharp(absPath)
    .rotate()
    .resize({
      width: maxWidth,
      height: maxWidth,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  const before = (await fs.stat(absPath)).size;
  await fs.writeFile(absPath, buf);
  const after = buf.length;
  if (before > after) {
    const pct = (((before - after) / before) * 100).toFixed(1);
    console.log(`${path.relative(repoRoot, absPath)}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (−${pct}%)`);
  } else {
    console.log(`${path.relative(repoRoot, absPath)}  skip (already small or enlarged blocked)`);
  }
}

let count = 0;
for (const dir of dirs) {
  let names;
  try {
    names = await fs.readdir(dir);
  } catch {
    continue;
  }
  for (const name of names) {
    if (!extOk.test(name)) continue;
    await optimizeFile(path.join(dir, name));
    count += 1;
  }
}

console.log(`Done. Processed ${count} JPEG file(s). maxWidth=${maxWidth} quality=${quality}`);
