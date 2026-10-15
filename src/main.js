const workflows = {
  answers: {
    title: "The answer is in a document. Somewhere.",
    explanation:
      "Finds the relevant passages in your team's documents and links to the sources.",
    human: "Your team checks the source and makes the call.",
  },
  followup: {
    title: "The meeting ends. The follow-up starts.",
    explanation:
      "Turns meeting notes into a draft recap and next steps, ready for your existing tools.",
    human: "A person reviews the draft before anything is sent.",
  },
  drafting: {
    title: "Another proposal. Another blank page.",
    explanation:
      "Builds a first draft from the brief and approved past work, with missing details flagged.",
    human: "Your team shapes the argument and approves the result.",
  },
};

const buttons = [...document.querySelectorAll("[data-workflow]")];
const result = document.querySelector("#workflow-result");
for (const button of buttons) {
  button.addEventListener("click", (event) => {
    if (button.getAttribute("aria-pressed") === "true") return;
    const example = workflows[button.dataset.workflow];
    for (const option of buttons)
      option.setAttribute("aria-pressed", String(option === button));
    result.querySelector("h3").textContent = example.title;
    result.querySelector(".workflow-explanation").textContent =
      example.explanation;
    result.querySelector(".human-step").textContent = example.human;
    // Retain the user's AI-to-person connector. Keyboard selection is immediate.
    result.classList.remove("is-switching");
    if (
      event.detail > 0 &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      requestAnimationFrame(() => result.classList.add("is-switching"));
    }
  });
}

const themeSelect = document.querySelector("#theme-select");
function syncThemeControl() {
  const mode = window.OoofTheme.getMode();
  themeSelect.value = mode;
  const paths = {
    auto: '<circle cx="12" cy="12" r="8"/><path d="M12 4v16"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none"/>',
    light:
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
    dark: '<path d="M20 15A8 8 0 0 1 9 4a8.5 8.5 0 1 0 11 11Z"/>',
  };
  document.querySelector(".theme-icon").innerHTML = paths[mode];
}
syncThemeControl();
themeSelect.addEventListener("change", () =>
  window.OoofTheme.setMode(themeSelect.value),
);
window.addEventListener("ooof-theme-change", syncThemeControl);

// One reversible native-scroll composition. No idle loop or scroll interception.
const stage = document.querySelector(".brand-stage");
const workChapter = document.querySelector(".work-chapter");
const workMotion = document.querySelector(".work-motion");
const paths = [...document.querySelectorAll(".f-stem, .f-bar")];
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
let intro = paths.flatMap((path) => path.getAnimations());
let request = 0;
let boundary = 0;
let viewport = innerHeight;
let stageVisible = true;
let workVisible = false;
let previous = -1;
function finishIntro() {
  for (const animation of intro) animation.cancel();
  intro = [];
  for (const path of paths) {
    path.style.animation = "none";
    path.style.strokeDashoffset = "0";
  }
}
for (const animation of intro)
  animation.addEventListener("finish", () => {
    if (intro.every((item) => item.playState === "finished")) finishIntro();
  });
function syncIntro() {
  if (reduced.matches) {
    finishIntro();
    return;
  }
  for (const animation of intro) {
    if (!stageVisible || document.hidden) animation.pause();
    else if (animation.playState === "paused") animation.play();
  }
}
function paintScroll() {
  request = 0;
  if (reduced.matches) {
    stage.style.transform = "";
    workMotion.style.transform = "";
    previous = -1;
    return;
  }
  if (document.hidden || (!stageVisible && !workVisible)) return;
  const progress = Math.max(
    0,
    Math.min(1, (scrollY - (boundary - viewport)) / viewport),
  );
  if (progress === previous) return;
  previous = progress;
  stage.style.transform = `translate3d(0, ${-16 * progress}px, 0)`;
  workMotion.style.transform = `translate3d(0, ${16 * (1 - progress)}px, 0)`;
}
function scheduleScroll() {
  if (!request && !document.hidden)
    request = requestAnimationFrame(paintScroll);
}
function measure() {
  boundary = workChapter.getBoundingClientRect().top + scrollY;
  viewport = innerHeight;
  previous = -1;
  scheduleScroll();
}
new ResizeObserver(measure).observe(workChapter);
new ResizeObserver(measure).observe(document.querySelector(".hero"));
new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.target === stage) stageVisible = entry.isIntersecting;
      else workVisible = entry.isIntersecting;
    }
    syncIntro();
    scheduleScroll();
  },
  { threshold: 0.01 },
).observe(stage);
new IntersectionObserver(
  (entries) => {
    workVisible = entries[0].isIntersecting;
    scheduleScroll();
  },
  { threshold: 0.01 },
).observe(workMotion);
addEventListener("scroll", scheduleScroll, { passive: true });
addEventListener("resize", measure);
document.addEventListener("visibilitychange", () => {
  if (document.hidden && request) {
    cancelAnimationFrame(request);
    request = 0;
  }
  syncIntro();
  if (!document.hidden) measure();
});
reduced.addEventListener("change", (event) => {
  if (event.matches) finishIntro();
  else syncIntro();
  previous = -1;
  scheduleScroll();
});
if (scrollY > innerHeight / 2 || reduced.matches) finishIntro();
measure();
syncIntro();
document.querySelectorAll('a[href="#founders"]').forEach((anchor) => {
  anchor.addEventListener("click", () =>
    requestAnimationFrame(() =>
      document.querySelector("#founders").focus({ preventScroll: true }),
    ),
  );
});
