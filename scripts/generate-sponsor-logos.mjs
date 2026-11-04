// Normaliza os logótipos dos patrocinadores e parceiros (Logotipos/*) para a parede de marcas:
// remove o fundo, apara as margens, iguala o peso visual (área) e converte tudo numa só cor.
// Uso: node scripts/generate-sponsor-logos.mjs
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = (f) => path.join(root, "src", "components", "Logotipos", f);
const outDir = path.join(root, "src", "assets", "sponsors");

const COLOR = [0xf5, 0xf0, 0xe6]; // marfim do site
const CANVAS = { width: 640, height: 360 };
const TARGET_AREA = 0.3 * CANVAS.width * CANVAS.height; // área da caixa do logótipo
const MAX = { width: 0.88 * CANVAS.width, height: 0.78 * CANVAS.height };

/**
 * crop: recorte (px no original) para excluir contactos, redes sociais, etc.
 * bg: pontos [x, y] (no recorte) cujas cores também são fundo, além do branco.
 * dropEdge: descarta as formas que tocam a borda do recorte (restos do círculo do autocolante).
 * minShape: descarta formas soltas com menos píxeis do que este valor (ex.: contornos pontilhados).
 */
const logos = [
  { id: "lua-deira", file: "realização/Gemini_Generated_Image_o73ucvo73ucvo73u.jpg" },
  { id: "jldi", file: "realização/Gemini_Generated_Image_wpd002wpd002wpd0.jpg" },
  { id: "kanka", file: "patrocinador/Gemini_Generated_Image_7thxjc7thxjc7thx.jpg" },
  { id: "grupo-ej", file: "patrocinador/Gemini_Generated_Image_rlrzv0rlrzv0rlrz.jpg" },
  { id: "catmanuel", file: "patrocinador/Gemini_Generated_Image_s965cks965cks965.jpg" },
  { id: "africore", file: "Pareceiros/Gemini_Generated_Image_1d5wwi1d5wwi1d5w.jpg" },
  { id: "aceld-vision", file: "Pareceiros/Gemini_Generated_Image_mipcz7mipcz7mipc.jpg" },
  { id: "yos-store", file: "Pareceiros/Gemini_Generated_Image_pwlpgxpwlpgxpwlp.jpg" },
  // Só o emblema central (sem contactos e redes sociais)
  { id: "caseirinhos-doces", file: "Pareceiros/Gemini_Generated_Image_rpwzhrpwzhrpwzhr.jpg", crop: { left: 350, top: 408, width: 220, height: 177 }, dropEdge: true, minShape: 90 },
  // Sem o marcador de localização solto por baixo
  { id: "vuss-design", file: "Pareceiros/Gemini_Generated_Image_uwbd5tuwbd5tuwbd.jpg", crop: { left: 0, top: 450, width: 900, height: 380 } },
  // Só a marca dentro do círculo (sem contactos); o fundo escuro do círculo também é removido
  { id: "agnela-sweet", file: "Pareceiros/Gemini_Generated_Image_zdypo9zdypo9zdyp.jpg", crop: { left: 205, top: 245, width: 545, height: 370 }, bg: [[20, 340]], dropEdge: true, minShape: 60 },
  { id: "edmundo-abel", file: "Pareceiros/Gemini_Generated_Image_zdzangzdzangzdza.jpg" },
  { id: "dna-company-hub", file: "Pareceiros/WhatsApp Image 2026-11-03 at 12.33.52.jpeg" },
  { id: "inapem", file: "apoio institucional/Gemini_Generated_Image_dvm2svdvm2svdvm2.jpg" },
  { id: "platinaline", file: "apoio de midia/Gemini_Generated_Image_f2638uf2638uf263.jpg" },
  { id: "radar", file: "apoio de midia/Gemini_Generated_Image_ihjck2ihjck2ihjc.jpg" },
  { id: "canal-7", file: "apoio de midia/Gemini_Generated_Image_is8bh0is8bh0is8b.jpg" },
  { id: "nova-tela", file: "apoio de midia/Gemini_Generated_Image_j3nmbvj3nmbvj3nm.jpg" },
  { id: "bateu-bwe", file: "apoio de midia/Gemini_Generated_Image_u7aoblu7aoblu7ao.jpg" },
  { id: "topkwanza", file: "apoio de midia/WhatsApp Image 2026-11-03 at 12.33.49.jpeg" },
];

