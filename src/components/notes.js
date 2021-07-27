import * as React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import { DeckContext } from './deck/deck';
import { SlideContext } from './slide/slide';

export default function Notes({ children }) {
  const { notePortalNode } = React.useContext(DeckContext);
  const { isSlideActive } = React.useContext(SlideContext);

  if (!isSlideActive) return null;
  if (!notePortalNode) return null;

  return ReactDOM.createPortal(<div>{children}</div>, notePortalNode);
}

Notes.propTypes = {
  children: propTypes.node
};
