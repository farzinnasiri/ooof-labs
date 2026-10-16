// A finite entrance followed by one slow signal connecting the letters.
// Default HTML/CSS and reduced motion keep the complete, still mark.
export function initBrandMotion() {
  const stage = document.querySelector(".brand-stage");
  const founders = [...stage.querySelectorAll(".founder")];
  const rings = founders.map((founder) =>
    founder.querySelector(".portrait-ring"),
  );
  const motionToggle = document.querySelector(".motion-toggle");
  const signal = stage.querySelector(".brand-signal");
  const work = document.querySelector(".work-motion");
  const chapter = document.querySelector(".work-chapter");
  const hero = document.querySelector(".hero");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
  let animations = [];
  let ambient = null;
  let paused = false;
  let started = false;
  let stageVisible = false;
  let workVisible = false;
  let frame = 0;
  let chapterTop = 0;
  let heroTop = 0;
  let viewport = innerHeight;
  let lastScroll = -1;

  function settle() {
    for (const animation of animations) animation.cancel();
    animations = [];
    stage.classList.remove("is-introducing");
  }

  function startAmbient() {
    if (reduced.matches || ambient) return;
    stage.classList.add("is-ambient");
    ambient = signal.animate(
      [{ strokeDashoffset: 1000 }, { strokeDashoffset: 0 }],
      { duration: 8000, iterations: Infinity, easing: "linear" },
    );
    syncPlayback();
  }

  function play() {
    settle();
    if (reduced.matches || document.hidden || !stageVisible) return;
    started = true;
    stage.classList.add("is-introducing");
    function animate(element, keyframes, duration, delay) {
      const animation = element.animate(keyframes, {
        duration,
        delay,
        easing: ease,
        fill: "both",
      });
      animations.push(animation);
      return animation;
    }
    founders.forEach((founder, index) => {
      animate(
        rings[index],
        [
          {
            transform: `translate3d(${(1 - index) * 24}px, 28px, 0) scale(.86)`,
          },
          { transform: "translate3d(0, -3px, 0) scale(1.012)", offset: 0.72 },
          { transform: "translate3d(0, 0, 0) scale(1)" },
        ],
        760,
        index * 80,
      );
      animate(
        founder.querySelector(".portrait-source"),
        [
          { clipPath: "inset(50% round 50%)" },
          { clipPath: "inset(0% round 0%)" },
        ],
        600,
        180 + index * 80,
      );
      animate(
        founder.querySelector(".founder-caption"),
        [
          { opacity: 0.55, transform: "translateY(6px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        440,
        300 + index * 80,
      );
    });
    animate(
      stage.querySelector(".f-stem"),
      [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
      780,
      440,
    );
    const end = animate(
      stage.querySelector(".f-bar"),
      [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
      560,
      840,
    );
    end.addEventListener(
      "finish",
      () => {
        settle();
        startAmbient();
      },
      { once: true },
    );
  }

  function syncPlayback() {
    if (reduced.matches) {
      settle();
      ambient?.cancel();
      ambient = null;
      stage.classList.remove("is-ambient");
      return;
    }
    for (const animation of [...animations, ...(ambient ? [ambient] : [])]) {
      if (paused || document.hidden || !stageVisible) animation.pause();
      else if (animation.playState === "paused") animation.play();
    }
  }

  const clamp = (value) => Math.min(1, Math.max(0, value));
  function paint() {
    frame = 0;
    if (reduced.matches) {
      stage.style.transform = "";
      work.style.transform = "";
      lastScroll = -1;
      return;
    }
    if (
      document.hidden ||
      (!stageVisible && !workVisible) ||
      lastScroll === scrollY
    )
      return;
    lastScroll = scrollY;
    // Native scroll remains 1:1. Transform only; no pinned chapter or layout reads.
    const leaving = clamp(
      (scrollY - heroTop) / Math.max(1, chapterTop - heroTop),
    );
    const arriving = clamp((scrollY - (chapterTop - viewport)) / viewport);
    stage.style.transform = `translate3d(0, ${-28 * leaving}px, 0)`;
    work.style.transform = `translate3d(0, ${24 * (1 - arriving)}px, 0)`;
  }
  function schedule() {
    if (!frame && !document.hidden) frame = requestAnimationFrame(paint);
  }
  function measure() {
    chapterTop = chapter.getBoundingClientRect().top + scrollY;
    heroTop = hero.getBoundingClientRect().top + scrollY;
    viewport = innerHeight;
    lastScroll = -1;
    schedule();
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target === stage) stageVisible = entry.isIntersecting;
        else workVisible = entry.isIntersecting;
      }
      if (stageVisible && !started) play();
      syncPlayback();
      lastScroll = -1;
      schedule();
    },
    { threshold: 0.01 },
  );
  observer.observe(stage);
  observer.observe(work);
  const resize = new ResizeObserver(measure);
  resize.observe(hero);
  resize.observe(chapter);
  motionToggle.hidden = reduced.matches;
  motionToggle.addEventListener("click", () => {
    paused = !paused;
    motionToggle.setAttribute("aria-pressed", String(paused));
    const label = paused
      ? "Resume ambient animation"
      : "Pause ambient animation";
    motionToggle.setAttribute("aria-label", label);
    motionToggle.title = label;
    syncPlayback();
  });
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", measure);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    syncPlayback();
    if (!document.hidden) {
      if (!started && stageVisible) play();
      measure();
    }
  });
  reduced.addEventListener("change", () => {
    motionToggle.hidden = reduced.matches;
    // Changing a preference never replays the entrance.
    started = true;
    settle();
    syncPlayback();
    if (!reduced.matches) startAmbient();
    lastScroll = -1;
    schedule();
  });
  measure();
}
