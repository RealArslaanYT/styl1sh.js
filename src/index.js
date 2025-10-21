// index.js

import { startRuntimeLoop, triggerEvent, runtimeState } from './runtime.js';
import { defineStaticStyles, defineDynamicStyles } from './styles.js';

(function initStyl1sh() {
  if (window.styl1sh) return;

  startRuntimeLoop();

  window.styl1sh = {
    defineStaticStyles,
    defineDynamicStyles,
    triggerEvent,
    runtimeState
  };

  console.log("[styl1sh.js] initialized :)");
})();