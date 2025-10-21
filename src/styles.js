// styles.js
import { applyRules, eventMap } from './runtime.js';

export function defineStaticStyles(rules) {
  applyRules(rules, sheet);
}

export function defineDynamicStyles(fn) {
  const ctx = {
    register(type) {
      if (!eventMap[type]) eventMap[type] = [];
      eventMap[type].push(update);
    },
  };

  function update() {
    const newRules = fn(ctx);
    if (newRules) applyRules(newRules);
  }

  update();
}
