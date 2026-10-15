# 003 Coordinate native scroll between the two chapters

- **Status**: DONE
- **Commit**: `0de769a`, with uncommitted changes
- **Baseline**: 2026-10-15 20:59:49 UTC. This is a source snapshot, not a review of later worker edits.
- **Severity**: MEDIUM
- **Category**: Purpose and frequency; interruptibility; accessibility and performance
- **Estimated scope**: `index.html`, `src/style.css`, `src/main.js`, limited chapter hooks and motion controller
- **Dependencies**: 001 removes idle deformation/button/controller. 002 restores exact f drawing. Apply this after the worker's already authorized two-chapter content relocation.

## Problem

Current `/Users/farzin/MyProjects/ooof-labs/src/main.js:63–76` controls only autonomous outline motion:

```js
const stage = document.querySelector(".brand-stage");
const motionButton = document.querySelector(".motion-control");
const motionText = motionButton.querySelector("span");
const motionIcon = motionButton.querySelector("svg");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let userPaused = false;
let inView = false;
function syncMotion() {
  const reduced = reducedMotion.matches;
  stage.dataset.motionState =
    !userPaused && !reduced && inView && !document.hidden
      ? "running"
      : "paused";
```

The observer at lines 101–109 pauses that loop when hidden/offscreen. There is no scroll progress mapping or chapter transition. The actual effect remains disconnected from the visitor's scrolling. Keep the useful visibility/preference lifecycle idea while deleting its button-dependent loop. Existing workflow handling at lines 34–40 deliberately skips connector replay for keyboard input; preserve this.

## Target

Exactly two ordinary document-flow chapters. Chapter one contains header/hero/team including education; chapter two contains method/workflow and any compact existing contact action the worker retains. Do not create a third footer/team chapter. Give each chapter a minimum height of `100svh`, not a fixed height. Permit content to grow at 360px and with larger text; do not squeeze or clip names/degrees to force exactly two viewport heights. No sticky pinning, wheel/touch listeners, snap, focus changes, delayed scroll or automatic navigation.

One bounded, reversible scroll composition communicates arrival at work. Use scroll progress, not elapsed time. For the boundary at document Y `B = workChapter.getBoundingClientRect().top + scrollY` and current viewport height `H`, define:

```js
const p = Math.max(0, Math.min(1, (scrollY - (B - H)) / H));
// Only direct transforms, with no transition/lag on these elements.
// .brand-stage: translate3d(0, -16 * p px, 0)
// .work-motion: translate3d(0, 16 * (1 - p) px, 0)
```

`16px` is this composition's maximum travel, not a universal skill token. Linear mapping is intentional for a user-scrubbed position. Do not add easing or a duration to scroll transforms, which would make the composition lag or reverse poorly. Keep opacity at 1, faces unstretched, all text readable and links interactive throughout. The stage carries the static photo and its solid frame together; captions may travel with their stage but never wiggle separately.

Keep the repo's `--ease` for the original finite f draw. Existing `--ease-move: cubic-bezier(0.77, 0, 0.175, 1)` is valid for a timed morph, but this plan deletes the morph and does not need a replacement easing system. If adjusting the existing pointer connector, use its current 350ms intentionally explanatory connector only; no content fade or delay is necessary. Keyboard selection stays immediate.

## Repo conventions to follow

Plain HTML/CSS and small native JS, with no animation dependency. Theme handling at `src/main.js:45–61` and `public/theme.js` must remain intact. `.brand-stage` already exists. Add `.work-motion` to the existing work content container rather than nesting another page section. Add explicit chapter hooks to existing outer wrappers; do not derive motion from text labels.

## Steps

