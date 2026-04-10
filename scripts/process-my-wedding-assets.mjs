/**
 * One-shot: flatten `_myown` exports → real RGBA PNGs in the right `public/assets/**` paths.
 * - light: remove background like corner average (white / cream) — counters inside letters included.
 * - dark: remove background like corner average (black) — for white-on-black captions.
 *
 *   node scripts/process-my-wedding-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');

const JOBS = [
  {
    input: 'public/assets/my_wedding/caption-left_myown.png',
    output: 'public/assets/couple/caption-left.png',
    mode: 'dark',
    tolerance: 52,
  },
  {
    input: 'public/assets/my_wedding/caption-right_myown.png',
    output: 'public/assets/couple/caption-right.png',
    mode: 'dark',
    tolerance: 52,
  },
  {
    input: 'public/assets/my_wedding/invitation-divider-myown.png',
    output: 'public/assets/invite/invitation-divider.png',
    mode: 'light',
    tolerance: 38,
    /** Keep flat file for `npm run invite:divider` */
    alsoCopyFlatTo: 'public/assets/invite/invitation-divider-source.png',
  },
  {
    input: 'public/assets/my_wedding/monogram_myown.png',
    output: 'public/assets/invite/monogram.png',
    mode: 'light',
    tolerance: 38,
  },
  {
    input: 'public/assets/my_wedding/program-desktop_myown.png',
    output: 'public/assets/events/program-desktop.png',
    mode: 'light',
    tolerance: 38,
  },
  {
    input: 'public/assets/my_wedding/program-mobile_myown.png',
    output: 'public/assets/events/program-mobile.png',
    mode: 'light',
    tolerance: 38,
  },
  {
    input: 'public/assets/my_wedding/venue-illustration_myown.png',
    output: 'public/assets/invite/venue-illustration.png',
    mode: 'light',
    tolerance: 38,
  },
];

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

async function chromaToPng(absIn, absOut, tolerance) {
  const { data, info } = await sharp(absIn)
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
  const bg = corners.reduce(
    (acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]],
    [0, 0, 0],
  ).map((v) => Math.round(v / 4));

  const out = Buffer.alloc(w * h * 4);
  for (let p = 0, si = 0, di = 0; p < w * h; p++, si += 3, di += 4) {
    const c = [rgb[si], rgb[si + 1], rgb[si + 2]];
    const isBg = distSq(c, bg) <= tolSq;
    out[di] = rgb[si];
    out[di + 1] = rgb[si + 1];
    out[di + 2] = rgb[si + 2];
    out[di + 3] = isBg ? 0 : 255;
  }

  await fs.promises.mkdir(path.dirname(absOut), { recursive: true });
  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(absOut);

  return { w, h, bg };
}

async function main() {
  for (const job of JOBS) {
    const absIn = path.join(root, job.input);
    const absOut = path.join(root, job.output);
    if (!fs.existsSync(absIn)) {
      console.error('Missing input:', absIn);
      process.exit(1);
    }
    const { w, h, bg } = await chromaToPng(absIn, absOut, job.tolerance);
    console.log('OK', job.output, { w, h, bg, mode: job.mode, tol: job.tolerance });

    if (job.alsoCopyFlatTo) {
      const dest = path.join(root, job.alsoCopyFlatTo);
      await fs.promises.copyFile(absIn, dest);
      console.log('   copy flat →', job.alsoCopyFlatTo);
    }
  }

  for (const job of JOBS) {
    const absIn = path.join(root, job.input);
    await fs.promises.unlink(absIn);
    console.log('removed', job.input);
  }

  console.log('Done. Paths in assets.config.ts are unchanged.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
