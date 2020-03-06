import React from 'react';
import PropTypes from 'prop-types';
import { SlideContext } from '../hooks/use-slide';

const Notes = ({ children }) => {
  const {
    actions: { setNotes }
  } = React.useContext(SlideContext);

  React.useEffect(() => {
    setNotes(children);
  }, [setNotes, children]);

  return null;
};

Notes.propTypes = {
  children: PropTypes.node.isRequired
};

export default Notes;
