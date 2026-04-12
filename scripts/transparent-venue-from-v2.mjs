/**
 * One-shot: white / flat background → RGBA for `venue-illustration-v2.png`,
 * then replace `venue-illustration.png` and remove the v2 source.
 *
 *   node scripts/transparent-venue-from-v2.mjs [tolerance]
 *
 * Tolerance defaults to 38 (same as other light `invite` assets). Increase if
 * off-white fringes remain; decrease if artwork near the corners erodes.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const input = path.join(root, 'public/assets/invite/venue-illustration-v2.png');
const output = path.join(root, 'public/assets/invite/venue-illustration.png');

const tolerance = Number(process.argv[2]) || 38;

function distSq(a, b) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return dr * dr + dg * dg + db * db;
}

function getRgb(buf, w, x, y) {
  const i = (y * w + x) * 3;
  return [buf[i], buf[i + 1], buf[i + 2]];
}

async function main() {
  if (!fs.existsSync(input)) {
    console.error('Missing:', input);
    process.exit(1);
  }

  const { data, info } = await sharp(input)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const rgb = data;
  const tolSq = tolerance * tolerance;

  const corners = [
    getRgb(rgb, w, 0, 0),
    getRgb(rgb, w, w - 1, 0),
    getRgb(rgb, w, 0, h - 1),
    getRgb(rgb, w, w - 1, h - 1),
  ];
  const bg = corners
    .reduce((acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]], [0, 0, 0])
    .map((v) => Math.round(v / 4));

  const out = Buffer.alloc(w * h * 4);
  for (let p = 0, si = 0, di = 0; p < w * h; p++, si += 3, di += 4) {
    const c = [rgb[si], rgb[si + 1], rgb[si + 2]];
    const isBg = distSq(c, bg) <= tolSq;
    out[di] = rgb[si];
    out[di + 1] = rgb[si + 1];
    out[di + 2] = rgb[si + 2];
    out[di + 3] = isBg ? 0 : 255;
  }

  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(output);

  await fs.promises.unlink(input);

  console.log('Wrote', output, { w, h, tolerance, bg, removed: path.relative(root, input) });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
