import React from 'react';
import PropTypes from 'prop-types';
import { DeckContext } from '../../hooks/use-deck';
import usePresentation, { MSG_GO_TO_SLIDE } from '../../hooks/use-presentation';

const basePresenterStyle = {
  height: '100vh',
  width: '100vw',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row'
};

const PresenterDeck = props => {
  const {
    state: { currentNotes, currentSlide }
  } = React.useContext(DeckContext);

  const { isReceiver, hasConnection, addMessageHandler } = usePresentation();
  React.useEffect(
    () => {
      addMessageHandler(payload => {
        console.log('Pres message received', payload);
      }, MSG_GO_TO_SLIDE);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  React.useEffect(() => {
    console.log('presenter receiver update', isReceiver);
  }, [isReceiver]);

  React.useEffect(() => {
    console.log('presenter hasConnection update', hasConnection);
  }, [hasConnection]);

  const { children } = props;

  const activeSlide =
    children.length > currentSlide ? children[currentSlide] : null;
  const nextSlide =
    children.length > currentSlide + 1 ? children[currentSlide + 1] : null;

  const slideContainerStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'black',
    height: 0,
    paddingTop: '56.25%'
  };
  const slideStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  };

  const clonedActiveSlide = React.cloneElement(activeSlide, {
    style: slideStyle
  });

  const clonedNextSlide = React.cloneElement(nextSlide, {
    style: slideStyle
  });

  return (
    <div style={basePresenterStyle}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '4em',
          backgroundColor: 'rgba(40, 30, 20, 0.2)',
          flex: 1
        }}
      >
        <h3 style={{}}>Notes:</h3>
        <div
          style={{
            fontSize: '1.3em',
            fontFamily: 'georgia',
            lineHeight: '180%'
          }}
        >
          {currentNotes}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '4em',
          backgroundColor: 'rgba(10, 150, 10, 0.2)',
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <h3 style={{}}>Current Slide:</h3>
        <div style={slideContainerStyle}>{clonedActiveSlide}</div>
        <div style={{ height: '5%' }} />
        <h3 style={{}}>Next Slide:</h3>
        <div style={slideContainerStyle}>{clonedNextSlide}</div>
      </div>
    </div>
  );
};

PresenterDeck.propTypes = {
  children: PropTypes.node.isRequired
};

export default PresenterDeck;
