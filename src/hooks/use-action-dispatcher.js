function identity(sender) {
  return sender;
}

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
