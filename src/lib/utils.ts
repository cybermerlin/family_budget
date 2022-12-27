/* eslint-disable no-secrets/no-secrets */

export {};

// To show additional information: window.localStorage.setItem('DEBUG', true);
// If you want default console fnc: `window.localStorage.setItem('LOG_DEFAULT', true);`
window.DEBUG = window.localStorage.getItem('DEBUG') === 'true';
if (!Object.prototype.hasOwnProperty.call(console, 'colored')
    && window.localStorage.getItem('LOG_DEFAULT') !== "true") {

  Object.defineProperty(console, 'colored', {
    enumerable: false, writable: true, value: true
  });

  /**
   * You can execute some function (lambda) which return list of arguments for new console.log function ONLY if
   *  turned on the DEBUG mode.
   * (!) to turn on the DEBUG mode execute in devTools: `window.localStorage.setItem('DEBUG', true);`
   */
  console.log = (function (orig) {
    console.colored = true;

    return function (...args) {
      if (!DEBUG) {
        return;
      }
      if (typeof args[0] === 'function') {
        args = [...args[0]()];
      }
      if (typeof args[0] === 'string' && args[0].indexOf('%c') !== 0) {
        args[0] = `%c ${args[0]}`;
        args.splice(1, 0, 'color: deeppink;background-color:ivory;font-weight:bold;padding:3px 20px');
      }
      orig(...args);
    };
  })(console.log);

  console.info = (function (orig) {
    console.colored = true;

    return function (...args) {
      if (typeof args[0] === 'string' && args[0].indexOf('%c') !== 0) {
        args[0] = `%c (ℹ️) ${args[0]}`;
        args.splice(1, 0, 'color: cyan;background-color: deepskyblue;font-weight:bold;padding:3px 20px');
      }
      orig(...args);
    };
  })(console.info);

  console.error = (function (orig) {
    console.colored = true;

    return function (...args) {
      if (typeof args[0] === 'string' && args[0].indexOf('%c') !== 0) {
        args[0] = `%c (⛔️) ${args[0]}`;
        args.splice(1, 0, 'color: white;background-color: red;font-weight:bold;padding:3px 20px');
      }
      orig(...args);
    };
  })(console.error);

  console.warn = (function (orig) {
    console.colored = true;

    return function (...args) {
      if (typeof args[0] === 'string' && args[0].indexOf('%c') !== 0) {
        args[0] = `%c (⚠️️) ${args[0]}`;
        args.splice(1, 0, 'color: white;background-color: red;font-weight:bold;padding:3px 20px');
      }
      orig(...args);
    };
  })(console.warn);

  console.log('OVERRIDED');
}
