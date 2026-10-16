import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import { Resvg } from "@resvg/resvg-js";
import { wordmark, monogram, oPath, fPath } from "./brand-geometry.mjs";
import { brandGuide } from "./brand-guide.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "public/brand");
const labs = JSON.parse(
  readFileSync(resolve(root, "scripts/labs-outline.json"), "utf8"),
);
for (const dir of ["svg", "png", "licenses"])
  mkdirSync(`${out}/${dir}`, { recursive: true });
const variants = {
  petrol: ["#153f42", "#153f42"],
  white: ["#ffffff", "#ffffff"],
  black: ["#000000", "#000000"],
  colour: ["#153f42", "#b24730"],
  night: ["#eef4ef", "#f0a67d"],
};
const assets = [];
const font = readFileSync(
  resolve(
    root,
    "node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2",
  ),
).toString("base64");
writeFileSync(`${out}/guide.html`, brandGuide(labs.path, font));
function svg(title, viewBox, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-labelledby="title"><title id="title">${title}</title>${body}</svg>\n`;
}
function exportAsset(name, source, sizes, usage) {
  writeFileSync(`${out}/svg/${name}.svg`, source);
  const png = sizes.map((width) => {
    const renderer = new Resvg(source, {
      fitTo: { mode: "width", value: width },
    });
    const rendered = renderer.render();
    const file = `png/${name}-${width}.png`;
    writeFileSync(`${out}/${file}`, rendered.asPng());
    return { file, width: rendered.width, height: rendered.height };
  });
  assets.push({ name, svg: `svg/${name}.svg`, png, usage });
}
for (const [name, [ink, accent]] of Object.entries(variants)) {
  exportAsset(
    `ooof-wordmark-${name}`,
    svg("ooof", "-28 -21 450 173", wordmark(ink, accent)),
    [256, 512, 1024, 2048],
    "Standalone wordmark. Transparent, clear space included.",
  );
  exportAsset(
    `ooof-labs-${name}`,
    svg(
      "ooof labs",
      "-28 -21 573 173",
      wordmark(ink, accent) + `<path fill="${ink}" d="${labs.path}"/>`,
    ),
    [256, 512, 1024, 2048],
    "Primary identity. All lettering outlined; no fonts needed.",
  );
  exportAsset(
    `ooof-icon-${name}`,
    svg("ooof labs monogram", "-35 -62.5 256 256", monogram(ink, accent)),
    [32, 64, 128, 256, 512, 1024],
    "Compact of monogram. Transparent square; for constrained app attribution.",
  );
}
for (const [name, background, ink, accent] of [
  ["petrol", "#153f42", "#ffffff", "#ffffff"],
  ["mineral", "#edf1ef", "#153f42", "#b24730"],
  ["copper", "#b24730", "#ffffff", "#ffffff"],
]) {
  exportAsset(
    `ooof-app-${name}`,
    svg(
      "ooof labs",
      "0 0 256 256",
      `<path fill="${background}" d="M0 0H256V256H0Z"/><g transform="translate(35 62.5)">${monogram(ink, accent)}</g>`,
    ),
    [16, 32, 48, 180, 192, 512, 1024],
    "Opaque square app icon. Platform applies its own corner mask.",
  );
}
copyFileSync(
  `${out}/png/ooof-app-petrol-180.png`,
  resolve(root, "public/apple-touch-icon.png"),
);
writeFileSync(
  resolve(root, "public/favicon.svg"),
  svg(
    "ooof labs",
    "0 0 256 256",
    `<rect width="256" height="256" rx="54" fill="#153f42"/><g transform="translate(35 62.5)">${monogram("#ffffff")}</g>`,
  ),
);
copyFileSync(
  resolve(root, "public/licenses/instrument-sans.txt"),
  `${out}/licenses/instrument-sans.txt`,
);
// Keep the website's geometry identical to the distributed vector masters.
const home = resolve(root, "index.html");
let html = readFileSync(home, "utf8");
const header = `<svg class="brand-mark" viewBox="0 0 517 124" aria-hidden="true"><defs><clipPath id="portrait-silhouette" clipPathUnits="objectBoundingBox"><path d="M.46 0H.54C.83 0 1 .17 1 .46V.54C1 .83 .83 1 .54 1H.46C.17 1 0 .83 0 .54V.46C0 .17 .17 0 .46 0Z"/></clipPath></defs>${wordmark("currentColor", "var(--accent)")}<path fill="currentColor" d="${labs.path}"/></svg>`;
const frame = `<svg class="portrait-frame" viewBox="0 24 100 100" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="${oPath}"/></svg>`;
const f = `<svg viewBox="312 24 82 100" aria-hidden="true"><defs><clipPath id="brand-f-clip"><path d="${fPath}"/></clipPath></defs><g clip-path="url(#brand-f-clip)" fill="none" stroke="currentColor" stroke-width="18"><path class="f-stem" pathLength="1" d="M334 124V48C334 25.5 346.5 14 368 14H394"/><path class="f-bar" pathLength="1" d="M312 64H388"/></g></svg>`;
for (const [key, value] of [
  ["header", header],
  ["frame", frame],
  ["f", f],
]) {
  const marker = new RegExp(
    `<!-- brand:${key} -->[\\s\\S]*?<!-- /brand:${key} -->`,
    "g",
  );
  if (!marker.test(html))
    throw new Error(`Missing brand:${key} marker in index.html`);
  html = html.replace(
    marker,
    `<!-- brand:${key} -->${value}<!-- /brand:${key} -->`,
  );
}
writeFileSync(home, html);
execFileSync(
  resolve(root, "node_modules/.bin/prettier"),
  ["--write", "index.html"],
  { cwd: root, stdio: "ignore" },
);
writeFileSync(
  `${out}/manifest.json`,
  JSON.stringify(
    {
      version: 1,
      lettering:
        "Custom Ooof lettering; labs: Instrument Sans Medium 500, outlined",
      assets,
    },
    null,
    2,
  ) + "\n",
);
// The archive includes only the distributable kit, never itself or website files.
execFileSync(
  "zip",
  [
    "-q",
    "-r",
    "-FS",
    "ooof-labs-brand-kit.zip",
    "svg",
    "png",
    "licenses",
    "manifest.json",
    "README.md",
    "guide.html",
  ],
  { cwd: out },
);
console.log(
  `Exported ${assets.length} SVG masters and ${assets.reduce((n, a) => n + a.png.length, 0)} PNGs to public/brand; archive ready.`,
);
