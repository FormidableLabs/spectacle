import React from 'react';
import PropTypes from 'prop-types';
import { SlideContext } from '../hooks/use-slide';

const NotesContainer = ({ children }) => {
  const {
    actions: { setNotes },
    state: { isActiveSlide }
  } = React.useContext(SlideContext);

  React.useEffect(() => {
    console.log('is active slide', isActiveSlide);
    if (isActiveSlide) {
      console.log('notes content', children);
      setNotes(children);
    }
  }, [isActiveSlide, setNotes, children]);

  return null;
};

NotesContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default NotesContainer;
