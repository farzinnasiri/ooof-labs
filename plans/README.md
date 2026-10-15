# Ooof motion plans

Snapshot 2026-10-15 20:59:49 UTC, commit `0de769a` plus uncommitted user changes. These are advisor plans only. The implementation worker owns source. No extra agents are authorized.

| Order | Plan | Severity | Status | Dependency |
| --- | --- | --- | --- | --- |
| 1 | [Unify portrait edge](001-unify-portrait-edge.md) | HIGH | DONE | None |
| 2 | [Restore original f](002-restore-original-f-draw.md) | HIGH | DONE | Execute after 001 |
| 3 | [Coordinate two-chapter scroll](003-coordinate-two-chapter-scroll.md) | MEDIUM | DONE | 001, 002 and worker's authorized two-chapter content relocation |

Execute 001, 002, then 003 as one delivery. Do not release an intermediate state with leftover button dereferences or no visibility lifecycle. Preserve concurrent source changes and the existing theme implementation. No palette/copy redesign or new page section is proposed. Motion report: `/tmp/ooof-motion-audit.md`.

Implemented in the accepted revision: one fixed photo/frame boundary, the exact original two-stroke f with its 1320ms finite draw, and direct native-scroll chapter movement. Both-theme responsive captures, DPR 1/2 geometry checks, keyboard/reduced-motion checks, and hidden/offscreen lifecycle checks passed. The parent product review disposition is SHIP; physical-device and Safari motion feel remain untested.
