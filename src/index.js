// index.js
import { startRuntimeLoop } from './runtime.js';
import { defineStaticStyles, defineDynamicStyles } from './styles.js';

(function initStyl1sh() {
  if (window.styl1sh) return;

  startRuntimeLoop(10);

  window.styl1sh = {
    defineStaticStyles,
    defineDynamicStyles,
  };
})();