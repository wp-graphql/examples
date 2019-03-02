/* eslint react/prop-types: 0 */
// app.js
/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import styled from 'styled-components';

/**
 * Local dependencies
 */
import Navbar from './nav-menu';
import Footer from './footer';
import Content from './content';
import './index.scss';

const Main = styled.main`
  position: relative;
  padding: 0;
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
`;

export default () => (
  <Fragment>
    <Navbar location="MAIN" />
    <Main>
      <Content />
    </Main>
    <Footer />
  </Fragment>
);
