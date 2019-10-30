import * as React from 'react';
import PropTypes from 'prop-types';
import { pipe, subscribe, makeSubject } from 'wonka';

const TransitionPipeContext = React.createContext({});

function TransitionPipeProvider(props) {
  const runTransition = React.useMemo(() => {
    const [transitionSource, nextTransition] = makeSubject();
    pipe(
      transitionSource,
      subscribe(transition => transition.start())
    );
    return nextTransition;
  }, []);
  return (
    <TransitionPipeContext.Provider value={{ runTransition }}>
      {props.children}
    </TransitionPipeContext.Provider>
  );
}
TransitionPipeProvider.propTypes = {
  children: PropTypes.node
};

export { TransitionPipeContext, TransitionPipeProvider };
