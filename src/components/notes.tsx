import * as React from 'react';
import ReactDOM from 'react-dom';
import { DeckContext } from './deck/deck';
import { SlideContext } from './slide/slide';

export default function Notes({ children }: React.PropsWithChildren<{}>) {
  const { notePortalNode } = React.useContext(DeckContext);
  const { isSlideActive } = React.useContext(SlideContext);

  if (!isSlideActive) return null;
  if (!notePortalNode) return null;

  return ReactDOM.createPortal(<div>{children}</div>, notePortalNode);
}
