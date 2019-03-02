// client.js
/**
 * External dependencies
 */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'cross-fetch/polyfill';

export default uri => new ApolloClient({
  connectToDevTools: process.browser,
  ssrMode: !process.browser,
  link: createHttpLink({
    uri,
    credentials: 'same-origin',
  }),
  cache: process.browser
    ? new InMemoryCache().restore(window.APOLLO_STATE)
    : new InMemoryCache(),
});
