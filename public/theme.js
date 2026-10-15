/* Run before CSS so local-time and saved themes are applied before first paint. */
(() => {
  const key = "ooof-theme";
  const valid = (value) => ["auto", "light", "dark"].includes(value);
  const resolve = (mode, hour) =>
    mode === "auto" ? (hour >= 7 && hour < 19 ? "light" : "dark") : mode;
  let mode = "auto";
  let timer;
  try {
    const saved = localStorage.getItem(key);
    if (valid(saved)) mode = saved;
  } catch {
    /* Storage can be unavailable. The clock still works. */
  }
  function refresh() {
    const now = new Date();
    const theme = resolve(mode, now.getHours());
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themeMode = mode;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#edf1ef" : "#11282b");
    window.dispatchEvent(
      new CustomEvent("ooof-theme-change", { detail: { mode, theme } }),
    );
    clearTimeout(timer);
    if (mode === "auto") {
      const boundary = new Date(now);
      boundary.setHours(
        now.getHours() < 7 ? 7 : now.getHours() < 19 ? 19 : 31,
        0,
        0,
        0,
      );
      timer = setTimeout(refresh, boundary.getTime() - now.getTime() + 50);
    }
  }
  function setMode(next) {
    if (!valid(next)) return;
    mode = next;
    try {
      localStorage.setItem(key, next);
    } catch {
      /* The in-memory choice remains usable. */
    }
    refresh();
  }
  window.OoofTheme = { setMode, refresh, getMode: () => mode };
  window.addEventListener("focus", refresh);
  window.addEventListener("storage", (event) => {
    if (event.key === key || event.key === null) {
      mode = valid(event.newValue) ? event.newValue : "auto";
      refresh();
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refresh();
  });
  refresh();
})();
