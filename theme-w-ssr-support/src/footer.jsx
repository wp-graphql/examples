// footer.js
/**
 * External dependencies
 */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * Local dependencies
 */
import colors from './lib/colors';

const Footer = styled.div.attrs(({ bgColor, color }) => ({
  bgColor: bgColor || colors.black,
  color: color || colors.white,
}))`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};

  position: relative;
  z-index: 4;
  padding: 1em 0.925em;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: content;

  @media screen and (min-width: 768px) {
    
  }

  @media screen and (min-width: 1024px) {
    
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    
  }

  @media screen and (min-width: 1024px) {
    
  }
`;

const Item = styled.li`
  font-size: 0.9em;
  padding: 0 0.4625em;

  &:first-of-type { 
    padding-left: 0;
    text-align: left;
  }
  &:last-of-type {
    padding-right: 0;
    text-align: right;
  }

  @media screen and (min-width: 768px) {
    padding: 0 0.925em;
    font-size: 1em;
  }

  @media screen and (min-width: 1024px) {
    font-size: 0.6em;
  }
`;

const Copyright = styled.h4`
  font-size: 0.8em;
  color: ${colors.gray};
  margin: 0.925em 0 0;
  text-align: center;

  @media screen and (min-width: 1024px) {
    margin: 1.5em 0 0;
    font-size: 0.5em;
  }
`;

export default () => {
  const year = new Date().getFullYear();
  return (
    <Footer>
      <List>
        <Item><Link to="/terms">Terms of Service</Link></Item>
        <Item><Link to="/privacy">Privacy Policy</Link></Item>
      </List>
      <Copyright>
        AxisTaylor &copy; 2015-
        {year}
      </Copyright>
    </Footer>
  );
};
