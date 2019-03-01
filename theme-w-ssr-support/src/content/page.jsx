// page.jsx
/**
 * External dependencies
 */
import React from 'react';
import { page } from 'wp-graphql-composer';
import ReactHtmlParser from 'react-html-parser'

/**
 * Local dependencies
 */

import Section from '../components/posed-elements';

const view = ({ pageId, title, content, className, style }) => (
  <Section id={`page-${pageId}`} className={className} style={ style }>
    <h2>{title}</h2>
    <div className="entry-content">
      {ReactHtmlParser(content)}
    </div>
  </Section>
);

export default page.compose({ view });
