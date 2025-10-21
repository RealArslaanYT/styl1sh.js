// runtime.js
export const eventMap = {
  animationFrame: [],
  resize: [],
  scroll: [],
};

// export function createSheet() {
//   const el = document.createElement('style');
//   el.dataset.styl1sh = '';
//   document.head.appendChild(el);
//   return el.sheet;
// }

export function applyRules(rules) {
  for (const [selector, props] of Object.entries(rules)) {
    // cache elements per selector
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

export function startRuntimeLoop(fps = 60) {
  let last = 0;
  const interval = 1000 / fps;

  function loop(now = performance.now()) {
    if (now - last >= interval) {
      for (const fn of eventMap.animationFrame) fn();
      last = now;
    }
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  window.addEventListener("resize", () => {
    for (const fn of eventMap.resize) fn();
  });
  window.addEventListener("scroll", () => {
    for (const fn of eventMap.scroll) fn();
  });
}
