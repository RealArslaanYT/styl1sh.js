// styles.js

import { applyRules, eventMap } from "./runtime.js";

export function defineStaticStyles(rules) {
  applyRules(rules, sheet);
}
export function defineDynamicStyles(fn) {
  const ctx = {
    register(type) {
      if (!eventMap[type]) eventMap[type] = [];
      if (!ctx.registered[type]) {      // prevent multiple pushes
        eventMap[type].push(update);
        ctx.registered[type] = true;
      }
    },
    firstRun: true,
    registered: {}
  };

  function update(event = {}) {
    ctx.event = event;
    const newRules = fn(ctx);
    if (newRules) applyRules(newRules);
    ctx.firstRun = false;
  }

  fn(ctx);
}

