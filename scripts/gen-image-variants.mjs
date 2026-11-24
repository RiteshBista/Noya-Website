// Generates WebP width variants into public/images/w/ and writes the
// manifest src/data/imageVariants.ts. Originals are never modified.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Run from the repo root after `npm i --no-save sharp@0.33` (not a project
// dependency): `node scripts/gen-image-variants.mjs`.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = `${ROOT}/public/images/w`;
fs.mkdirSync(OUT, { recursive: true });

const PHOTO_WIDTHS = [480, 800, 1200, 1600, 2400];
const LOGO_WIDTHS = [240, 480, 960];

// [source file, stem, kind]
const jobs = [];
for (const f of fs.readdirSync(`${ROOT}/public/images`)) {
  if (!/\.jpe?g$/i.test(f) || f.endsWith("-poster.jpg")) continue; // video posters are used as-is
  jobs.push([`${ROOT}/public/images/${f}`, f.replace(/\.jpe?g$/i, ""), "photo"]);
}
jobs.push([`${ROOT}/public/images/noya_logo.png`, "noya_logo", "logo"]);
jobs.push([`${ROOT}/public/images/noya-logo.png`, "noya-logo", "logo"]);
// Bundled (Vite-imported) assets that are large enough to matter.
for (const f of ["about-hero-facade.jpg", "restoration-brick-rubble.jpg"]) jobs.push([`${ROOT}/src/assets/${f}`, f.replace(/\.jpe?g$/i, ""), "photo"]);
for (const f of ["beirut_logo.jpg", "ameya_logo.jpg"]) jobs.push([`${ROOT}/src/assets/${f}`, f.replace(/\.jpe?g$/i, ""), "mark"]);

const manifest = {};
let inBytes = 0, outBytes = 0;
for (const [src, stem, kind] of jobs) {
  const meta = await sharp(src).rotate().metadata();
  const W = meta.orientation && meta.orientation >= 5 ? meta.height : meta.width;
  const H = meta.orientation && meta.orientation >= 5 ? meta.width : meta.height;
  const list = kind === "logo" ? LOGO_WIDTHS : kind === "mark" ? [240, 480] : PHOTO_WIDTHS;
  let widths = list.filter((w) => w < W);
  // Include the native width as the top step when it's meaningfully larger than the last step.
  if (W <= list.at(-1) && (!widths.length || W - widths.at(-1) > 120)) widths.push(W);
  if (!widths.length) continue;
  // Where the served JPEG is a lighter re-encode of a camera master kept at
  // the same size in media-originals/, encode the WebPs from the master.
  // media-originals/ is Git LFS: in a checkout without the LFS objects (or
  // without the folder at all) the master is a small text pointer or absent,
  // so fall back to the served file rather than fail.
  let variantSrc = src;
  const master = `${ROOT}/media-originals/photos/${stem}-original.jpg`;
  if (kind === "photo" && fs.existsSync(master)) {
    const head = Buffer.alloc(40);
    const fd = fs.openSync(master, "r");
    fs.readSync(fd, head, 0, 40, 0);
    fs.closeSync(fd);
    if (head.toString("latin1").startsWith("version https://git-lfs")) {
      console.warn(`${stem}: master is an un-pulled Git LFS pointer (run \`git lfs pull\`); using the served file`);
    } else {
      try {
        const m = await sharp(master).rotate().metadata();
        if (m.width === meta.width && m.height === meta.height) variantSrc = master;
      } catch (e) {
        console.warn(`${stem}: master unreadable (${e.message}); using the served file`);
      }
    }
  }
  for (const w of widths) {
    const file = `${OUT}/${stem}-${w}.webp`;
    let p = sharp(variantSrc).rotate().resize({ width: w, withoutEnlargement: true });
    p = kind === "photo" ? p.webp({ quality: 80, effort: 5 }) : p.webp({ quality: 90, alphaQuality: 100, effort: 5 });
    await p.toFile(file);
    outBytes += fs.statSync(file).size;
  }
  inBytes += fs.statSync(src).size;
  manifest[stem] = { w: widths, ar: +(W / H).toFixed(4) };
  console.log(stem.padEnd(26), `${W}x${H}`, (fs.statSync(src).size / 1024 | 0) + "KB ->", widths.map((w) => `${w}:${(fs.statSync(`${OUT}/${stem}-${w}.webp`).size / 1024 | 0)}KB`).join(" "));
}

const ts = `// GENERATED — WebP width variants in /public/images/w/, made from the
// original files (which are left untouched) with sharp: photos at WebP q80,
// logos/marks at q90 with full-quality alpha. Keyed by file stem, so both
// /images/<stem>.jpg and Vite-hashed /assets/<stem>-<hash>.jpg resolve.
// See docs/media-optimization.md for how to regenerate.
export const imageVariants: Record<string, { w: readonly number[]; ar: number }> = ${JSON.stringify(manifest, null, 2).replace(/"(\w[\w-]*)":/g, (m, k) => (/^[a-zA-Z_]\w*$/.test(k) ? `${k}:` : m))};
`;
fs.writeFileSync(`${ROOT}/src/data/imageVariants.ts`, ts);
console.log(`\n${jobs.length} sources, ${Object.keys(manifest).length} with variants; generated ${(outBytes / 1048576).toFixed(1)} MB of variants`);
