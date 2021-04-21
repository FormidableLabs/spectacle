import * as React from 'react';

function identity(sender) {
  return sender;
}

/*
 * Wrapper for react dispatch function. The third argument is an optional
 * function to identify the dispatcher i.e. { slide: 1, step: 2 }
 */
export default function useActionDispatcher(
  dispatch,
  type,
  payloadCreator = identity
) {
  const dispatcher = React.useCallback(
    (...args) => {
      dispatch({ type, payload: payloadCreator(...args) });
    },
    [dispatch, type, payloadCreator]
  );
  return dispatcher;
}
