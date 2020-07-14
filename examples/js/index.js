import React from 'react';
import ReactDOM from 'react-dom';
import Deck from '../../src/components/deck/deck';
import Slide from '../../src/components/slide/slide';
import useLocationSync from '../../src/hooks/use-location-sync';
import useMousetrap from '../../src/hooks/use-mousetrap';

import * as queryStringMapFns from '../../src/location-map-fns/query-string';

function Presentation() {
  const deck = React.useRef();

  const [syncLocation, setLocation] = useLocationSync({
    setState: state => deck.current.skipTo(state),
    ...queryStringMapFns
  });

  useMousetrap(
    {
      left: () => deck.current.stepBackward(),
      right: () => deck.current.stepForward()
    },
    []
  );

  React.useEffect(() => {
    const initialView = syncLocation({
      slideIndex: 0,
      stepIndex: 0
    });
    deck.current.initializeTo(initialView);
  }, []);

  return (
    <Deck ref={deck} onActiveStateChange={setLocation}>
      <Slide>Hi</Slide>
      <Slide>Hi2</Slide>
    </Deck>
  );
}

ReactDOM.render(<Presentation />, document.getElementById('root'));
