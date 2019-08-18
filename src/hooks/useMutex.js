import * as React from 'react';
import PropTypes from 'prop-types';

function useMutex() {
  const queue = React.useRef([]);
  const lock = React.useRef(false);

  const wait = React.useCallback(() => {
    const next = queue.current.shift();
    if (!next) {
      return;
    }
    lock.current = true;
    return Promise.resolve(next());
  }, []);

  const signal = React.useCallback(() => {
    lock.current = false;
    wait();
  }, [wait]);

  const synchronize = React.useCallback(
    runnable => {
      queue.current.push(runnable);
      if (!lock.current) {
        wait();
      }
    },
    [wait, lock]
  );

  return { synchronize, signal, wait };
}

const AnimationMutexContext = React.createContext();

function AnimationProvider(props) {
  const mutex = useMutex();
  return (
    <AnimationMutexContext.Provider value={mutex}>
      {props.children}
    </AnimationMutexContext.Provider>
  );
}
AnimationProvider.propTypes = {
  children: PropTypes.node
};

export { AnimationMutexContext, AnimationProvider, useMutex };
