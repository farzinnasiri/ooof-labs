import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(
  new URL("../public/theme.js", import.meta.url),
  "utf8",
);
function browser(hour, saved = null, blocked = false) {
  let currentHour = hour;
  let stored = saved;
  let pending;
  const listeners = {};
  const dataset = {};
  const style = {};
  const meta = {};
  const window = {
    addEventListener: (type, callback) => {
      listeners[type] = callback;
    },
    dispatchEvent() {},
  };
  const document = {
    documentElement: { dataset, style },
    hidden: false,
    querySelector: () => ({
      setAttribute: (key, value) => {
        meta[key] = value;
      },
    }),
    addEventListener: (type, callback) => {
      listeners[type] = callback;
    },
  };
  const storage = {
    getItem: () => {
      if (blocked) throw Error("Blocked");
      return stored;
    },
    setItem: (_key, value) => {
      if (blocked) throw Error("Blocked");
      stored = value;
    },
  };
  class LocalDate extends Date {
    constructor(...args) {
      super(...(args.length ? args : [2026, 9, 15, currentHour, 0, 0]));
    }
  }
  vm.runInNewContext(source, {
    window,
    document,
    localStorage: storage,
    Date: LocalDate,
    CustomEvent: class {},
    setTimeout: (callback, delay) => {
      pending = { callback, delay };
      return 1;
    },
    clearTimeout: () => {
      pending = undefined;
    },
  });
  return {
    window,
    dataset,
    style,
    meta,
    listeners,
    stored: () => stored,
    timer: () => pending,
    setHour: (next) => {
      currentHour = next;
    },
  };
}

test("auto uses browser-local time, including both exact boundaries", () => {
  for (const [hour, expected] of [
    [6, "dark"],
    [7, "light"],
    [12, "light"],
    [18, "light"],
    [19, "dark"],
    [20, "dark"],
  ]) {
    const b = browser(hour);
    assert.equal(b.dataset.theme, expected);
    assert.equal(b.style.colorScheme, expected);
    assert.equal(b.meta.content, expected === "light" ? "#edf1ef" : "#11282b");
  }
});
test("saved overrides win over the clock and can return to auto", () => {
  const b = browser(20, "light");
  assert.equal(b.dataset.theme, "light");
  assert.equal(b.timer(), undefined);
  b.window.OoofTheme.setMode("auto");
  assert.equal(b.dataset.theme, "dark");
  assert.equal(b.stored(), "auto");
  assert.ok(b.timer().delay > 0);
});
test("boundary timer and focus refresh a long-open tab", () => {
  const b = browser(18);
  assert.equal(b.timer().delay, 3600050);
  b.setHour(19);
  b.timer().callback();
  assert.equal(b.dataset.theme, "dark");
  b.setHour(12);
  b.listeners.focus();
  assert.equal(b.dataset.theme, "light");
});
test("blocked storage still permits manual choice and local-time auto", () => {
  const b = browser(6, null, true);
  assert.equal(b.dataset.theme, "dark");
  b.window.OoofTheme.setMode("light");
  assert.equal(b.dataset.theme, "light");
  b.window.OoofTheme.setMode("auto");
  assert.equal(b.dataset.theme, "dark");
});
test("invalid saved values fall back to auto and storage changes sync tabs", () => {
  const b = browser(12, "unexpected");
  assert.equal(b.dataset.themeMode, "auto");
  b.listeners.storage({ key: "ooof-theme", newValue: "dark" });
  assert.equal(b.dataset.theme, "dark");
  b.listeners.storage({ key: "ooof-theme", newValue: null });
  assert.equal(b.dataset.theme, "light");
});
