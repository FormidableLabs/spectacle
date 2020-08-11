import * as React from 'react';
import Deck from '../deck/deck';
import propTypes from 'prop-types';
import {
  PresenterDeckContainer,
  NotesColumn,
  PreviewColumn,
  deckBackdropStyles
} from './components';
import useLocationSync from '../../hooks/use-location-sync';
import * as queryStringMapFns from '../../location-map-fns/query-string';
import { GOTO_FINAL_STEP } from '../../hooks/use-deck-state';

const endOfNextSlide = ({ slideIndex, stepIndex }) => ({
  slideIndex: slideIndex + 1,
  stepIndex: GOTO_FINAL_STEP
});

export default function PresenterMode(props) {
  const { children, theme } = props;
  const deck = React.useRef();
  const previewDeck = React.useRef();
  const [notePortalNode, setNotePortalNode] = React.useState();

  const [syncLocation, setLocation] = useLocationSync({
    setState: state => deck.current.skipTo(state),
    ...queryStringMapFns
  });

  const onActiveStateChange = React.useCallback(
    activeView => {
      setLocation(activeView);
      previewDeck.current.skipTo(endOfNextSlide(activeView));
    },
    [setLocation]
  );

  React.useEffect(() => {
    const initialView = syncLocation({
      slideIndex: 0,
      stepIndex: 0
    });
    deck.current.initializeTo(initialView);
    previewDeck.current.initializeTo(endOfNextSlide(initialView));
  }, [syncLocation]);

  return (
    <PresenterDeckContainer>
      <NotesColumn>
        <div ref={setNotePortalNode}></div>
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
        <Deck
          disableInteractivity
          useAnimations={false}
          backdropStyle={deckBackdropStyles.nextSlide}
          ref={previewDeck}
          theme={theme}
        >
          {children}
        </Deck>
      </PreviewColumn>
    </PresenterDeckContainer>
  );
}

PresenterMode.propTypes = {
  theme: propTypes.object,
  children: propTypes.node.isRequired
};
