import React, { useRef, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import Deck from '../deck/deck';
import { Text, SpectacleLogo } from '../../index';
import propTypes from 'prop-types';
import {
  PresenterDeckContainer,
  NotesColumn,
  PreviewColumn,
  deckBackdropStyles,
  NotesContainer
} from './components';
import useLocationSync from '../../hooks/use-location-sync';
import * as queryStringMapFns from '../../location-map-fns/query-string';
import { GOTO_FINAL_STEP } from '../../hooks/use-deck-state';
import { SYSTEM_FONT } from '../../utils/constants';
import { FlexBox, Box } from '../layout';
import { Timer } from './timer';
import useBroadcastChannel from '../../hooks/use-broadcast-channel';

const endOfNextSlide = ({ slideIndex }) => ({
  slideIndex: slideIndex + 1,
  stepIndex: GOTO_FINAL_STEP
});

const PreviewSlideWrapper = styled.div(({ visible }) => ({
  visibility: visible ? 'visible' : 'hidden'
}));

export default function PresenterMode(props) {
  const { children, theme } = props;
  const deck = useRef();
  const previewDeck = useRef();
  const [notePortalNode, setNotePortalNode] = useState();
  const [showFinalSlide, setShowFinalSlide] = useState(true);

  const [postMessage] = useBroadcastChannel(
    'spectacle_presenter_bus',
    message => {
      if (message.type === 'SYNC_REQUEST') {
        postMessage('SYNC', deck.current.activeView);
      }
    }
  );

  const [syncLocation, setLocation] = useLocationSync({
    setState: state => deck.current.skipTo(state),
    ...queryStringMapFns
  });

  const onActiveStateChange = useCallback(
    activeView => {
      setLocation(activeView);
      postMessage('SYNC', activeView);
      setShowFinalSlide(
        deck.current?.numberOfSlides - 1 !==
          deck?.current?.activeView.slideIndex
      );
      previewDeck.current.skipTo(endOfNextSlide(activeView));
    },
    [postMessage, setLocation]
  );

  useEffect(() => {
    const initialView = syncLocation({
      slideIndex: 0,
      stepIndex: 0
    });
    deck.current.initializeTo(initialView);
    postMessage('SYNC', initialView);
    previewDeck.current.initializeTo(endOfNextSlide(initialView));
  }, [postMessage, syncLocation]);

  return (
    <PresenterDeckContainer>
      <NotesColumn>
        <FlexBox justifyContent="space-between" paddingTop={15} paddingX={15}>
          <SpectacleLogo size={60} />
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
              audience deck.
            </Text>
          </FlexBox>
        </FlexBox>
        <Box paddingX={15} paddingY={10}>
          <Timer />
        </Box>
        <NotesContainer>
          <Text
            ref={setNotePortalNode}
            fontFamily={SYSTEM_FONT}
            lineHeight="1.5em"
            fontSize="1.5vw"
            padding={15}
          />
        </NotesContainer>
      </NotesColumn>
      <PreviewColumn>
        <Deck
          notePortalNode={notePortalNode}
          backdropStyle={deckBackdropStyles.currentSlide}
          onActiveStateChange={onActiveStateChange}
          ref={deck}
          theme={theme}
        >
          {children}
        </Deck>
        <PreviewSlideWrapper visible={showFinalSlide}>
          <Deck
            disableInteractivity
            useAnimations={false}
            backdropStyle={deckBackdropStyles.nextSlide}
            ref={previewDeck}
            theme={theme}
          >
            {children}
          </Deck>
        </PreviewSlideWrapper>
      </PreviewColumn>
    </PresenterDeckContainer>
  );
}

PresenterMode.propTypes = {
  theme: propTypes.object,
  children: propTypes.node.isRequired
};
