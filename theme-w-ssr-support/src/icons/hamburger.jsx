/* eslint react/prop-types: 0 */
// hamburger.jsx
/**
 * External dependencies
 */
import React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Local dependencies
 */
import colors from '../lib/colors';
import mask from './hamburger-mask.svg';

const dashIn = keyframes`
  0% {
    stroke-dashoffset: 240;
  }
  40% {
    stroke-dashoffset: 240;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const dashOut = keyframes`
  0% {
    stroke-dashoffset: 0;
  }
  40% {
    stroke-dashoffset: 240;
  }
  100% {
    stroke-dashoffset: 240;
  }
`;

const rotateOut = keyframes`
  0% {
    transform: rotate(0deg);
  }
  40% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotateIn = keyframes`
  0% {
    transform: rotate(360deg);
  }
  40% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const bunTopOut = keyframes`
  0% {
    left: 0;
    top: 0;
    transform: rotate(0deg);
  }
  20% {
    left: 0;
    top: 0;
    transform: rotate(15deg);
  }
  80% {
    left: -5px;
    top: 0;
    transform: rotate(-60deg);
  }
  100% {
    left: -5px;
    top: 1px;
    transform: rotate(-45deg);
  }
`;

const bunBotOut = keyframes`
  0% {
    left: 0;
    transform: rotate(0deg);
  }
  20% {
    left: 0;
    transform: rotate(-15deg);
  }
  80% {
    left: -5px;
    transform: rotate(60deg);
  }
  100% {
    left: -5px;
    transform: rotate(45deg);
  }
`;

const bunTopIn = keyframes`
  0% {
    left: -5px;
    bot: 0;
    transform: rotate(-45deg);
  }
  20% {
    left: -5px;
    bot: 0;
    transform: rotate(-60deg);
  }
  80% {
    left: 0;
    bot: 0;
    transform: rotate(15deg);
  }
  100% {
    left: 0;
    bot: 1px;
    transform: rotate(0deg);
  }
`;

const bunBotIn = keyframes`
  0% {
    left: -5px;
    transform: rotate(45deg);
  }
  20% {
    left: -5px;
    bot: 0;
    transform: rotate(60deg);
  }
  80% {
    left: 0;
    bot: 0;
    transform: rotate(-15deg);
  }
  100% {
    left: 0;
    transform: rotate(0deg);
  }
`;

const burgerFillIn = keyframes`
  0% {
    width: 0;
    left: 36px;
  }
  40% {
    width: 0;
    left: 40px;
  }
  80% {
    width: 36px;
    left: -6px;
  }
  100% {
    width: 36px;
    left: 0px;
  }
`;

const burgerFillOut = keyframes`
  0% {
    width: 36px;
    left: 0px;
  }
  20% {
    width: 42px;
    left: -6px;
  }

  40% {
    width: 0;
    left: 40px;
  }

  100% {
    width: 0;
    left: 36px;
  }
`;

const Container = styled.div.attrs(({ color, animation, scale }) => ({
  color: color || colors.black,
  animation: animation || '0.6s',
  scale: scale || 1,
}))`
  transform: scale(${props => props.scale});
  position: relative;
  display: block;
  width: 68px;
  height: 68px;
  -webkit-touch-callout: none;
  user-select: none;
  
  &.is-open {
    .path {
      animation: ${dashIn} ${props => props.animation} linear normal;
      animation-fill-mode:forwards;
    }
    .animate-path {
      animation: ${rotateIn} ${props => props.animation} linear normal;
      animation-fill-mode:forwards;
    }
    .burger-bun-top {
      animation: ${bunTopOut} ${props => props.animation} linear normal;
      animation-fill-mode:forwards;
    }
    .burger-bun-bot {
      animation: ${bunBotOut} ${props => props.animation} linear normal;
      animation-fill-mode:forwards;
    }
    .burger-filling {
      animation: ${burgerFillOut} ${props => props.animation} linear normal;
      animation-fill-mode:forwards;
    }
  }

  &.is-closed {
    .path {
      animation: ${dashOut} ${props => props.animation} linear normal;
      animation-fill-mode:forwards;
    }
    .animate-path {
      animation: ${rotateOut} ${props => props.animation} linear normal;
      animation-fill-mode:forwards;
    }
    .burger-bun-top {
      animation: ${bunTopIn} ${props => props.animation} linear normal;
      animation-fill-mode:forwards;
    }
    .burger-bun-bot {
      animation: ${bunBotIn} ${props => props.animation} linear normal;
      animation-fill-mode:forwards;
    }
    .burger-filling {
      animation: ${burgerFillIn} ${props => props.animation} linear normal;
      animation-fill-mode:forwards;
    }
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  .path {
    stroke-dasharray: 240;
    stroke-dashoffset: 240;
    stroke-linejoin: round;
  }

  .path-burger {
    position: absolute;
    top: 0;
    left: 0;
    height: 68px;
    width: 68px;
    mask: url(#mask);
    -webkit-mask-box-image: url("${mask}");
  }

  .animate-path {
    position: absolute;
    top: 0;
    left: 0;
    width: 68px;
    height: 68px;
  }

  .path-rotation {
    height: 34px;
    width: 34px;
    margin: 34px 34px 0 0;
    transform: rotate(0deg);
    transform-origin: 100% 0;
    &:before {
      content: '';
      display: block;
      width: 30px;
      height: 34px;
      margin: 0 4px 0 0;
      background: ${props => props.color};
    }
  }

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const Icon = styled.div.attrs(({ color }) => ({ color: color || colors.black }))`
  position: absolute;
  padding: 20px 16px;
  height: 68px;
  width: 68px;

  .burger-container {
    position: relative;
    height: 28px;
    width: 36px;
  }

  .burger-bun-top,
  .burger-bun-bot,
  .burger-filling {
    position: absolute;
    display: block;
    height: 4px;
    width: 36px;
    border-radius: 2px;
    background: ${props => props.color};
  }

  .burger-bun-top {
    top: 0;
    transform-origin: 34px 2px;
  }

  .burger-bun-bot {
    bottom: 0;
    transform-origin: 34px 2px;
  }

  .burger-filling {
    top: 12px;
  }
`;

const Ring = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 68px;
  height: 68px;

  .svg-ring {
    width: 68px;
    height: 68px;
  }
`;

/**
 * Adapted from Kyle Herwood's SVG CSS3 Menu / Burger Button codepen
 * @link https://codepen.io/kylehenwood/pen/Alayb
 * @return { React.Component }
 */
export default ({ onClick, visible }) => (
  <Container
    className={visible ? 'is-open' : 'is-closed'}
    onClick={onClick}
    scale={0.705882352941}
    color={visible ? colors.white : colors.black}
  >
    <Icon className="burger-icon" color={visible ? colors.white : colors.black}>
      <div className="burger-container">
        <span className="burger-bun-top" />
        <span className="burger-filling" />
        <span className="burger-bun-bot" />
      </div>
    </Icon>
    <Ring className="burger-ring">
      <svg className="svg-ring">
        <path
          className="path"
          fill="none"
          stroke={visible ? colors.white : colors.black}
          strokeMiterlimit="10"
          strokeWidth="4"
          d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2"
        />
      </svg>
    </Ring>
    <svg
      width="0"
      height="0"
    >
      <mask id="mask">
        <path
          fill="none"
          stroke="#ff0000"
          strokeMiterlimit="10"
          strokeWidth="4"
          d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4"
        />
      </mask>
    </svg>
    <div className="path-burger">
      <div className="animate-path">
        <div className="path-rotation" />
      </div>
    </div>
  </Container>
);
