// Ooof is custom lettering, not a font. One source for every exported mark.
// O: 100 × 100, 46-unit corner, 14-unit wall. Optical letter gap: 4 units.
export const oPath =
  "M46 24H54C83 24 100 41 100 70V78C100 107 83 124 54 124H46C17 124 0 107 0 78V70C0 41 17 24 46 24ZM46 38C25 38 14 49 14 70V78C14 99 25 110 46 110H54C75 110 86 99 86 78V70C86 49 75 38 54 38Z";
export const fPath =
  "M327 124V71H312V57H327V48C327 21 343 7 368 7H394V21H368C350 21 341 30 341 48V57H388V71H341V124Z";
export function wordmark(ink, accent = ink) {
  return (
    [0, 104, 208]
      .map(
        (x, i) =>
          `<path fill="${i === 1 ? accent : ink}" fill-rule="evenodd" transform="translate(${x} 0)" d="${oPath}"/>`,
      )
      .join("") + `<path fill="${ink}" d="${fPath}"/>`
  );
}
export function monogram(ink, accent = ink) {
  return `<path fill="${accent}" fill-rule="evenodd" d="${oPath}"/><path fill="${ink}" transform="translate(-208 0)" d="${fPath}"/>`;
}
