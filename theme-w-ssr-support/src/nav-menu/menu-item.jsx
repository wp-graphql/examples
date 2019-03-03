/* eslint react/prop-types: 0 */
// menu-item.jsx
/**
 * External dependencies
 */
import React from 'react';
import posed from 'react-pose';
import { Link } from 'react-router-dom';
import { menuItem } from 'wp-graphql-composer';

/**
 * Local dependencies
 */
import { StyledItem } from './styled';

export const PosedItem = posed(StyledItem)({
  enter: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 50,
    opacity: 0,
  },
  initialPose: 'exit',
});

const isRelativeLink = url => url.startsWith(context.HOME_URL);

const view = ({ url, label, onClick }) => (
  <PosedItem>
    { isRelativeLink(url)
      // eslint-disable-next-line
      ? <Link to={`${url.substring(context.HOME_URL.length)}`} onClick={onClick} onKeyPress={onClick}>{label}</Link>
      : <a href={url} onClick={onClick} onKeyPress={onClick}>{label}</a>
    }
  </PosedItem>
);

export default menuItem.compose({ view });
