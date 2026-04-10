import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const INPUT_SVG = path.join(PUBLIC_DIR, "favicon.svg");

async function writePng(outName, size) {
  const outPath = path.join(PUBLIC_DIR, outName);
  const buf = await fs.readFile(INPUT_SVG);

  // Use a transparent canvas; SVG already has transparent background.
  await sharp(buf, { density: 512 })
    .resize(size, size, { fit: "contain" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outPath);
}

await fs.mkdir(PUBLIC_DIR, { recursive: true });

await Promise.all([
  writePng("favicon-16x16.png", 16),
  writePng("favicon-32x32.png", 32),
  writePng("favicon-48x48.png", 48),
  writePng("apple-touch-icon.png", 180),
  writePng("android-chrome-192x192.png", 192),
  writePng("android-chrome-512x512.png", 512)
]);

console.log("Generated favicons in public/ from public/favicon.svg");
