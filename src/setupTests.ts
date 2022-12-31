/// <reference path="./lib/editableGrid/types/index.d.ts" />
/// <reference path="./lib/types/index.d.ts" />

// Allows you to do things like: `expect(element).toHaveTextContent(/react/i)`
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@types/node/index.d.ts';
import 'src/lib/utils';


let nodeCrypto = require('crypto');


if (!window.crypto) {
  window.crypto = {
    getRandomValues: function (buffer) {
      return nodeCrypto.randomFillSync(buffer);
    },
    randomUUID() {
      return nodeCrypto.randomUUID();
    }
  } as Crypto;
}
globalThis.window = window;
