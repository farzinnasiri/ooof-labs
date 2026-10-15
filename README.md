# Ooof Labs

A compact consultancy site for companies becoming AI native. Static HTML and CSS, with a small JavaScript workflow selector. Built with Vite. No analytics, cookies, form backend, or external font/image requests.

## Local development

Use Node.js 24, or another supported version at least 22.12.

```sh
npm ci
npm run dev
```

Open http://localhost:5173/.

```sh
npm run check
npm run lint
npm test
npm run build
npm run preview
```

The production output is `dist/`. Fonts and images are served from the same deployment.

## Deployment

GitHub: https://github.com/farzinnasiri/ooof-labs

Vercel project: `oooflabs`, under `farzinnasiris-projects`. Production: https://oooflabs.vercel.app. Vercel uses `main` for production, `npm ci` to install, `npm run build` to build, and `dist` as output. Project settings are also recorded in `vercel.json`.

The parent approved this revision for release after reviewing the rendered product. Current and historical reviews are recorded separately in `CRITIQUE.md`. The production site is public and serves its fonts and images without authentication. GitHub `main` is connected to Vercel production; pushes to `main` deploy automatically.

## Team and content

- [Farzin Nasiri](https://www.linkedin.com/in/farzin-nasiri/)
- [Alireza Kebriaei](https://www.linkedin.com/in/alireza-kebriaei/)
- [Yazdan Zandiyevakili](https://www.linkedin.com/in/yazdanzv/)

The names, links, and page copy are in `index.html`. Workflow examples are in `src/main.js`; they are illustrative, not client case studies. `PRODUCT.md` records product facts, `DESIGN.md` records the selected identity, and `DIRECTION.md` records the exploration.

## Assets

The current corrected AI-assisted triptych is `public/images/founders-studio-v2.webp`. CSS shows precisely one third per founder, in the order Farzin, Alireza, Yazdan. The exact generation prompt and approval mapping are in `PORTRAITS.md` and the WebP provenance sidecar. The corrected PNG master is kept locally in ignored `assets/source/`; private reference photographs are excluded.

The social artwork is authored in `docs/og.html` and exported to `public/og.png` at 1200×630. Font licenses are in `public/licenses/`. The three original direction renders remain in `docs/exploration/` for local inspection and do not enter the production build. Technical screenshots and local research stay outside version control.

## Current design

The mineral/petrol/copper light palette and petrol/mist/apricot dark palette follow the visitor's local clock by default. Auto is light from 07:00 to 19:00, dark otherwise. `public/theme.js` runs before the stylesheet, honors a saved Auto/Light/Dark choice, and handles blocked storage. It refreshes at the next clock boundary and when a tab regains focus. `tests/theme.test.mjs` checks the clock boundaries, overrides, long-open tabs and storage failures.

The page has two screen-sized chapters with natural mobile expansion. The original two-stroke f draws once in 1320ms; native scroll progress coordinates at most 16px of movement between chapters. A photograph and its solid frame share one fixed mask and move together. There is no idle loop or pause control. Hidden/offscreen draw pause and a settled reduced-motion state are handled in `src/main.js`. Founder roles, education and cities use user-confirmed facts. No CSS mirror is applied to the corrected image.
