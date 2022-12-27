import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
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
  uri: CONFIG.GRAPHQL,
  cache: new InMemoryCache
});

let root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ApolloProvider client={CLIENT}>
          <App/>
        </ApolloProvider>
      </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
