/* eslint react/prop-types: 0 */
// menu.jsx
/**
 * External dependencies
 */
import React, { Fragment, useState, useRef } from 'react';
import { map } from 'lodash';
import posed from 'react-pose';
import { withRouter } from 'react-router-dom';
import { menu } from 'wp-graphql-composer';

/**
 * Local dependencies
 */
import Logo from '../icons/logo';
import Hamburger from '../icons/hamburger';
import Waypoint from '../components/waypoint';
import MenuItem from './menu-item';
import { StyledNavbar, StyledMenu, Overlay } from './styled';

const PosedNavbar = posed(StyledNavbar)({
  enter: {
    y: 0,
    transition: { duration: 690, ease: 'linear' },
  },
  exit: { y: -50 },
  initialPose: 'exit',
});

const PosedMenu = posed(StyledMenu)({
  enter: {
    delayChildren: 800,
    staggerChildren: 100,
  },
  exit: {},
});

const view = ({ slug, items }) => {
  const [menuOpen, toggleMenu] = useState(false);
  const barRef = useRef(null);

  const onClick = () => toggleMenu(false);
  return (
    <Fragment>
      <Waypoint id={`menu-${slug}`} ref={barRef} as={PosedNavbar} className="nav" menuOpen={menuOpen}>
        <Logo fromLeft className="logo" text />
        <Hamburger onClick={() => toggleMenu(!menuOpen)} visible={menuOpen} />
        <PosedMenu pose={menuOpen ? 'enter' : 'exit'}>
          { map(
            items,
            ({ id, ...rest }) => <MenuItem key={id} id={id} {...rest} onClick={onClick} />,
          )}
        </PosedMenu>
      </Waypoint>
      <Overlay className="overlay" menuOpen={menuOpen} />
    </Fragment>
  );
};


export default menu.compose({
  view,
  whileLoading: { view: () => null },
  forError: { view: () => null },
  extraHOCs: [withRouter],
});
