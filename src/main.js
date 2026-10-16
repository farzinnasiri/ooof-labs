import { initBrandMotion } from "./brand-motion.js";

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

initBrandMotion();

document.querySelectorAll('a[href="#founders"]').forEach((anchor) => {
  anchor.addEventListener("click", () =>
    requestAnimationFrame(() =>
      document.querySelector("#founders").focus({ preventScroll: true }),
    ),
  );
});
