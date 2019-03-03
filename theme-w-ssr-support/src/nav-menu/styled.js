// styled.js
/**
 * External dependencies
 */
import styled from 'styled-components';

/**
 * Local dependencies
 */
import colors from '../lib/colors';

export const StyledNavbar = styled.nav.attrs(({ menuOpen }) => ({
  color: menuOpen ? '#fff' : '#1c1f20',
  backgroundColor: menuOpen ? 'transparent' : '#e3e3e3dd',
  transition: menuOpen ? 'color 750ms linear 650ms' : 'color 750ms linear',
  boxShadow: menuOpen ? 'none' : '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',
}))`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  padding: 0.5em 1em;
  padding-right: 0;
  justify-content: stretch;
  align-items: center;
  color: ${props => props.color};
  transition:
    ${props => props.transition};
  transform: translateY(-100%);

  &::before {
    content: "";
    position: absolute;
    z-index: -3;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.backgroundColor};
    box-shadow: ${props => props.boxShadow};
  }

  .logo {
    display: inline-block;
    flex-basis: 39%;
    margin-right: auto;
    padding: 0;
    padding-right: 0.2em;
  }

  @media screen and (min-width: 768px) {
    padding: 0.2em 1em;
    padding-right: 0;
    .logo {
      flex-basis: 24%;
    }
  }

  @media screen and (min-width: 1024px) {
    flex-wrap: nowrap;
    padding: 0.5em 1em;
    .logo { 
      flex-basis: 14%;
    }
  }
`;

export const styledMenu = element => styled(element)`
  display: none;
  margin: 0;
  padding: 0.5em 1em 0.5em 0;
  list-style-type: none;
  flex-basis: 100%;
  flex-flow: column nowrap;
  align-items: center;

  ${({ pose }) => pose === 'enter' && 'display: inline-flex;'}

  @media screen and (min-width: 1024px) {
    padding: 0;
    flex-basis: auto;
    display: inline-flex;
    flex-flow: row nowrap;
    margin-left: auto;
  }
`;

export const StyledItem = styled.li`
  padding: 1em 0;
  font-size: 1.1em;
  font-weight: 500;

  @media screen and (min-width: 1024px) {
    opacity: 1 !important;
    transform: translateX(0) !important;
    font-size: 0.6em;
    padding: 0 1em;

    &:last-of-type { padding-right: 0; }
  }
`;

export const Overlay = styled.div.attrs(({ menuOpen }) => ({
  backgroundColor: menuOpen ? colors.black : colors.base,
  zIndex: menuOpen ? '5' : '-5',
}))`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: ${props => props.zIndex};
  background-color: ${props => props.backgroundColor};
  transition: background-color 650ms linear 100ms, z-index 100ms linear;

  ${({ menuOpen }) => !menuOpen && 'transition: background-color 500ms linear, z-index 100ms linear 500ms;'}
`;
