import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import CONFIG from 'src/config.json';
import App from './App';
import { store } from './store';


test('Render App', () => {
  const CLIENT = new ApolloClient({
    link: new HttpLink({
      uri: CONFIG.GRAPHQL
      // eslint-disable-next-line capitalized-comments
      // headers: { authorizetion: `Bearer ${process.env.GITHUB_TOKEN}` }
    }),
    cache: new InMemoryCache
  });

  render(
      <ApolloProvider client={CLIENT}>
        <Provider store={store}>
          <App/>
        </Provider>
      </ApolloProvider>
  );

  let linkElement = screen.getByText(/add amount/i);

  expect(linkElement).toBeInTheDocument();
});
