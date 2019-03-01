// posed-elements.js
/**
 * External dependencies
 */
import posed from 'react-pose';
import styled from 'styled-components';

const StyledSection = styled.section.attrs(({
  block, row, wrap, justify, align,
}) => ({
  display: block ? 'block' : 'flex',
  flexDirection: row ? 'row' : 'column',
  flexWrap: wrap ? 'wrap' : 'nowrap',
  justifyContent: justify || 'center',
  alignItems: align || 'center',
}))`
  position: relative;
  overflow: hidden;
  display: ${props => props.display};
  flex-direction: ${props => props.flexDirection};
  flex-wrap: ${props => props.flexWrap};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  padding: 2em ${({ noXPadding }) => {
    if (noXPadding) {
      return '0';
    }
    return '0.925em';
  }};

  .icon {
    width: 30%;
    padding: 0;
  }
  p { margin-top: 0; }

  .scroll-icon {
    width: 10%;
    &.desktop { display: none; }
  }

  *:first-child {
    margin-top: 0;
  }

  *:last-child {
    margin-bottom: 0;
  }

  @media screen and (min-width: 768px) {
    padding: 2em ${({ noXPadding }) => {
    if (noXPadding) {
      return '0';
    }
    return '1.850em';
  }};

    .icon { width: 20%; }
    .scroll-icon { width: 7%; }
  }

  @media screen and (min-width: 1024px) {
    max-width: 960px;
    margin: 0 auto;

    .icon { width: 20%; }
    .scroll-icon { 
      width: 3%;
      
      &.mobile { display: none; }
    }
  }
`;

export default posed(StyledSection)({
  enter: {
    opacity: 1,
    beforeChildren: true,
    transition: {
      duration: 700,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    afterChildren: true,
    transition: {
      duration: 400,
      ease: 'easeIn',
    },
  },
  initialPose: 'exit',
});
