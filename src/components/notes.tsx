import ReactDOM from 'react-dom';
import { DeckContext } from './deck/deck';
import { SlideContext } from './slide/slide';
import { PropsWithChildren, useContext } from 'react';

const Notes = ({ children }: PropsWithChildren<{}>): JSX.Element | null => {
  const { notePortalNode } = useContext(DeckContext);
  const { isSlideActive } = useContext(SlideContext);

  if (!isSlideActive) return null;
  if (!notePortalNode) return null;

  return ReactDOM.createPortal(<div>{children}</div>, notePortalNode);
};

export default Notes;
