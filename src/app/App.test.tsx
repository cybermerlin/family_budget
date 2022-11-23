import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';


test('Render App', () => {
  render(<Provider store={store}>
    <App/>
  </Provider>);

  let linkElement = screen.getByText(/add amount/i);

  expect(linkElement).toBeInTheDocument();
});
