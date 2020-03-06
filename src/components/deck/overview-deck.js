import * as React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const SlideGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 30vw);
  grid-column-gap: 3vw;
  grid-row-gap: 15px;
  padding: 15px;
  width: 100vw;
`;

const SlideGridItem = styled('div')`
  height: 200px;

  .spectacle-progress-indicator,
  .spectacle-fullscreen-button {
    display: none;
  }
`;

export default function OverviewDeck(props) {
  return (
    <SlideGrid>
      {props.children.map((child, idx) => (
        <SlideGridItem
          onClick={() => props.goToSlide(idx)}
          key={`slide-${idx}`}
        >
          {child}
        </SlideGridItem>
      ))}
    </SlideGrid>
  );
}

OverviewDeck.propTypes = {
  children: propTypes.node,
  goToSlide: propTypes.func.isRequired
};
