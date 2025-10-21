// runtime.js
export const eventMap = {
  animationFrame: [],
  resize: [],
  scroll: [],
};

export function createSheet() {
  const el = document.createElement('style');
  el.dataset.styl1sh = '';
  document.head.appendChild(el);
  return el.sheet;
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
  function loop() {
    for (const fn of eventMap.animationFrame) fn();
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