1. Coordinate with the worker's authorized structure changes. Add `data-chapter="hero"` to the existing wrapper containing header/hero/team and `data-chapter="work"` to `.work-ground`. Put `.work-motion` on its existing `.page-width` container. Ensure the hero's existing min-height plus header does not accidentally add an extra viewport; the outer chapter owns the minimum. Content may overflow its minimum naturally. Keep all existing anchor targets valid after the footer list is removed.
2. Add motion styling only inside `@media (prefers-reduced-motion:no-preference)`. Default/no-JS and reduced-motion transforms are `none`; opacity remains 1. No animation may set a chapter to invisible before JS runs. Do not animate the chapter wrapper itself, so boundary measurement stays stable.
3. Use a passive `scroll` listener that schedules at most one `requestAnimationFrame` when scroll input arrives. Measure `B` and `H` at setup and resize/content-size change with a `ResizeObserver`, not on every frame. Write direct `style.transform` to `.brand-stage` and `.work-motion` using the progress equation above; do not update an inheriting CSS variable on a parent. No self-scheduling frame loop. Clamp p and skip identical writes.
4. When the page is hidden or both animated elements are outside the viewport, cancel pending motion work. Keep the passive event hook capable of scheduling one fresh synchronization on re-entry; visibility change/observer re-entry must recalculate from the current scroll position, not restart from zero. When reduced motion is enabled, clear both inline transforms, cancel pending frames, and do not schedule scroll motion. A preference change back may recalculate the current scroll position immediately.
5. Manage the restored f's two CSS `draw` animations as finite effects. Capture only animation objects whose effect targets are `.f-stem` and `.f-bar`, and pause/resume those objects via stage intersection and document visibility. Do not replay on intersection, theme changes, workflow choices, or scroll return. With reduced motion active, cancel the draw, set both paths to dashoffset 0 and mark the entrance consumed. Keep it consumed when preference returns to no-preference. For a load below the hero or a restored scroll position, show the completed f instead of replaying an unseen entrance. At 1320ms of visible playback both paths are settled and no entrance work remains.
6. Do not restore `.motion-control`. No recurring automatic effect remains for it to control. Stop tracking finished animation objects, retain only the event/observer hooks needed for scroll, and ensure neither theme sync nor workflow clicks reset the entrance.

## Boundaries

Work only on the motion and markup explicitly described. Preserve concurrent user/worker changes. Do not apply the saved patch wholesale. No dependencies, new animation library, palette changes, invented copy, new sections, forced scroll snapping or scroll interception. Keep the mineral/petrol/copper palettes and `public/theme.js` local-time theme plus override. The final product has two chapters, hero/team and work/method/workflow. University information moves under hero portraits and the redundant bottom founder-list component is removed by the implementation worker; these plans do not add another contact chapter. Retain existing LinkedIn destinations.

Source line numbers refer to the stamped snapshot. If worker changes moved a selector, locate the same responsibility by selector, preserve their new content/layout and apply only this plan's motion change. If that responsibility has changed incompatibly, report the conflict rather than replacing their file.

## Verification

- **Mechanical**: `node --check src/main.js` passes. Inspect `rg -n 'infinite|ring-settle|motion-control|userPaused|scroll-snap|preventDefault' index.html src/style.css src/main.js` and confirm no active implementation remains for these old/forbidden effects. Exactly two chapter hooks exist. No additional dependency or timers for a recurring animation were introduced.
- **Feel check**: In the existing local browser, slowly scroll across the boundary, stop halfway, then reverse quickly. Stopping scroll must stop the composition immediately; reversing must retrace the same positions with no jump or delayed tween. The maximum relative travel is 16px. Capture the boundary at p=0, .25, .5, .75, 1 at DPR 1 and 2 for plan 001's edge check. Use one representative desktop and 360px mobile, not another full screenshot matrix. Native touch scrolling, scrollbar dragging, Page Down and anchor navigation must all work.
- At 10% playback inspect the finite f draw. Hide/reopen the tab and scroll away/back during entrance. It resumes only unfinished visible playback and never restarts. Finished entrance stays settled. Reduced motion mid-draw immediately shows the complete f and static chapters. Theme override must not restart motion. Keyboard workflow selection must not replay the pointer connector.
- Verify the education lines stay under hero portraits and all work content remains readable at narrow width and larger text. If content exceeds one screen, normal scrolling is the accepted fallback, not clipping or shrinking it.
- **Done when**: A visitor controls the transition by normal scrolling. The source photo/frame edge stays joined, the original f plays once, all automatic motion finishes, and no pause control or replacement exists. Hidden/offscreen content does no continuous motion work. This plan specifies runtime checks; the auditor has not executed the future implementation.
