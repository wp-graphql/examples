// client.jsx
/**
 * External dependencies
 */
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

/**
 * Local dependencies
 */
import App from './app';
import createClient from './create-client';
import * as serviceWorker from './serviceWorker';

const { ENDPOINT } = context;
const client = createClient(ENDPOINT);

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.hydrate(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
