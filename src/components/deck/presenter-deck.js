import React from 'react';
import PropTypes from 'prop-types';
import { DeckContext } from '../../hooks/use-deck';
import styled, { css } from 'styled-components';
import { Text } from '../typography';
import { FlexBox, Box } from '../layout';
import * as queryString from 'query-string';
import { Timer } from './timer';
import SpectacleLogo from '../logo';
import InternalButton from '../internal-button';
import { SYSTEM_FONT } from '../../utils/constants';
import 'broadcastchannel-polyfill';

const PresenterDeckContainer = styled('div')`
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

const NotesColumn = styled('div')`
  padding: 0;
  display: flex;
  flex-direction: column;
  background: #383838;
  width: 50%;
  border-right: 1px solid black;
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

const SlideCountLabel = styled('span')`
  background: hsla(0, 0%, 100%, 0.1);
  border-radius: 4px;
  font-size: 0.7em;
  padding: 1px 4px;
`;

const NotesContainer = styled('div')`
  border-top: 1px solid black;
  overflow-y: scroll;
  background: #404040;
  flex: 1;
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

  const castButton = React.useMemo(() => {
    if (isReceiver || typeof window.navigator.presentation === 'undefined') {
      return null;
    }
    if (isController) {
      return (
        <InternalButton
          data-testid="Close Connection"
          onClick={terminateConnection}
        >
          Stop Casting
        </InternalButton>
      );
    }
    return (
      <InternalButton
        data-testid="Start Connection"
        onClick={onStartConnection}
      >
        Cast to Secondary Display
      </InternalButton>
    );
  }, []);

  return (
    <PresenterDeckContainer>
      <NotesColumn>
        <FlexBox justifyContent="space-between" paddingTop={10} paddingX={15}>
          <SpectacleLogo />
          <FlexBox width={0.75} flexDirection="column" alignItems="flex-end">
            <Text
              data-testid="use-browser-tab-text"
              fontSize={15}
              fontFamily={SYSTEM_FONT}
              textAlign="right"
              padding="0px"
              margin="0px 0px 10px"
            >
              Open a second browser tab at {window.location.host} to use as the
              audience deck
              {!!castButton &&
                ' or use Chrome’s display cast to present on a secondary display'}
              .
            </Text>
            {castButton}
          </FlexBox>
        </FlexBox>
        <Box paddingRight={15}>
          <Timer />
        </Box>
        <NotesContainer>
          <Text fontFamily={SYSTEM_FONT} lineHeight="1.2" fontSize="1.5vw">
            {currentNotes}
          </Text>
        </NotesContainer>
      </NotesColumn>
      <PreviewColumn>
        <SlideContainer>
          <Text
            fontSize={20}
            fontWeight="bold"
            fontFamily={SYSTEM_FONT}
            textAlign="center"
          >
            Current&nbsp;
            <SlideCountLabel>
              Slide {activeSlide.props.slideNum + 1} of {numberOfSlides}
            </SlideCountLabel>
          </Text>
          <SlideWrapper>{activeSlide}</SlideWrapper>
        </SlideContainer>
        {!!nextSlide && (
          <SlideContainer>
            <Text
              fontSize={20}
              fontFamily={SYSTEM_FONT}
              fontWeight="bold"
              textAlign="center"
            >
              Next&nbsp;
              <SlideCountLabel>
                Slide {nextSlide.props.slideNum + 1} of {numberOfSlides}
              </SlideCountLabel>
            </Text>
            <SlideWrapper small data-testid="Next Slide">
              {nextSlide}
            </SlideWrapper>
          </SlideContainer>
        )}
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
