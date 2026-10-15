# 002 Restore the exact original f and finite draw

- **Status**: DONE
- **Commit**: `0de769a`, with uncommitted changes
- **Baseline**: 2026-10-15 20:59:49 UTC. This is a source snapshot, not a review of later worker edits.
- **Severity**: HIGH
- **Category**: Cohesion and tokens; physicality
- **Estimated scope**: `index.html`, `src/style.css`, one SVG and scoped CSS

## Problem

The user's saved f was replaced, losing its proportions and independently drawable strokes. `/Users/farzin/MyProjects/ooof-labs/index.html:310–315` now reads:

```html
<div class="founder-f" aria-hidden="true">
  <svg viewBox="0 0 190 310" fill="none">
    <g stroke="currentColor" stroke-width="44">
      <path d="M65 288V78q0-56 55-56h46M15 122h135" />
    </g>
  </svg>
</div>
```

There are no current `.f-stem`, `.f-bar` or `draw` definitions. The exact approved source is `/tmp/ooof-user-updates-20261015.patch:33–42`, with motion at patch lines 593–619. Do not infer a new letter from the screenshot and do not apply this patch to unrelated source.

## Target

Restore exactly the following SVG inside the existing `.founder-f`, keeping its theme color inherited:

```html
<svg viewBox="121 8.5 35 43" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="5.6">
    <path class="f-stem" pathLength="1" d="M134 48V18q0-11 13-11h9" />
    <path class="f-bar" pathLength="1" d="M121 24.5h32" />
  </g>
</svg>
```

Restore the original timing and curve exactly. Marketing draw is intentionally longer than a control transition and ends after 1.32 seconds. There is no repeat:

```css
.founder-f svg { width: 100%; height: auto; overflow: visible; }
.f-stem, .f-bar { stroke-dasharray: 1; stroke-dashoffset: 0; }
@media (prefers-reduced-motion: no-preference) {
  .f-stem, .f-bar { animation: draw 700ms var(--ease) both; }
  .f-stem { animation-delay: 360ms; }
  .f-bar { animation-delay: 620ms; }
}
@keyframes draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .f-stem, .f-bar { animation: none; stroke-dashoffset: 0; }
}
```

Keep `--ease: cubic-bezier(0.16, 1, 0.3, 1)` from `src/style.css:39`. Do not replace this deliberately restored curve with a new token. Retain visible overflow: this viewBox intentionally allows the top stroke to extend beyond its bounds. Do not add round caps, merge the paths, normalize their coordinates or use a font glyph.

## Repo conventions to follow

The `.founder-f` already inherits `color:var(--ring)` at `src/style.css:406–415`. Keep the original aspect ratio 35:43. The surrounding grid is layout, not the letter's geometry. The f must remain visible on narrow screens.

## Steps

1. Replace only the current SVG with the exact target SVG. Preserve the current `.founder-f` wrapper, decorative `aria-hidden` status and adjacent founder captions.
2. Add the scoped draw CSS above. Leave photos static; do not restore old portrait hover zoom or old ring entrance motion from the patch.
3. Fit the existing f grid cell by sizing its wrapper rather than stretching the SVG. Its complete visible stroke must be present at mobile and desktop sizes. Do not clip intentional viewBox overflow or alter the path to make it fit. Shared chapter positioning is handled in plan 003.
4. Keep the default settled stroke visible without JavaScript and under reduced motion. Plan 003 is responsible for pausing finite effects when hidden/offscreen and preventing replay after navigation or preference changes.

## Boundaries

Work only on the motion and markup explicitly described. Preserve concurrent user/worker changes. Do not apply the saved patch wholesale. No dependencies, new animation library, palette changes, invented copy, new sections, forced scroll snapping or scroll interception. Keep the mineral/petrol/copper palettes and `public/theme.js` local-time theme plus override. The final product has two chapters, hero/team and work/method/workflow. University information moves under hero portraits and the redundant bottom founder-list component is removed by the implementation worker; these plans do not add another contact chapter. Retain existing LinkedIn destinations.

Source line numbers refer to the stamped snapshot. If worker changes moved a selector, locate the same responsibility by selector, preserve their new content/layout and apply only this plan's motion change. If that responsibility has changed incompatibly, report the conflict rather than replacing their file.

## Verification

- **Mechanical**: Compare SVG paths, viewBox, stroke width, path lengths, delays, duration and curve literally with the snippets above and the saved patch. Each stem/bar must be one distinct path. `rg -n 'f-stem|f-bar|@keyframes draw|stroke-dash' index.html src/style.css` should locate the restored implementation.
- **Feel check**: On first page load at 10% animation playback, the stem starts at 360ms and the bar at 620ms. Both remain fully visible after 1320ms, with no erasing or idle redraw. Check the top curve and crossbar at 360px and desktop width. Under reduced motion the complete f must be visible immediately.
- **Done when**: The original letter shape is restored exactly and its finite draw is recognizable. No pause button, font substitute or recurring f animation exists.
