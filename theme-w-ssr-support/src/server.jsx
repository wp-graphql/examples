// server.jsx
/**
 * External dependencies
 */
import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'cross-fetch';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

/**
 * Local dependencies
 */
import App from './app';
import './index.scss';

const sheet = new ServerStyleSheet();

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: context.ENDPOINT,
    credentials: 'same-origin',
    fetch,
  }),
  cache: new InMemoryCache(),
});

/* eslint react/prop-types: 0 */
/* eslint react/no-danger: 0 */
const Markup = ({ content, state }) => (
  <React.Fragment>
    <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
      }}
    />
  </React.Fragment>
);

renderToStringWithData(() => (
  /* eslint-disable-next-line */
  <StaticRouter location={context.LOCATION} context={{}}>
    <StyleSheetManager sheet={sheet.instance}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StyleSheetManager>
  </StaticRouter>
))
  .then((content) => {
    const initialState = client.extract();
    const styling = sheet.getStyleTags();
    dispatch(JSON.stringify({
      markup: renderToStaticMarkup(<Markup content={content} state={initialState} />),
      styling,
    }));
  });