// Distância de cor (RGB) a partir da qual um píxel deixa de ser fundo / passa a ser totalmente opaco
const SOFT = 45;
const SOLID = 120;

/** Apaga (alpha = 0) as formas opacas com menos de `min` píxeis. */
const removeSmallShapes = (rgba, w, h, min) => {
  const label = new Int32Array(w * h);
  let next = 0;
  for (let p = 0; p < w * h; p++) {
    if (label[p] || rgba[p * 4 + 3] <= 20) continue;
    const id = ++next, stack = [p], members = [];
    label[p] = id;
    while (stack.length) {
      const q = stack.pop(), x = q % w, y = (q / w) | 0;
      members.push(q);
      for (const n of [x > 0 && q - 1, x < w - 1 && q + 1, y > 0 && q - w, y < h - 1 && q + w]) {
        if (n !== false && !label[n] && rgba[n * 4 + 3] > 20) { label[n] = id; stack.push(n); }
      }
    }
    if (members.length < min) for (const q of members) rgba[q * 4 + 3] = 0;
  }
};

/** Apaga (alpha = 0) as formas opacas ligadas à borda da imagem. */
const removeEdgeShapes = (rgba, w, h) => {
  const seen = new Uint8Array(w * h);
  const stack = [];
  const push = (p) => {
    if (!seen[p] && rgba[p * 4 + 3] > 20) { seen[p] = 1; stack.push(p); }
  };
  for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1); }
  while (stack.length) {
    const q = stack.pop(), x = q % w, y = (q / w) | 0;
    rgba[q * 4 + 3] = 0;
    if (x > 0) push(q - 1);
    if (x < w - 1) push(q + 1);
    if (y > 0) push(q - w);
    if (y < h - 1) push(q + w);
  }
};

const silhouette = async ({ file, crop, bg = [], dropEdge = false, minShape = 0 }) => {
  let img = sharp(src(file)).removeAlpha();
  if (crop) img = sharp(await img.extract(crop).toBuffer());
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const at = ([x, y]) => [data[(y * w + x) * 3], data[(y * w + x) * 3 + 1], data[(y * w + x) * 3 + 2]];
  const backgrounds = [[255, 255, 255], ...bg.map(at)];

  const out = Buffer.alloc(w * h * 4);
  for (let p = 0; p < w * h; p++) {
    const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
    const d = Math.min(...backgrounds.map(([br, bgc, bb]) => Math.hypot(r - br, g - bgc, b - bb)));
    const a = Math.max(0, Math.min(1, (d - SOFT) / (SOLID - SOFT)));
    out[p * 4] = COLOR[0];
    out[p * 4 + 1] = COLOR[1];
    out[p * 4 + 2] = COLOR[2];
    out[p * 4 + 3] = Math.round(a * 255);
  }
  if (dropEdge) removeEdgeShapes(out, w, h);
  if (minShape) removeSmallShapes(out, w, h, minShape);
  return sharp(await sharp(out, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer())
    .trim({ threshold: 10 })
    .toBuffer({ resolveWithObject: true });
};

await mkdir(outDir, { recursive: true });
for (const logo of logos) {
  const { data, info } = await silhouette(logo);
  // Mesmo peso visual: escala pela área da caixa, limitada à largura/altura máximas
  const scale = Math.min(Math.sqrt(TARGET_AREA / (info.width * info.height)), MAX.width / info.width, MAX.height / info.height);
  const width = Math.round(info.width * scale);
  const height = Math.round(info.height * scale);
  const resized = await sharp(data).resize({ width, height }).toBuffer();
  await sharp({ create: { ...CANVAS, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: resized, gravity: "center" }])
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(path.join(outDir, `${logo.id}.webp`));
  console.log(logo.id.padEnd(20), `${info.width}x${info.height}`, "→", `${width}x${height}`);
}
