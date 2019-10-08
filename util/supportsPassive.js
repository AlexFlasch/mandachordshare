let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
      return supportsPassive;
    }
  });

  const noop = () => {};

  if (window) {
    window.addEventListener('testPassive', noop, opts);
    window.removeEventListener('testPassive', noop, opts);
  }
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e);
}

export default supportsPassive;
