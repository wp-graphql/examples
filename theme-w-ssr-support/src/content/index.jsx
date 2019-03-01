/**
 * External dependencies
 */
import React from 'react';
import { main } from 'wp-graphql-composer';

/**
 * Local dependencies
 */
import archive from './archive';
import page from './page';
import post from './post';

const components = { archive, page, post };

/* eslint react/prop-types: 0 */
const view = ({ Routes }) => (
  <Routes {...components} />
);

export default main.compose({ view });
