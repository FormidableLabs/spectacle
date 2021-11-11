import * as React from 'react';

function identity(sender) {
  return sender;
}

/*
 * Wrapper for react dispatch function. The third argument is an optional
 * function to identify the dispatcher i.e. { slide: 1, step: 2 }
 */
export default function useActionDispatcher<
  TDispatch extends (action: { type: TType; payload: TPayload }) => void,
  TType extends string,
  TArgs extends unknown[],
  TPayload
>(
  dispatch: TDispatch,
  type: TType,
  payloadCreator: (...args: TArgs) => TPayload = identity as any
) {
  const dispatcher = React.useCallback(
    (...args: TArgs) => {
      dispatch({ type, payload: payloadCreator(...args) });
    },
    [dispatch, type, payloadCreator]
  );
  return dispatcher;
}
