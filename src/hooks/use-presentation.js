import { useEffect, useState, useCallback, useRef } from 'react';

function usePresentation() {
  const [connection, setConnection] = useState(null);
  const [isReceiver, setIsReceiver] = useState(false);

  // moved to using ref as we don't want messagehandlers to change after invocation
  const messageHandlers = useRef({});
  const requestRef = useRef(null);
  const [errors, setErrors] = useState([]);

  // add message handler handles adding and removing handlers
  const addMessageHandler = useCallback((handler, key) => {
    const keyHandlers = (messageHandlers.current[key] =
      messageHandlers.current[key] || []);
    keyHandlers.push(handler);
    return () => {
      // if it exists then remove it from the messageHandler in cleanup
      const keyHandlers = messageHandlers.current[key];
      if (keyHandlers) {
        keyHandlers.splice(keyHandlers.indexOf(handler), 1);
      }
    };
  }, []);

  // Open to suggestions for better error handling
  const addError = e => setErrors(es => [...es, e]);

  const terminateConnection = useCallback(() => {
    if (connection) {
      connection.terminate();
      setConnection(null);
    }
  }, [connection]);

  // Create a presentation request and store it as a ref
  useEffect(() => {
    if (window.PresentationRequest) {
      if (!requestRef.current) {
        requestRef.current = new PresentationRequest(['/']);
        console.log(requestRef.current);
      }
    } else {
      addError(new Error('Browser does not support Presentation API'));
    }
    return terminateConnection;
  }, [connection, terminateConnection]);

  // Listen for messages (from the controller to the presenter) and call handleMessage
  useEffect(() => {
    const handleConnectionList = list => {
      list.connections.forEach(connection => {
        connection.onmessage = ({ data }) => {
          console.log('RECEIVED MESSAGE!!');
          const event = JSON.parse(data);
          // check if we have a handler for this event
          const handlers = messageHandlers.current[event.type];
          if (handlers) {
            // if it exists then pass payload to slide
            handlers.forEach(handler => handler(event.payload));
          }
        };
      });
    };
    const receiver =
      navigator && navigator.presentation && navigator.presentation.receiver;
    if (receiver) {
      receiver.connectionList.then(handleConnectionList).catch(addError);
      setIsReceiver(true);
    }
    return () => setIsReceiver(false);
  }, [connection]);

  // Opens the display selection dialog box
  const startConnection = useCallback(() => {
    const request = requestRef && requestRef.current;
    if (request) {
      request
        .start()
        .then(setConnection)
        .catch(() =>
          // TODO - memory leak
          addError(new Error('User exited display selection dialog box'))
        );
    }
  }, []);

  // Send a message from the controller to the presenter
  // type is the handler name e.g. slideDispatch0
  const sendMessage = useCallback(
    (type, payload) => {
      // This may throw if message isn't stringify-able
      try {
        console.log('sending message type?', type);
        console.log(connection);
        if (connection) {
          connection.send(
            JSON.stringify({
              type,
              payload
            })
          );
        }
      } catch (e) {
        console.log('error', e);
        addError(e);
      }
    },
    [connection]
  );

  return {
    startConnection,
    terminateConnection,
    sendMessage,
    errors,
    isReceiver,
    addMessageHandler,
    hasConnection: !!connection
  };
}

export default usePresentation;

export const MSG_GO_TO_SLIDE = 'MSG_GO_TO_SLIDE';
