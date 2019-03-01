// client.jsx
/**
 * External dependencies
 */
import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'cross-fetch';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

/**
 * Local dependencies
 */
import App from './app';
import * as serviceWorker from './serviceWorker';
import './index.scss';

const client = new ApolloClient({
  link: createHttpLink({
    uri: context.ENDPOINT,
    credentials: 'same-origin',
    fetch,
  }),
  /* eslint-disable-next-line */
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  ssrForceFetchDelay: 100,
});

ReactDOM.hydrate(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
