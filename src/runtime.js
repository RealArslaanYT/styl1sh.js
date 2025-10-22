// runtime.js

export const eventMap = {
  animationFrame: [],
  DOMContentLoaded: [],
  useTheme: [],
  resize: [],
  scroll: [],
  keydown: [],
  click: [],
};

export const runtimeState = {
  currentTheme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
};

export function applyRules(rules) {
  for (const [selector, props] of Object.entries(rules)) {
    if (!applyRules.elementCache) applyRules.elementCache = new Map();
    let elements = applyRules.elementCache.get(selector);
    if (!elements) {
      elements = document.querySelectorAll(selector);
      applyRules.elementCache.set(selector, elements);
    }

    for (const el of elements) {
      for (const [prop, value] of Object.entries(props)) {
        el.style[prop] = value;
      }
    }
  }
}

export function triggerEvent(type) {
  const handlers = eventMap[type];
  if (!handlers) return;
  for (const fn of handlers) {
    fn();
  }
}

export function setTheme(theme) {
  runtimeState.currentTheme = theme;
  triggerEvent("useTheme");
}

export function startRuntimeLoop() {
  function loop() {
    for (const fn of eventMap.animationFrame) fn(); // only runs registered callbacks

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  window.addEventListener("resize", () => {
    for (const fn of eventMap.resize) fn();
  });
  window.addEventListener("scroll", () => {
    for (const fn of eventMap.scroll) fn();
  });
  window.addEventListener("keydown", (event) => {
    for (const fn of eventMap.keydown) fn({key: event.key, code: event.code});
  });
  window.addEventListener("click", (event) => {
    for (const fn of eventMap.click) fn({clientX: event.clientX, clientY: event.clientY, screenX: event.screenX, screenY: event.screenY});
  });
  window.document.addEventListener("DOMContentLoaded", () => {
    for (const fn of eventMap.DOMContentLoaded) fn();

    const useThemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    useThemeMediaQuery.addEventListener("change", (e) => {
      runtimeState.currentTheme = e.matches ? "dark" : "light";
      triggerEvent("useTheme");
    });
    runtimeState.currentTheme = useThemeMediaQuery.matches ? "dark" : "light";
    triggerEvent("useTheme");
  });

  console.log(
    "[styl1sh.js] started runtime loop and initialized event listeners"
  );
}
