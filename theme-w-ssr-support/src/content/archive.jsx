// archive.jsx
/**
 * External dependencies
 */
import React from 'react';
import { map } from 'lodash';
import { archive } from 'wp-graphql-composer';

/**
 * Local dependencies
 */
import Waypoint from '../components/waypoint';
import Section from '../components/posed-elements';
import colors from '../lib/colors';
import resultView from './post'

const nextColor = (i) => {
  switch(i % 3) {
    case 0:
      return {
        bgColor: colors.primaryLight,
        color: colors.white
      };
    case 1:
      return {
        bgColor: colors.primaryDark,
        color: colors.white
      };
    default:
      return { color: colors.white };
  }
}

const view = ({
  resultView: Result,
  header,
  noHeader,
  resultsData
}) => {
  const style = { minHeight: resultsData.length === 1 ? '95vh' : '45vh' };

  return (
    <React.Fragment>
      {!noHeader && (
        <Waypoint>
          <Section className="page-header">
            <h1 className="page-title">{header}</h1>
          </Section>
        </Waypoint>
      )}
      {map(resultsData, ({ id, ...r }, index) => (
        <Waypoint key={id} {...nextColor(index)}>
          <Result id={id} {...r} style={style} />
        </Waypoint>
      ))}
    </React.Fragment>
  );
};

export default archive.compose({ view, resultView, });