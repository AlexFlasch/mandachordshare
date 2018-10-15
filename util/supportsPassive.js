let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });

  const noop = () => { };

  window.addEventListener("testPassive", noop, opts);
  window.removeEventListener("testPassive", noop, opts);
} catch (e) { }

export default supportsPassive;