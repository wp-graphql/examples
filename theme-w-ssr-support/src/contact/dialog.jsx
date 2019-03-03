/* eslint react/prop-types: 0 */
// alert.jsx
/**
 * External dependencies
 */
import React, { forwardRef } from 'react';
import posed from 'react-pose';
import styled from 'styled-components';

/**
 * Local dependencies
 */
import colors from '../lib/colors';

const StyledBox = styled.div`
  background-color: ${colors.primaryDark};
  color: ${colors.white};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  min-height: 30vh;
  padding: 0;
  margin: 0;

  @media screen and (min-width:1024px) {
    width: 65vw;
  }
`;

export const Dialog = posed(StyledBox)({
  success: {
    opacity: 0.8,
    x: '-50%',
    y: '-50%',
    beforeChildren: true,
    transition: {
      x: {
        type: 'keyframes',
        values: ['-150%', '-50%'],
        times: [0, 1],
      },
      duration: 700,
    },
  },
  error: {
    opacity: 0.8,
    x: '-50%',
    y: '-50%',
    backgroundColor: colors.error,
    color: colors.white,
    beforeChildren: true,
    transition: {
      x: {
        type: 'keyframes',
        values: ['-150%', '-50%'],
        times: [0, 1],
      },
      duration: 700,
    },
  },
  hide: {
    opacity: 0,
    x: '150%',
    y: '-50%',
    transition: {
      x: {
        type: 'keyframes',
        values: ['-50%', '150%'],
        times: [0, 1],
      },
      duration: 650,
      delay: 500,
    },
  },
  initialPose: 'hide',
});

const DialogHeader = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate( -50%, -50% );
  font-size: 1.1em;

  @media screen and (min-width:768px) {
    font-size: 0.9em;
  }

  @media screen and (min-width:1024px) {
    font-size: 0.8em;
  }
`;

const RawMessage = forwardRef(({ error, data }, ref) => {
  let message = '';
  if (error) {
    message = 'Sorry, something went wrong. Try again, later';
  } else if (data) {
    const { message: msg } = data.sendInquiry;
    message = msg;
  }

  return (<DialogHeader ref={ref}>{message}</DialogHeader>);
});

export const Message = posed(RawMessage)(
  {
    enter: { opacity: 1, duration: 500 },
    exit: { opacity: 0, duration: 600 },
    initialPose: 'exit',
  },
);
