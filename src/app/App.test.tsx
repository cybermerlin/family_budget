import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from './store';
import App from './App';


test('Render App', () => {
  render(<Provider store={store}>
    <App/>
  </Provider>);

  const linkElement = screen.getByText(/Add Amount/i);

  expect(linkElement).toBeInTheDocument();
});
