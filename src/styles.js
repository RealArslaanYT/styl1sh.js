// styles.js
import { createSheet, applyRules, eventMap } from './runtime.js';

export function defineStaticStyles(rules) {
  const sheet = createSheet();
  applyRules(rules, sheet);
}

export function defineDynamicStyles(fn) {
  const sheet = createSheet();

  const ctx = {
    register(type) {
      if (!eventMap[type]) eventMap[type] = [];
      eventMap[type].push(update);
    },
  };

  function update() {
    const newRules = fn(ctx);
    if (newRules) applyRules(newRules, sheet);
  }

  update();
}
