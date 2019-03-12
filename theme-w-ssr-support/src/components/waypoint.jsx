/* eslint react/prop-types: 0 */
// waypoint.jsx
/**
 * External dependencies
 */
import React, { useState, useEffect, forwardRef } from 'react';
import posed from 'react-pose';
import { Waypoint } from 'react-waypoint';
import styled from 'styled-components';

/**
 * Local dependencies
 */
import colors from '../lib/colors';

const StyledContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  justify-content: center;
  perspective: 1000px;
  perspective-origin: top left;
  background-color: ${colors.base};
  color: ${colors.base};
  a {/* eslint no-confusing-arrow: 0 */
    ${({ color }) => (!process.browser || color === colors.base) && 'color: inherit !important;'}
    transition: color 700ms ease;
  }
`;

const PosedContainer = posed(StyledContainer)({
  enter: {
    color: props => props.color || colors.black,
    backgroundColor: props => props.bgColor || colors.base,
    beforeChildren: true,
    transition: {
      duration: 600,
      ease: 'linear',
    },
  },
  exit: {
    color: colors.base,
    backgroundColor: colors.base,
    afterChildren: true,
    transition: {
      duration: 400,
      ease: 'linear',
    },
  },
  initialPose: 'exit',
});

export default forwardRef(
  (
    {
      as: Element = PosedContainer,
      other = true,
      onEnter = true,
      onLeave = false,
      children,
      ...rest
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      if (!mounted) {
        window.addEventListener('beforeunload', (event) => {
          event.preventDefault();
          setVisible(false);
        });
        setMounted(true);
      }
    });

    return (
      <Waypoint
        scrollableAncestor="window"
        bottomOffset={500}
        onEnter={() => onEnter && setVisible(true)}
        onLeave={() => onLeave && setVisible(false)}
      >
        <Element
          ref={ref}
          {...rest}
          pose={(visible && other) ? 'enter' : 'exit'}
        >
          {children}
        </Element>
      </Waypoint>
    );
  },
);
