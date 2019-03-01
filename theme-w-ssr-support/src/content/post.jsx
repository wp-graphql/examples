// post.jsx
/**
 * External dependencies
 */
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { post } from 'wp-graphql-composer';

/**
 * Local dependencies
 */
import Section from '../components/posed-elements';

const view = ({ postId, title, content, className, style }) => (
  <Section id={`post-${postId}`} className={className} style={ style }>
    <h2>{title}</h2>
    <div className="entry-content">
      {ReactHtmlParser(content)}
    </div>
  </Section>
);

export default post.compose({ view });
