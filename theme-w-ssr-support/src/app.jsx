/* eslint react/prop-types: 0 */
// app.js
/**
 * External dependencies
 */
import React, { Fragment, useState, useEffect } from 'react';
import { HttpLink } from 'apollo-link-http';
import { WPProvider } from 'wp-graphql-composer';
import styled from 'styled-components';

/**
 * Local dependencies
 */
import Navbar from './nav-menu';
import Footer from './footer';
import Content from './content';

const Main = styled.main`
  position: relative;
  padding: 0;
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
`;

const App = ({ endpoint }) => {
  const [httpLink, setLink] = useState(null);
  useEffect(() => {
    if (!httpLink) {
      setLink(new HttpLink({ uri: endpoint, credentials: 'same-origin' }));
    }
  });

  return httpLink && (
    <WPProvider link={httpLink}>
      <Fragment>
        <Navbar location="MAIN" />
        <Main>
          <Content />
        </Main>
        <Footer />
      </Fragment>
    </WPProvider>
  );
};

export default App;
