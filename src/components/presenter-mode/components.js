import styled from 'styled-components';

export const PresenterDeckContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  background-color: #282828;
  overflow: hidden;
`;

export const NotesColumn = styled('div')`
  padding: 0;
  display: flex;
  flex-direction: column;
  background: #383838;
  width: 50%;
  border-right: 1px solid black;
`;

export const PreviewColumn = styled('div')`
  background-color: black;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  > :first-child {
    margin-bottom: 0.5em;
  }
`;

export const SlideContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: calc(50% - 1em);
  width: 100%;
  overflow: hidden;
`;

export const SlideWrapper = styled('div')`
  flex: 1;
  width: 100%;
  position: relative;
  .spectacle-fullscreen-button {
    display: none;
  }
  ${({ small }) =>
    small &&
    css`
      flex: 0.8;
    `}
`;

export const SlideCountLabel = styled('span')`
  background: hsla(0, 0%, 100%, 0.1);
  border-radius: 4px;
  font-size: 0.7em;
  padding: 1px 4px;
`;

export const NotesContainer = styled('div')`
  border-top: 1px solid black;
  overflow-y: scroll;
  background: #404040;
  flex: 1;
`;

export const deckBackdropStyles = {
  currentSlide: {
    width: '50vw',
    height: '50vh',
    left: '50vw',
    top: '7vh'
  },
  nextSlide: {
    width: '50vw',
    height: '33vh',
    top: '60vh',
    left: '50vw'
  }
};
