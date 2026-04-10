/**
 * Crop top/bottom transparent padding from Events "program" PNGs
 * while keeping full width (so layout stays identical).
 *
 * Usage:
 *   node scripts/crop-events-program-padding.mjs
 *   node scripts/crop-events-program-padding.mjs public/assets/events/program-desktop.png
 *
 * Notes:
 * - Detects first/last non-transparent row using alpha threshold.
 * - Writes back to the same file (via temp + rename).
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import os from 'node:os';

const root = path.resolve(import.meta.dirname, '..');
const defaultTargets = [
  'public/assets/events/program-desktop.png',
  'public/assets/events/program-mobile.png',
];

const inputArgs = process.argv.slice(2);
const targets = (inputArgs.length ? inputArgs : defaultTargets).map((p) =>
  path.isAbsolute(p) ? p : path.join(root, p),
);

const ALPHA_THRESHOLD = 8; // 0..255; tolerate near-transparent anti-alias edges

async function cropTopBottomTransparentPadding(absPath) {
  if (!fs.existsSync(absPath)) {
    console.warn('Skip (missing):', absPath);
    return { skipped: true };
  }

  const { data, info } = await sharp(absPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const channels = info.channels;
  const alphaIndex = channels - 1;

  const rowHasInk = (y) => {
    const rowStart = y * w * channels;
    for (let x = 0; x < w; x++) {
      const a = data[rowStart + x * channels + alphaIndex];
      if (a > ALPHA_THRESHOLD) return true;
    }
    return false;
  };

  let top = 0;
  while (top < h && !rowHasInk(top)) top++;

  let bottom = h - 1;
  while (bottom >= 0 && !rowHasInk(bottom)) bottom--;

  // Fully transparent (or threshold too high) — do nothing
  if (top >= bottom) {
    console.warn('Skip (no content detected):', absPath, { w, h, ALPHA_THRESHOLD });
    return { skipped: true, w, h };
  }

  const outHeight = bottom - top + 1;
  const tmpPath = path.join(os.tmpdir(), `crop-events-${path.basename(absPath)}-${Date.now()}.png`);

  await sharp(absPath)
    .extract({ left: 0, top, width: w, height: outHeight })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(tmpPath);

  fs.renameSync(tmpPath, absPath);
  return { skipped: false, w, h, top, bottom, outHeight };
}

async function main() {
  for (const absPath of targets) {
    const result = await cropTopBottomTransparentPadding(absPath);
    if (!result.skipped) {
      console.log('Cropped', absPath, result);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

