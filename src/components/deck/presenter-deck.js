import React from 'react';
import PropTypes from 'prop-types';
import { DeckContext } from '../../hooks/use-deck';

// TODO - make this better.

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

const baseColumnContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '4em',
  paddingRight: '4em',
  flex: 1
};

const leftColumnContainerStyle = {
  ...baseColumnContainerStyle,
  paddingTop: '4em'
};

const notesContainerStyle = {
  fontSize: '1.3em',
  fontFamily: 'georgia',
  lineHeight: '180%'
};

const rightColumnContainerStyle = {
  ...baseColumnContainerStyle
};

const slideHeaderStyle = {
  margin: 0,
  marginTop: 10,
  marginBottom: 10,
  flex: 1
};

const baseSlideStyle = {
  position: 'absolute',
  right: '5vw',
  width: '100vw',
  height: '100vh',
  transform: 'scale(0.4)',
  borderStyle: 'solid',
  borderWidth: 3,
  borderColor: 'black'
};

const currentSlideStyle = {
  ...baseSlideStyle,
  top: '5vh',
  transformOrigin: 'top right'
};

const nextSlideStyle = {
  ...baseSlideStyle,
  bottom: '5vh',
  transformOrigin: 'bottom right'
};

const buttonContainerStyle = {
  position: 'absolute',
  left: '1em',
  top: '1em'
};

const buttonStyle = {
  height: 20,
  width: 150,
  backgroundColor: 'white'
};

const PresenterDeck = props => {
  const {
    state: { currentSlide, currentNotes }
  } = React.useContext(DeckContext);

  const {
    children,
    isController,
    isReceiver,
    startConnection,
    terminateConnection
  } = props;

  const activeSlide =
    children.length > currentSlide ? children[currentSlide] : null;
  const nextSlide =
    children.length > currentSlide + 1 ? children[currentSlide + 1] : null;

  const clonedActiveSlide = React.cloneElement(activeSlide, {
    style: currentSlideStyle
  });

  const clonedNextSlide =
    nextSlide &&
    React.cloneElement(nextSlide, {
      style: nextSlideStyle
    });

  return (
    <div style={basePresenterStyle}>
      <div style={buttonContainerStyle}>
        {!isController && !isReceiver && (
          <button style={buttonStyle} onClick={startConnection}>
            Start Connection
          </button>
        )}
        {isController && !isReceiver && (
          <button style={buttonStyle} onClick={terminateConnection}>
            Terminate Connection
          </button>
        )}
      </div>
      <div style={leftColumnContainerStyle}>
        <h4>Notes:</h4>
        <div style={notesContainerStyle}>{currentNotes}</div>
      </div>
      {clonedActiveSlide}
      {clonedNextSlide}
      <div style={rightColumnContainerStyle}>
        <h4 style={slideHeaderStyle}>Current Slide:</h4>
        <h4 style={slideHeaderStyle}>Next Slide:</h4>
      </div>
    </div>
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
