import React from 'react';
import PropTypes from 'prop-types';
import { DeckContext } from '../../hooks/use-deck';
import styled, { css } from 'styled-components';
import { compose, color, typography } from 'styled-system';
import { Heading, Text } from '../typography';
import * as queryString from 'query-string';

const PresenterDeckContainer = styled('div')`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  background-color: black;
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
`;

const PresentationHeader = styled(Heading)`
  align-items: flex-start;
  text-align: start;
`;

const SlideContainer = styled('div')`
  height: calc(50% - 1em);
  width: 100%;
  overflow: hidden;
`;

const SlideDivider = styled('div')`
  height: 2em;
`;

const Button = styled('button')(
  compose(
    color,
    typography
  ),
  css`
    border: 0;
    width: 300px;
    padding: 1em;
    margin-bottom: 1em;
  `
);
Button.defaultProps = {
  backgroundColor: 'secondary',
  color: 'primary',
  fontSize: 'text'
};

const PresenterDeck = props => {
  const {
    state: { currentNotes, currentSlide, currentSlideElement, immediate }
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
        {!isController && !isReceiver && (
          <Button onClick={onStartConnection}>Start Connection</Button>
        )}
        {isController && !isReceiver && (
          <Button onClick={terminateConnection}>Terminate Connection</Button>
        )}
        <PresentationHeader fontSize="subHeader">Notes:</PresentationHeader>
        <Text lineHeight="180%" fontSize="18px">
          {currentNotes}
        </Text>
      </NotesColumn>
      <PreviewColumn>
        <SlideContainer>{activeSlide}</SlideContainer>
        <SlideDivider />
        <SlideContainer>{nextSlide}</SlideContainer>
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
