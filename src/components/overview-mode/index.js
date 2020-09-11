import * as React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import Deck from '../deck/deck';

const SlideGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, 49%);
  grid-column-gap: 2%;
  grid-row-gap: 10px;
  width: 100%;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 32%);
    grid-column-gap: 2%;
    grid-row-gap: 10px;
  }

  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, 23.5%);
    grid-column-gap: 2%;
    grid-row-gap: 10px;
  }
`;

const OverviewBackdrop = styled('div')`
  background: black;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const SlideGridItem = styled('div')`
  height: 200px;
  .spectacle-progress-indicator,
  .spectacle-fullscreen-button {
    display: none;
  }
`;

const backdropStyle = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

export default function OverviewMode({ children, theme }) {
  return (
    <SlideGrid>
      <OverviewBackdrop />
      {children.map((child, idx) => (
        <SlideGridItem onClick={() => {}} key={`slide-${idx}`}>
          <Deck
            disableInteractivity
            useAnimations={false}
            theme={theme}
            backdropStyle={backdropStyle}
          >
            {child}
          </Deck>
        </SlideGridItem>
      ))}
    </SlideGrid>
  );
}

OverviewMode.propTypes = {
  children: propTypes.node.isRequired,
  theme: propTypes.object
};
