// page.jsx
/**
 * External dependencies
 */
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { page } from 'wp-graphql-composer';

/**
 * Local dependencies
 */

import Section from '../components/posed-elements';

/* eslint react/prop-types: 0 */
const view = ({
  pageId, title, content, className, style,
}) => (
  <Section id={`page-${pageId}`} className={className} style={style}>
    <h2>{title}</h2>
    <div className="entry-content">
      {ReactHtmlParser(content)}
    </div>
  </Section>
);

export default page.compose({ view });
