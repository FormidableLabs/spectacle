import React from 'react';
import PropTypes from 'prop-types';
import { DeckContext } from '../../hooks/use-deck';

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
  paddingTop: '4em',
  backgroundColor: 'rgba(40, 30, 20, 0.2)'
};

const notesContainerStyle = {
  fontSize: '1.3em',
  fontFamily: 'georgia',
  lineHeight: '180%'
};

const rightColumnContainerStyle = {
  ...baseColumnContainerStyle,
  backgroundColor: 'rgba(10, 150, 10, 0.2)',
  justifyContent: 'center',
  // ensure that the combined height of the slide previews
  // never exceeds the height of the screen
  maxWidth: 'calc(((100vh - 10%) / 2) * 16 / 9)'
};

const slideHeaderStyle = {
  margin: 0,
  marginTop: 10,
  marginBottom: 10
};

const slideContainerStyle = {
  position: 'relative',
  overflow: 'hidden',
  borderStyle: 'solid',
  borderWidth: 3,
  borderColor: 'black',
  height: 0,
  // 16 / 9 aspect ratio - https://css-tricks.com/aspect-ratio-boxes/
  paddingTop: '56.25%'
};

const slideStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
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
    style: slideStyle
  });

  const clonedNextSlide =
    nextSlide &&
    React.cloneElement(nextSlide, {
      style: slideStyle
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
      <div style={rightColumnContainerStyle}>
        <h4 style={slideHeaderStyle}>Current Slide:</h4>
        <div style={slideContainerStyle}>{clonedActiveSlide}</div>
        <h4 style={slideHeaderStyle}>Next Slide:</h4>
        <div style={slideContainerStyle}>{clonedNextSlide}</div>
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
