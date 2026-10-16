---
name: Ooof Labs
description: Human expertise, practical AI, and a wordmark made of its founders.
colors:
  mineral: "#edf1ef"
  petrol: "#153f42"
  copper: "#b24730"
  night: "#11282b"
  mist: "#eef4ef"
  apricot: "#f0a67d"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontWeight: 650
    lineHeight: 0.99
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Instrument Sans Variable, sans-serif"
    fontSize: "16px"
    lineHeight: 1.55
rounded:
  panel: "16px"
  control: "28px"
spacing:
  small: "8px"
  group: "24px"
  section: "48px"
components:
  button-primary:
    backgroundColor: "{colors.copper}"
    textColor: "#fff8ef"
    rounded: "{rounded.control}"
    height: "50px"
---

# Ooof Labs design

## Overview

A refinement of the user's local design. The connected founder O forms and the f, three-step method, AI/person workflow split, and founder frames remain. The palette is now mineral, petrol, and copper by day; deep petrol, mist, and apricot at night. The page feels like a small independent studio with real engineers behind it.

## Colors

Day uses mineral for the full-bleed hero and a near-white second chapter, petrol for ink and letter frames, and copper for the human contact action. Night uses deep petrol grounds, mist ink, a lighter petrol workflow panel, and apricot actions. Secondary text stays tinted toward its surface and must pass 4.5:1 contrast.

Auto follows the browser's local clock: light at 07:00–19:00 and dark at 19:00–07:00. A native theme selector offers Auto, Light, and Dark. A saved manual preference takes precedence. The small blocking theme script sets theme, color-scheme, and theme-color before the stylesheet paints. Boundary timers and focus/visibility refresh keep a long-open tab accurate. No location service or system-appearance substitution.

## Typography

Bricolage carries headlines and founder names; Instrument Sans carries reading text, factual credentials and controls. Both variable fonts are self-hosted. Tracking never goes tighter than -0.04em. Longer names wrap at spaces rather than truncating. Header tagline and navigation share a deliberate grid rather than a floating offset.

## Layout

Backgrounds cover the full viewport width. Only inner content has a maximum width, with responsive side spacing. Desktop hero composition occupies one small viewport height, and the brand row sizes from available height as well as width. Mobile height follows content naturally, without a clipped footer or unused band. The f remains visible at every viewport size.

Two chapters fill at least one small viewport each: hero/team, then a connected three-step method and selectable illustrative AI/person workflow. All roles, education, cities and LinkedIn contacts sit under their corresponding hero portrait. There is no repeated founder section. Mobile workflow choices wrap into wider rows rather than narrow text columns.

## Elevation & Depth

Flat mineral and petrol surfaces. The founder windows provide photographic richness; no decorative glow or card grid. Workflow content uses one clear panel.

## Shapes

The custom ooof master uses three identical 100-unit O forms with 14-unit walls, 4-unit optical gaps, and an f with the same wall thickness. The small logo, hero frames and f, and all exports share scripts/brand-geometry.mjs. The labs suffix is outlined Instrument Sans Medium 500. public/brand/README.md specifies clear space, minimum sizes, and permitted variants. The corrected triptych is clipped into isolated thirds without CSS mirroring. Icons use one authored 1.6px rounded stroke style for roles, place, education, workflow and controls.

## Components

The finite 1400ms brand sequence assembles the O frames with an 80ms stagger, reveals the portraits, and draws the f in two strokes. The stem takes 780ms after a 440ms delay; the bar takes 560ms after an 840ms delay. Once it completes, a single warm highlight follows the upper O contours and connects to the f in a continuous eight-second linear loop. The photographs remain still. A compact motion control beside the theme selector pauses or resumes animation. There is no replay control.

Both the entrance and ambient motion pause offscreen or when the document is hidden. Reduced motion cancels all animations and shows the settled identity. Fine-pointer hover and keyboard focus lift an O by 8px and uniformly scale it to 1.025. The connecting trace fades during that interaction. Native scrolling moves the complete composition by up to 28px and settles the second chapter by 24px; no separate ring transforms can misalign the connecting path. Content is visible without JavaScript.

Photographs overscan beneath the frame. Only the outer letter silhouette clips the portrait layer; the opaque vector frame defines the inner edge. Never abut two independent antialiased masks at the counter boundary, which exposes the background as a pale seam.

Workflow selection updates text immediately at full opacity. Pointer input briefly traces the AI-to-person connector; keyboard input is immediate. The AI/person split and human approval labels remain explicit. Focus rings contrast with both themes, including the primary action.

## Do's and Don'ts

Keep complete founder names and exact LinkedIn links. Use the supplied roles, locations and education facts without implying that Yazdan has graduated. Preserve the user's local composition improvements. Use no cobalt/coral/butter theme, CSS portrait mirror, hidden mobile f, fake form, invented proof, tracking or external font/image dependency.

## Portable identity

The kit lives in public/brand with SVG masters, transparent PNGs, opaque square app icons, an offline HTML guide, font attribution, a dimensions manifest, and a ZIP download. Colour uses petrol with the middle O in copper; night uses mist and apricot; white and black are pure one-colour alternatives. The compact of monogram uses the first and last letters only in constrained square contexts. The full name remains ooof labs. Run npm run brand to regenerate the kit and the website letter outlines.
