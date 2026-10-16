# ooof labs brand kit

The primary logo is **ooof labs**. The standalone wordmark is **ooof**, always three o's and one lowercase f. The square **of** monogram is a compact abbreviation for favicons and app attribution, not an alternate spelling.

## Start here

- Use `svg/ooof-labs-colour.svg` on light backgrounds.
- Use `svg/ooof-labs-white.svg` on dark or photographic backgrounds.
- Use `svg/ooof-labs-night.svg` on deep petrol backgrounds.
- Use `svg/ooof-labs-black.svg` for one-colour black reproduction.
- Use `svg/ooof-app-petrol.svg` for a square app icon. The PNGs include 180px for Apple touch icons, 192px and 512px for web apps, and 1024px for large application artwork.
- Use the matching `ooof-wordmark-*` asset when the context already identifies the lab.
- Open `guide.html` for the visual guide. All masters are font-independent vector paths.

## Construction

The ooof lettering is custom-drawn, not typed in a commercial font. Never recreate it by typing the name. Bricolage Grotesque is the website's headline face, not the logo font.

The construction unit is **u = 14 master units**, the straight wall thickness. Each o is 100 × 100 units, with a 72 × 72 counter. The corner zones are 46 units outside and 32 inside, with custom cubic curves rather than perfect circles. All three o's use the same outline. Their origins are x = 0, 104, 208, giving a 4-unit optical gap. The f crossbar starts at x = 312, also 4 units after the third o. Its stem and crossbar are 14 units thick. Its shoulder reaches y = 7, 17 units above the o tops at y = 24. All letters end at baseline y = 124. The wordmark ink is 394 × 117 units.

The labs suffix is **Instrument Sans Medium, weight 500**, set at a 48-unit em with 1-unit extra tracking. Its origin is x = 422 and baseline y = 123: a 28-unit gap after the f and a 1-unit optical baseline lift. Its contours are included as paths. The original font is SIL Open Font License 1.1; the license is included.

## Space and size

Keep **2u = 28 units** clear around the visible mark. The wordmark and full-logo files include this space; don't crop it out. The square monogram has its own fixed padding. Scale everything proportionally. These are ratios, not fixed centimetres.

Minimum asset widths, including clear space:

| Asset | Digital | Print |
| --- | --- | --- |
| ooof labs | 140 CSS px | 35 mm |
| ooof | 80 CSS px | 20 mm |
| of monogram | 24 CSS px | 6 mm |
| Opaque favicon | 16 CSS px | Not intended for print |

For a 140 CSS px logo on a 2× display, use a PNG at least 280px wide, or use SVG. The PNG number is the **canvas width**, not the height; wordmarks stay proportional. PNGs and SVGs use sRGB. Print minimums are design specifications, not a physical press proof; convert to your printer's colour profile and proof copper before production.

## Colour

| Name | Hex | Use |
| --- | --- | --- |
| Petrol | #153f42 | Primary ink and app background |
| Copper | #b24730 | Middle o on light backgrounds |
| Mineral | #edf1ef | Light background |
| Night | #11282b | Dark background |
| Mist | #eef4ef | Night wordmark |
| Apricot | #f0a67d | Middle o on dark backgrounds |

The single copper o is a signature accent. Keep its position fixed. White and black versions are genuinely #ffffff and #000000. Transparent PNGs keep the counters and surrounding canvas transparent; the three `ooof-app-*` variants are deliberately opaque. App icons have square corners so the platform can apply its own mask; the browser favicon has rounded corners.

Do not stretch, rotate, add shadows, outline the letters, recolour individual letters arbitrarily, put photos inside the distributable logo, or use a low-contrast variant. On a busy photo, provide a plain backing or enough quiet space for the entire mark.

## Website motion

The large hero is an expressive application of the identity. Three o frames settle in sequence, their founder portraits open inside, and the f draws in two strokes. After the 1.4-second entrance, a warm highlight travels around the upper O contours and joins them to the f in an eight-second loop. The photographs remain still during the loop. A small motion control beside the theme selector pauses or resumes it; there is no replay button. Finite and ambient animations pause offscreen or when the tab is hidden. Reduced motion shows the complete, still identity.

The portrait layer extends under the solid letter frame and clips only to its outer silhouette. Do not clip it to the counter edge: two independently antialiased edges expose a pale seam at rest. Hover and keyboard focus move the photograph and frame together. The connecting highlight recedes during that interaction. Native scrolling moves the entire wordmark together.

## Rebuilding

In the website repository, run `npm ci` and `npm run brand`. The exporter uses `@resvg/resvg-js` and the system `zip` command. `scripts/brand-geometry.mjs` is the geometry source; `scripts/labs-outline.json` records the suffix outlines and type settings. The generator also updates the site header, hero letter outlines, favicon, and Apple touch icon from those masters. `manifest.json` lists exact PNG dimensions. Website integration needs no rasterizer or font dependency at runtime.
