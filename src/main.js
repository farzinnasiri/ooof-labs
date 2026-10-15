const workflows = {
  answers: {
    title: "The answer is in a document. Somewhere.",
    explanation:
      "Ask a question. AI finds the relevant passages in your team's documents and links to the sources.",
    human: "Your team checks the source and makes the call.",
  },
  followup: {
    title: "The meeting ends. The follow-up starts.",
    explanation:
      "Turn meeting notes into a draft recap, next steps, and updates for the tools your team already uses.",
    human: "A person reviews the draft before anything is sent.",
  },
  drafting: {
    title: "Another proposal. Another blank page.",
    explanation:
      "Build a first draft from the brief and your approved past work, with missing details flagged.",
    human: "Your team shapes the argument and approves the result.",
  },
};

const buttons = [...document.querySelectorAll("[data-workflow]")];
const result = document.querySelector("#workflow-result");
for (const button of buttons) {
  button.addEventListener("click", () => {
    if (button.getAttribute("aria-pressed") === "true") return;
    const example = workflows[button.dataset.workflow];
    for (const option of buttons)
      option.setAttribute("aria-pressed", String(option === button));
    result.querySelector("h3").textContent = example.title;
    result.querySelector(".workflow-explanation").textContent =
      example.explanation;
    result.querySelector(".human-step").textContent = example.human;
  });
}
