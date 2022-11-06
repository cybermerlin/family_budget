import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from './store';
import App from './App';


const nodeCrypto = require('crypto');

window.crypto = {
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer);
  },
  randomUUID() { return nodeCrypto.randomUUID(); }
} as Crypto;
global.window = window;

test('Render App', () => {
  render(<Provider store={store}>
    <App/>
  </Provider>);

  const linkElement = screen.getByText(/Add Amount/i);

  expect(linkElement).toBeInTheDocument();
});
