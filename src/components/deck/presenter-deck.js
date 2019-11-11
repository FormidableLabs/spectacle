import React from 'react';
import PropTypes from 'prop-types';
import { DeckContext } from '../../hooks/use-deck';
import styled from 'styled-components';
import { Text } from '../typography';
import { FlexBox } from '../layout';
import * as queryString from 'query-string';
import { Timer } from './timer';
import SpectacleLogo from '../logo';
import InternalButton from '../internal-button';

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
  padding: 0 4em;
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

const SlideContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: calc(50% - 1em);
  width: 100%;
  overflow: hidden;
`;

const SlideWrapper = styled('div')`
  flex: 1;
  position: relative;

  .spectacle-fullscreen-button {
    display: none;
  }
`;

const SlideCountLabel = styled('span')`
  background: hsla(0, 0%, 100%, 0.1);
  border-radius: 4px;
  font-size: 0.7em;
  padding: 1px 4px;
`;

const NotesContainer = styled('div')`
  overflow-y: scroll;
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
        <FlexBox justifyContent="space-between">
          <SpectacleLogo />
          {!isController && !isReceiver && (
            <InternalButton onClick={onStartConnection}>
              Cast to Secondary Display
            </InternalButton>
          )}
          {isController && !isReceiver && (
            <InternalButton onClick={terminateConnection}>
              Stop Casting
            </InternalButton>
          )}
        </FlexBox>
        <Timer />
        <Text fontSize={20} fontWeight="bold">
          Notes:
        </Text>
        <NotesContainer>
          <Text lineHeight="180%" fontSize="18px">
            {currentNotes}
          </Text>
        </NotesContainer>
      </NotesColumn>
      <PreviewColumn>
        <SlideContainer>
          <Text fontSize={20} fontWeight="bold" textAlign="center">
            Current&nbsp;
            <SlideCountLabel>
              Slide {activeSlide.props.slideNum + 1} of {numberOfSlides}
            </SlideCountLabel>
          </Text>
          <SlideWrapper>{activeSlide}</SlideWrapper>
        </SlideContainer>
        <SlideContainer>
          <Text fontSize={20} fontWeight="bold" textAlign="center">
            Next&nbsp;
            <SlideCountLabel>
              Slide {nextSlide.props.slideNum + 1} of {numberOfSlides}
            </SlideCountLabel>
          </Text>
          <SlideWrapper>{nextSlide}</SlideWrapper>
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
