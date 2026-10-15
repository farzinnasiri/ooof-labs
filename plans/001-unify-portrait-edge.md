# 001 Unify the portrait and frame edge

- **Status**: DONE
- **Commit**: `0de769a`, with uncommitted changes
- **Baseline**: 2026-10-15 20:59:49 UTC. This is a source snapshot, not a review of later worker edits.
- **Severity**: HIGH
- **Category**: Physicality and origin; cohesion
- **Estimated scope**: `index.html`, `src/style.css`, `src/main.js`, localized deletion and portrait geometry

## Problem

The photo and its apparent frame do not share a contour. Current `/Users/farzin/MyProjects/ooof-labs/src/style.css:333–364` contains:

```css
.portrait-ring {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 1;
  padding: 13.5%;
  isolation: isolate;
  background: var(--ring);
  border-radius: 46%;
}
.ring-outline {
  position: absolute;
  inset: 0;
  border: calc(var(--o-size) * 0.135) solid var(--ring);
  border-radius: 46%;
  z-index: 0;
}
.portrait-window {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 43%;
  overflow: hidden;
  background: #a69c8d;
  z-index: 1;
}
```

At `src/style.css:459–485` the extra outline independently rotates by 6deg and scales to 1.025, then rotates to -3deg and scales to 1.01, over an infinite 8s cycle. The photo clip does not follow it. Percentage padding is relative to the actual containing width while border width uses the nominal `--o-size`, which can diverge when stage width is capped. These are two independent edges, not a shared mask. Solid parent underpaint already prevents a simple transparent hole; the reported hairline must not be described as proof that this background is absent. Independent contour movement, radius/width mismatch and antialiasing remain the confirmed structural causes to eliminate. A screenshot cannot distinguish every fractional-pixel contribution.

`index.html:197–199` repeats the extra outline before each window:

```html
<span class="portrait-ring"
  ><span class="ring-outline" aria-hidden="true"></span
  ><span class="portrait-window"
```

## Target

A static, continuous colored frame with one clipped photo opening. No deforming contour, separately animated outline, face rotation, face zoom or photo wobble. Use the actual portrait box as the only sizing reference:

```css
.portrait-ring {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 1;
  padding: 0;
  isolation: isolate;
  background: var(--ring);
  border-radius: 46%;
  overflow: hidden;
}
.founder-ali .portrait-ring { background: var(--ring-alt); }
.portrait-window {
  position: absolute;
  display: block;
  inset: 13.5%;
  width: auto;
  height: auto;
  border-radius: 43%;
  overflow: hidden;
  background: #a69c8d;
}
```

The entire outer box remains filled behind the photo opening, so there is no butt joint between independently rasterized borders. The image already covers its window with `width:300%; height:200%; left:calc(var(--panel) * -100%); top:-4%`. Preserve that panel mapping and asset. Remove any independent transforms from window/image. Chapter motion may translate the whole `.brand-stage`; it must carry the frame and image as one object, without changing their relative position. No negative image inset or arbitrary image scaling to conceal the seam.

## Repo conventions to follow

All portrait styles live in `src/style.css`; existing light/dark variables `--ring` and `--ring-alt` already express the two colors. Founder links wrap both portrait and caption, so preserve that semantic structure and focus treatment.

## Steps

1. Remove only the three `.ring-outline` spans in `index.html`, keeping `.portrait-ring > .portrait-window > .founder-image` and all founder metadata.
2. Apply the target styles above. Delete `.ring-outline` rules, responsive border-width overrides, `@keyframes ring-settle` and its infinite animation declarations. Update forced-color handling to target `.portrait-ring`, using a visible `CanvasText` border if system backgrounds erase the frame. Do not recreate a moving inner edge.
3. Remove the pause button markup `.motion-control`, its responsive styles and disabled styles, as the user requested. Add no replacement control.
4. Delete the obsolete block in `src/main.js:63–110` beginning `// Only the outer letter frames move.` through `syncMotion();`. It currently dereferences the removed button. Preserve workflow selection and all theme logic above it. Plan 003 introduces a new finite lifecycle without that button.

## Boundaries

Work only on the motion and markup explicitly described. Preserve concurrent user/worker changes. Do not apply the saved patch wholesale. No dependencies, new animation library, palette changes, invented copy, new sections, forced scroll snapping or scroll interception. Keep the mineral/petrol/copper palettes and `public/theme.js` local-time theme plus override. The final product has two chapters, hero/team and work/method/workflow. University information moves under hero portraits and the redundant bottom founder-list component is removed by the implementation worker; these plans do not add another contact chapter. Retain existing LinkedIn destinations.

Source line numbers refer to the stamped snapshot. If worker changes moved a selector, locate the same responsibility by selector, preserve their new content/layout and apply only this plan's motion change. If that responsibility has changed incompatibly, report the conflict rather than replacing their file.

## Verification

- **Mechanical**: `node --check src/main.js` must pass. `rg -n 'ring-settle|ring-outline|motion-control|userPaused' index.html src` should have no active implementation matches. No build/install is needed for this check.
- **Feel check**: Use the existing local server. Inspect a representative portrait at DPR 1 and 2, including a fractional rendered size. Scrub the eventual chapter transition at 0%, 25%, 50%, 75%, 100% and reverse. Inspect the entire inner curve at high zoom. No canvas-colored hairline, doubled contour or moving gap may open. The source photo itself must retain the same crop and orientation at every step. Check light and dark once, without changing their palette.
- **Done when**: A single underpainted outer box and a single photo clip own every shared edge. There is no idle outline animation, no pause button and no dangling button access. DPR/frame verification is required from the executor; this read-only plan does not claim it has already passed.
