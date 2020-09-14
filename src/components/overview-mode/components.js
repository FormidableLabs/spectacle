import styled from 'styled-components';

export const SlideGrid = styled('div')`
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

export const OverviewBackdrop = styled('div')`
  background: black;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

export const SlideGridItem = styled('div')`
  height: 200px;
  .spectacle-progress-indicator,
  .spectacle-fullscreen-button {
    display: none;
  }
`;

export const backdropStyle = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

export const RenderDeck = styled('div')`
  height: 0;
  visibility: hidden;
`;
