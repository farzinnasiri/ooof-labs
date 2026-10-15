import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/bricolage-grotesque";
import "./explore.css";
import { founders } from "./portraits.js";

const arrow =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const diagonal =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const wordmark = `<span class="brand" aria-label="Ooof Labs"><svg class="brand-mark" viewBox="0 0 162 52" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="9"><ellipse cx="24" cy="30" rx="17" ry="17"/><ellipse cx="63" cy="30" rx="17" ry="17"/><ellipse cx="102" cy="30" rx="17" ry="17"/><path d="M134 47V17q0-12 14-12h7M122 23h32"/></g></svg><span class="brand-labs">labs</span></span>`;
const support =
  "We help companies turn AI experiments into everyday practice. Working alongside your team, from the first useful workflow to the systems behind it.";
const workflows = [
  {
    label: "Finding answers",
    before: "The answer is in a document. Somewhere.",
    after:
      "Ask in plain language. Get an answer with its sources, drawn from the documents your team already uses.",
    human: "Your team checks the source and makes the call.",
  },
  {
    label: "Following up",
    before: "The meeting ends. The follow-up starts.",
    after:
      "Turn meeting notes into a draft recap, next steps, and updates for your existing tools.",
    human: "A person reviews the draft before anything is sent.",
  },
  {
    label: "Starting from scratch",
    before: "Another proposal. Another blank page.",
    after:
      "Build a first draft from the brief and your approved past work, with missing details flagged.",
    human: "Your team shapes the argument and approves the result.",
  },
];
function portrait(person, kind = "") {
  return `<a class="portrait ${kind} portrait-${person.id} ${person.source ? "has-photo" : "portrait-study"}" href="${person.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="${person.name}, co-founder, on LinkedIn"><span class="portrait-image">${person.source ? `<img src="${person.source}" alt="${person.name}" style="object-position:${person.position}" />` : `<span class="study-subject" aria-hidden="true">${person.short}</span><span class="study-caption">Studio portrait study</span>`}</span><span class="portrait-caption"><span>${person.name}</span>${diagonal}</span></a>`;
}
function workflow(id) {
  return `<section class="workflow" id="${id}-practice" aria-labelledby="${id}-workflow-title"><div class="workflow-choose"><h2 id="${id}-workflow-title">Where does work get stuck?</h2><div class="workflow-options" role="group" aria-label="Choose an everyday bottleneck">${workflows.map((w, index) => `<button type="button" data-workflow="${index}" aria-pressed="${index === 0}">${w.label}${arrow}</button>`).join("")}</div></div><div class="workflow-result" aria-live="polite" aria-atomic="true"><span class="example-label">An example, not a case study</span><h3>${workflows[0].before}</h3><p>${workflows[0].after}</p><p class="human-step">${workflows[0].human}</p></div></section>`;
}
function contact(id) {
  return `<footer class="contact" id="${id}-contact"><div><h2>Three founders.<br>One conversation.</h2><p>Tell us where work gets stuck.<br>Find us on LinkedIn.</p></div><div class="contact-links">${founders.map((p) => `<a href="${p.linkedin}" target="_blank" rel="noopener noreferrer">${p.name}${diagonal}</a>`).join("")}</div><span class="contact-signoff">Ooof Labs. AI in everyday work.</span></footer>`;
}
function header(id) {
  return `<header class="site-header"><a class="home" href="#${id}" aria-label="Ooof Labs home">${wordmark}</a><span class="header-note">An independent AI consultancy</span><a class="header-contact" href="#${id}-contact">Let's talk ${diagonal}</a></header>`;
}
function concept(id, name, content) {
  return `<article class="concept ${id}" id="${id}" aria-label="${name} direction">${header(id)}${content}${workflow(id)}${contact(id)}</article>`;
}
const gallery = concept(
  "gallery",
  "Open studio",
  `
  <section class="gallery-hero" aria-labelledby="gallery-title">
    <div class="gallery-message"><h1 id="gallery-title">Make AI part<br>of how you<br><span class="gallery-last">work<span class="headline-dot">.</span></span></h1><div class="gallery-intro"><p>${support}</p><a class="text-action" href="#gallery-practice">See it in practice ${arrow}</a></div></div>
    <div class="gallery-people"><div class="gallery-people-heading"><span>A company changes<br>with its people.</span><span>Meet ours ${arrow}</span></div><div class="gallery-portraits">${founders.map((p) => portrait(p)).join("")}</div><p class="people-note">Farzin, Ali & Yazdan. Co-founders, hands on.</p></div>
  </section><div class="method-line"><span>Start with the work.</span><p>Find one useful workflow. Build it with your team.<br>Make it part of the everyday.</p></div>
`,
);
const cinema = concept(
  "cinema",
  "After hours",
  `
  <section class="cinema-hero" aria-labelledby="cinema-title"><div class="cinema-topline"><span>Good work starts<br>with a conversation.</span><a class="cinema-cta" href="#cinema-contact">Let's talk ${diagonal}</a></div>
    <div class="cinema-main"><h1 id="cinema-title">Make AI part of<br>how you <em>work.</em></h1><div class="cinema-caption"><p>${support}</p><a class="text-action" href="#cinema-practice">See it in practice ${arrow}</a></div></div>
    <div class="cinema-portraits">${founders.map((p) => portrait(p)).join("")}<span class="cinema-photo-note">Three founders.<br>Working alongside you.</span></div>
  </section><div class="method-line"><span>From the first useful workflow.</span><p>We work with the people doing the work,<br>then build the systems that keep it going.</p></div>
`,
);
const chemistry = concept(
  "chemistry",
  "Good chemistry",
  `
  <section class="chemistry-hero" aria-labelledby="chemistry-title"><div class="chemistry-opening"><h1 id="chemistry-title">AI belongs in<br>the everyday.</h1><div class="chemistry-intro"><p>${support}</p><a class="pill-action" href="#chemistry-contact">Let's talk ${diagonal}</a></div></div>
    <div class="chemistry-objects" aria-label="The three founders of Ooof Labs"><div class="ooo-objects">${founders.map((p) => `<a class="o-object o-${p.id}" href="${p.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="${p.name}, co-founder, on LinkedIn"><span class="o-window">${p.source ? `<img src="${p.source}" alt="${p.name}"/>` : `<span>${p.short}</span>`}</span>${p.source ? `<span class="object-name">${p.short}${diagonal}</span>` : ""}</a>`).join("")}</div><p class="objects-note">A little human chemistry. <br>A lot of practical AI.</p></div>
    <a class="chemistry-next" href="#chemistry-practice">Make AI part of how you work ${arrow}</a>
  </section><div class="method-line"><span>Start small. Make it useful.</span><p>We find the right workflow with your team.<br>Then we build, connect, and put it to work.</p></div>
`,
);
const selected = new URLSearchParams(window.location.search).get("direction");
const directions = { gallery, cinema, chemistry };
const navigation = `<nav class="explore-nav" aria-label="Design directions"><a class="explore-name" href="./explore.html">Ooof Labs <span>Direction studies</span></a><div>${[
  ["gallery", "Open studio"],
  ["cinema", "After hours"],
  ["chemistry", "Good chemistry"],
]
  .map(
    ([id, name]) =>
      `<a href="?direction=${id}" ${selected === id ? 'aria-current="page"' : ""}>${name}</a>`,
  )
  .join("")}</div></nav>`;
document.querySelector("#app").innerHTML =
  `${navigation}<main id="main">${directions[selected] ?? gallery + cinema + chemistry}</main>`;
if (selected && directions[selected])
  document.body.dataset.direction = selected;
document.querySelectorAll("[data-workflow]").forEach((button) => {
  button.addEventListener("click", () => {
    const section = button.closest(".workflow");
    const item = workflows[Number(button.dataset.workflow)];
    section
      .querySelectorAll("button")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    const result = section.querySelector(".workflow-result");
    result.innerHTML = `<span class="example-label">An example, not a case study</span><h3>${item.before}</h3><p>${item.after}</p><p class="human-step">${item.human}</p>`;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      result.animate([{ opacity: 0.35 }, { opacity: 1 }], {
        duration: 180,
        easing: "ease-out",
      });
  });
});
