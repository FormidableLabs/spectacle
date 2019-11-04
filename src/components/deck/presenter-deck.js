import React from 'react';
import PropTypes from 'prop-types';
import { DeckContext } from '../../hooks/use-deck';
import styled, { css } from 'styled-components';
import { compose, color, typography } from 'styled-system';
import { Heading, Text } from '../typography';
import * as queryString from 'query-string';
import { Timer } from './timer';

const PresenterDeckContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  background-color: #282828;
  padding: 2em;
  overflow: hidden;
`;

const NotesColumn = styled('div')`
  padding: 2em 4em;
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const PreviewColumn = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  > :first-child {
    margin-bottom: 0.5em;
  }
`;

const PresentationHeader = styled(Heading)`
  align-items: flex-start;
  text-align: start;
  margin-bottom: 0;
`;

const SlideContainer = styled('div')`
  height: calc(50% - 1em);
  width: 100%;
`;

const SlideName = styled(Text)`
  position: relative;
  top: 2em;
  left: 0;
  margin: 0;
  z-index: 1;
`;

const Button = styled('button')(
  compose(
    color,
    typography
  ),
  css`
    border: 0;
    width: 8em;
    padding: 1em;
    margin-left: 16px;
  `
);
Button.defaultProps = {
  backgroundColor: 'secondary',
  color: 'primary',
  fontSize: '18px'
};

const NotesContainer = styled.div`
  min-height: 30%;
`;

const PresenterDeck = props => {
  const {
    state: {
      currentNotes,
      currentSlide,
      currentSlideElement,
      immediate,
      numberOfSlides
    }
  } = React.useContext(DeckContext);

  const {
    isController,
    isReceiver,
    startConnection,
    terminateConnection,
    children
  } = props;

  const onStartConnection = React.useCallback(() => {
    const urlParams = queryString.stringify({
      slide: currentSlide,
      slideElement: currentSlideElement,
      immediate: immediate || undefined
    });
    startConnection(urlParams);
  }, [currentSlide, currentSlideElement, immediate, startConnection]);

  const activeSlide =
    children.length > currentSlide ? children[currentSlide] : null;
  const nextSlide =
    children.length > currentSlide + 1 ? children[currentSlide + 1] : null;

  return (
    <PresenterDeckContainer>
      <NotesColumn>
        <Text>{`Slide ${currentSlide + 1} of ${numberOfSlides}`}</Text>
        <Timer />
        <PresentationHeader fontSize="subHeader">Notes:</PresentationHeader>
        <NotesContainer>
          <Text lineHeight="180%" fontSize="18px">
            {currentNotes}
          </Text>
        </NotesContainer>
        {!isController && !isReceiver && (
          <Button onClick={onStartConnection}>Start Connection</Button>
        )}
        {isController && !isReceiver && (
          <Button onClick={terminateConnection}>Terminate Connection</Button>
        )}
      </NotesColumn>
      <PreviewColumn>
        <SlideContainer>
          <SlideName fontSize="18px">Current slide</SlideName>
          {activeSlide}
        </SlideContainer>
        <SlideContainer>
          <SlideName fontSize="18px">Next slide</SlideName>
          {nextSlide}
        </SlideContainer>
      </PreviewColumn>
    </PresenterDeckContainer>
  );
};

PresenterDeck.propTypes = {
  children: PropTypes.node.isRequired,
  isController: PropTypes.bool.isRequired,
  isReceiver: PropTypes.bool.isRequired,
  startConnection: PropTypes.func.isRequired,
  terminateConnection: PropTypes.func.isRequired
};

export default PresenterDeck;
