import React from 'react';
import PropTypes from 'prop-types';
import { DeckContext } from '../hooks/use-deck';

const basePresenterStyle = {
  height: '100vh',
  width: '100vw',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column'
};

const Presenter = props => {
  const {
    state: { currentNotes, currentSlide }
  } = React.useContext(DeckContext);

  const { children } = props;

  const activeSlide =
    children.length > currentSlide ? children[currentSlide] : null;
  const nextSlide =
    children.length > currentSlide + 1 ? children[currentSlide + 1] : null;

  const slideStyle = {
    flex: '1 1 0',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'red'
  };

  const clonedActiveSlide = React.cloneElement(activeSlide, {
    style: slideStyle
  });

  const clonedNextSlide = React.cloneElement(nextSlide, {
    style: slideStyle
  });

  return (
    <div style={basePresenterStyle}>
      {currentNotes}
      <div style={{ height: 40 }} />
      <div style={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <h3 style={{}}>Current Slide:</h3>
          {clonedActiveSlide}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <h3 style={{}}>Next Slide:</h3>
          {clonedNextSlide}
        </div>
      </div>
    </div>
  );
};

Presenter.propTypes = {
  children: PropTypes.node.isRequired
};

export default Presenter;
