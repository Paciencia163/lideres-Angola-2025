// Gera os logótipos do site, os ícones e a imagem Open Graph (1200x630)
// a partir do logótipo oficial vetorizado (PNG transparente 3000x1362).
// Uso: node scripts/generate-brand-assets.mjs
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = (f) => path.join(root, "public", f);
const asset = (f) => path.join(root, "src", "assets", "brand", f);
const SOURCE = path.join(root, "src", "components", "Logotipos", "official", "Logo líderes Angola vetor.png");

const GOLD = "#C9A961";
const INK = "#0A0A0A";
const IVORY = "#F5F0E6";

// Recortes no ficheiro original (px): sem a linha "Gala de Premiação", e o "L" de LÍDERES.
const COMPACT = { left: 0, top: 175, width: 3000, height: 1160 };
const LETTER_L = { left: 150, top: 340, width: 493, height: 670 };

const crop = async (region) => sharp(await sharp(SOURCE).extract(region).toBuffer()).trim({ threshold: 1 }).toBuffer();

// Logótipos usados no site
await sharp(SOURCE).trim({ threshold: 1 }).resize({ width: 1600 }).webp({ quality: 88, alphaQuality: 100 }).toFile(asset("logo-gala.webp"));
await sharp(await crop(COMPACT)).resize({ width: 900 }).webp({ quality: 88, alphaQuality: 100 }).toFile(asset("logo.webp"));

/** Mantém apenas a maior forma opaca (descarta pedaços das letras vizinhas que caem no recorte). */
const largestShape = async (region) => {
  const { data, info } = await sharp(SOURCE).extract(region).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const label = new Int32Array(w * h);
  let best = 0, bestSize = 0, next = 0;
  for (let p = 0; p < w * h; p++) {
    if (label[p] || data[p * 4 + 3] <= 8) continue;
    const id = ++next, stack = [p];
    let size = 0;
    label[p] = id;
    while (stack.length) {
      const q = stack.pop(), x = q % w, y = (q / w) | 0;
      size++;
      for (const n of [x > 0 && q - 1, x < w - 1 && q + 1, y > 0 && q - w, y < h - 1 && q + w]) {
        if (n !== false && !label[n] && data[n * 4 + 3] > 8) { label[n] = id; stack.push(n); }
      }
    }
    if (size > bestSize) { best = id; bestSize = size; }
  }
  for (let p = 0; p < w * h; p++) if (label[p] !== best) data[p * 4 + 3] = 0;
  return sharp(await sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer()).trim({ threshold: 1 }).toBuffer();
};

// Ícone: "L" dourado sobre fundo preto
const letter = await largestShape(LETTER_L);
const icon = async (size, rounded = true) => {
  const inner = Math.round(size * 0.68);
  const mark = await sharp(letter).resize({ width: inner, height: inner, fit: "inside" }).toBuffer();
  const r = rounded ? size * 0.2 : 0;
  const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${INK}"/></svg>`;
  return sharp(Buffer.from(bg)).composite([{ input: mark, gravity: "center" }]).png({ compressionLevel: 9 }).toBuffer();
};

// Imagem Open Graph: logótipo completo sobre fundo escuro com brilho dourado
const ogBg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="75%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#121212"/>
      <stop offset="100%" stop-color="${INK}"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" x2="1">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${GOLD}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="28" y="28" width="1144" height="574" fill="none" stroke="${GOLD}" stroke-opacity="0.35"/>
  <rect x="380" y="476" width="440" height="1" fill="url(#rule)"/>
  <text x="600" y="530" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="26" fill="${IVORY}" fill-opacity="0.85">Reconhecemos hoje, inspiramos o amanhã · 17 de Dezembro de 2026 · EPIC SANA Luanda</text>
</svg>`;
const ogLogo = await sharp(SOURCE).trim({ threshold: 1 }).resize({ width: 820 }).toBuffer();
const { height: ogLogoH } = await sharp(ogLogo).metadata();
const og = await sharp(Buffer.from(ogBg))
  .composite([{ input: ogLogo, left: 190, top: Math.round(260 - ogLogoH / 2) }])
  .png({ compressionLevel: 9 })
  .toBuffer();

/** Contentor ICO com PNGs embebidos (suportado por todos os navegadores modernos). */
const toIco = (pngs) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const entries = pngs.map(({ size, buf }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
};

await writeFile(pub("og-image.png"), og);
await writeFile(pub("apple-touch-icon.png"), await icon(180, false));
await writeFile(pub("icon-192.png"), await icon(192));
await writeFile(pub("icon-512.png"), await icon(512));
await writeFile(pub("favicon.png"), await icon(64));
const sizes = [16, 32, 48];
await writeFile(pub("favicon.ico"), toIco(await Promise.all(sizes.map(async (size) => ({ size, buf: await icon(size) })))));
// SVG com o PNG embebido, para manter as referências existentes a /favicon.svg
const svgPng = (await icon(128)).toString("base64");
await writeFile(
  pub("favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><image width="128" height="128" href="data:image/png;base64,${svgPng}"/></svg>\n`,
);

console.log("Imagens geradas em /public e src/assets/brand");
