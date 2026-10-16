import { initBrandMotion } from "./brand-motion.js";

const workflows = {
  answers: {
    title: "“Which version of the policy is current?”",
    explanation: "Searches your documents and answers in seconds.",
    human:
      "Two versions exist. It quotes the old one, sounding sure. We make it show its source and admit when it doesn't know.",
  },
  followup: {
    title: "“Send everyone the recap.”",
    explanation: "Turns the meeting notes into a recap and next steps.",
    human:
      "It gives a task to the wrong person, or invents a deadline nobody said. We check every owner and date against the notes.",
  },
  drafting: {
    title: "“Draft the proposal by Friday.”",
    explanation: "Writes a first draft from the brief and your past work.",
    human:
      "It borrows a price from an old client's proposal. We keep it to approved material and flag what's missing.",
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

initBrandMotion();

document.querySelectorAll('a[href="#founders"]').forEach((anchor) => {
  anchor.addEventListener("click", () =>
    requestAnimationFrame(() =>
      document.querySelector("#founders").focus({ preventScroll: true }),
    ),
  );
});
