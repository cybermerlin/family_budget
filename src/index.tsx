import { ApolloClient, ApolloProvider, gql, HttpLink, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import CONFIG from 'src/config.json';
import App from './app/App';
import { store } from './app/store';

import './index.scss';
import './lib/utils';
import reportWebVitals from './reportWebVitals';


const CLIENT = new ApolloClient({
  link: new HttpLink({
    uri: CONFIG.GRAPHQL
    // eslint-disable-next-line capitalized-comments
    // headers: { authorizetion: `Bearer ${process.env.GITHUB_TOKEN}` }
  }),
  cache: new InMemoryCache
});

const MISSIONS_QUERY = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

CLIENT.query({
  query: MISSIONS_QUERY
})
      .then(console.info);

let root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ApolloProvider client={CLIENT}>
      <React.StrictMode>
        <Provider store={store}>
          <App/>
        </Provider>
      </React.StrictMode>
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
