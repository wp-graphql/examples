// server.jsx
/**
 * External dependencies
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

/**
 * Local dependencies
 */
import App from './app';
import './index.scss';

const sheet = new ServerStyleSheet();

/* eslint-disable-next-line */
const markup = renderToString(
  <StaticRouter location={context.LOCATION} context={{}}>
    <StyleSheetManager sheet={sheet.instance}>
      <App />
    </StyleSheetManager>
  </StaticRouter>
);

/* eslint-disable-next-line */
const styling = sheet.getStyleTags(); 
dispatch(JSON.stringify({ markup, styling }));