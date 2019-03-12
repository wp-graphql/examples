// server.jsx
/**
 * External dependencies
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';

/**
 * Local dependencies
 */
import App from '../app';
import createClient from '../create-client';

async function server({ ENDPOINT, LOCATION }) {
  const sheet = new ServerStyleSheet();
  const client = createClient(ENDPOINT);

  const Root = () => (
    <StaticRouter location={LOCATION} context={{}}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StaticRouter>
  );

  await getDataFromTree(<Root />);
  const content = renderToString(sheet.collectStyles(<Root />));
  const style = sheet.getStyleTags();
  const state = client.extract();

  return { content, style, state };
}

export default server;
