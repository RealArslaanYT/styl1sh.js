// runtime.js
export const eventMap = {
  animationFrame: [],
  resize: [],
  scroll: [],
};

let lastRules = null;

export function createSheet() {
  const el = document.createElement('style');
  el.dataset.styl1sh = '';
  document.head.appendChild(el);
  return el.sheet;
}

export function applyRulesIfChanged(rules, sheet) {
  if (lastRules && JSON.stringify(lastRules) === JSON.stringify(rules)) return;
  while (sheet.cssRules.length) sheet.deleteRule(0);
  for (const [selector, props] of Object.entries(rules)) {
    const body = Object.entries(props)
      .map(([k, v]) => `${k}: ${v};`)
      .join(' ');
    sheet.insertRule(`${selector} { ${body} }`, sheet.cssRules.length);
  }
  lastRules = rules;
}

export function applyRules(rules, sheet) {
  while (sheet.cssRules.length) sheet.deleteRule(0);
  for (const [selector, props] of Object.entries(rules)) {
    const body = Object.entries(props)
      .map(([k, v]) => `${k}: ${v};`)
      .join(' ');
    sheet.insertRule(`${selector} { ${body} }`, sheet.cssRules.length);
  }
}

export function startRuntimeLoop() {
  let last = 0;
  const fps = 30; // desired max update frequency
  const interval = 1000 / fps;

  function loop(now = performance.now()) {
    if (now - last >= interval) {
      for (const fn of eventMap.animationFrame) fn();
      last = now;
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  window.addEventListener('resize', () => {
    for (const fn of eventMap.resize) fn();
  });
  window.addEventListener('scroll', () => {
    for (const fn of eventMap.scroll) fn();
  });
}
