// / <reference path="./lib/editableGrid/types/typesEditableGrid.d.ts" />

// Allows you to do things like: `expect(element).toHaveTextContent(/react/i)`
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


let nodeCrypto = require('crypto');


window.crypto = {
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer);
  },
  randomUUID() {
    return nodeCrypto.randomUUID();
  }
} as Crypto;
globalThis.window = window;
debugger;
console.log(EDataTypes.UNDEFINED);
// https://github.com/kulshekhar/ts-jest/discussions/3936
