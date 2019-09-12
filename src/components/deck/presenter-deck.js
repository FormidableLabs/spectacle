import React from 'react';
import PropTypes from 'prop-types';
import { DeckContext } from '../../hooks/use-deck';
import styled from 'styled-components';
import { Heading, Text } from '../typography';
import defaultTheme from '../../theme/default-theme';
import * as queryString from 'query-string';

const PresenterDeckContainer = styled('div')`
  height: calc(100vh - 8em);
  width: calc(100vw - 8em);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  padding: 4em;
  background-color: ${defaultTheme.colors.tertiary};
`;

const NotesColumn = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PreviewColumn = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PresentationHeader = styled(Heading)`
  align-items: flex-start;
  text-align: start;
`;

const SlidePreviewPlaceholder = styled('div')`
  flex: 1;
  background-color: ${defaultTheme.colors.primary};
`;

const Button = styled('button')`
  border: 0;
  width: 250px;
  padding: 1em;
  background-color: ${defaultTheme.colors.secondary};
  color: ${defaultTheme.colors.primary};
  font-size: ${defaultTheme.fontSizes.text};
`;

const PresenterDeck = props => {
  const {
    state: { currentNotes, currentSlide, currentSlideElement, immediate }
  } = React.useContext(DeckContext);

  const {
    isController,
    isReceiver,
    startConnection,
    terminateConnection
  } = props;

  const onStartConnection = React.useCallback(() => {
    const urlParams = queryString.stringify({
      slide: currentSlide,
      slideElement: currentSlideElement,
      immediate: immediate || undefined
    });
    startConnection(urlParams);
  }, [currentSlide, currentSlideElement, immediate, startConnection]);

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
        <Text lineHeight="180%">{currentNotes}</Text>
      </NotesColumn>
      <PreviewColumn>
        <PresentationHeader fontSize="subHeader">
          Current Slide:
        </PresentationHeader>
        <SlidePreviewPlaceholder />
        <PresentationHeader fontSize="subHeader">
          Next Slide:
        </PresentationHeader>
        <SlidePreviewPlaceholder />
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
