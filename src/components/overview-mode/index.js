import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Deck from '../deck/deck';
import { PLACEHOLDER_CLASS_NAME } from '../../hooks/use-slides';
import {
  backdropStyle,
  OverviewBackdrop,
  RenderDeck,
  SlideGrid,
  SlideGridItem
} from './components';

export default function OverviewMode({ children, theme, onSlideSelected }) {
  const [slideCount, setSlideCount] = useState(0);
  const [containerRef, setContainerRef] = useState();

  useEffect(() => {
    setSlideCount(
      containerRef?.getElementsByClassName(PLACEHOLDER_CLASS_NAME).length
    );
  }, [containerRef]);

  return (
    <>
      <RenderDeck ref={setContainerRef}>
        <Deck
          disableInteractivity
          useAnimations={false}
          theme={theme}
          backdropStyle={backdropStyle}
        >
          {children}
        </Deck>
      </RenderDeck>
      <SlideGrid>
        <OverviewBackdrop />
        {Array.from({ length: slideCount }).map((_, idx) => (
          <SlideGridItem
            onClick={() => onSlideSelected({ slideIndex: idx, stepIndex: 0 })}
            key={`slide-${idx}`}
          >
            <Deck
              disableInteractivity
              useAnimations={false}
              theme={theme}
              initialState={{
                slideIndex: idx,
                stepIndex: 0
              }}
              backdropStyle={backdropStyle}
            >
              {children}
            </Deck>
          </SlideGridItem>
        ))}
      </SlideGrid>
    </>
  );
}

OverviewMode.propTypes = {
  onSlideSelected: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
  theme: propTypes.object
};
