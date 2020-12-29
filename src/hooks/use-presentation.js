import { useEffect, useState, useCallback, useRef } from 'react';

function getReceiver() {
  return (
    window.navigator &&
    window.navigator.presentation &&
    window.navigator.presentation.receiver
  );
}

function usePresentation() {
  const [connection, setConnection] = useState(null);
  const [errors, setErrors] = useState([]);

  const requestRef = useRef(null);

  // Open to suggestions for better error handling
  const addError = e => setErrors(es => [...es, e]);

  // Create a presentation request and store it as a ref
  useEffect(() => {
    if (!window.PresentationRequest) {
      addError(new Error('Browser does not support Presentation API'));
    }
    return terminateConnection;
  }, [connection, terminateConnection]);

  // Add a message handler
  const addMessageHandler = useCallback(handler => {
    const receiver = getReceiver();
    if (receiver) {
      const handleConnectionList = list => {
        list.connections.forEach(listConnection => {
          const oldHandler = listConnection.onmessage || (() => {});
          listConnection.onmessage = event => {
            const parsedData = JSON.parse(event.data);
            handler(parsedData);
            oldHandler(event);
          };
        });
      };
      receiver.connectionList.then(handleConnectionList).catch(addError);
    }
  }, []);

  const terminateConnection = useCallback(() => {
    if (connection) {
      connection.terminate();
      setConnection(null);
    }
  }, [connection]);

  // Opens the display selection dialog box
  const startConnection = useCallback(urlParams => {
    requestRef.current = new PresentationRequest([`/?${urlParams}`]);
    const request = requestRef && requestRef.current;
    if (request) {
      request
        .start()
        .then(requestConnection => {
          requestConnection.onclose = () => setConnection(null); // Detect user closing presentation window
          setConnection(requestConnection);
        })
        .catch(e =>
          addError(
            new Error('User (probably) exited display selection dialog box', e)
          )
        );
    }
  }, []);

  // Send a message from the controller to the presenter
  const sendMessage = useCallback(
    msg => {
      // This may throw if message isn't stringify-able
      try {
        if (connection) {
          connection.send(JSON.stringify(msg));
        } else {
          addError(
            new Error('Cannot send message before starting a conection')
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
    addMessageHandler,
    connection,
    isReceiver: Boolean(getReceiver()),
    isController: Boolean(connection)
  };
}

export default usePresentation;

export const MSG_SLIDE_STATE_CHANGE = 'MSG_SLIDE_STATE_CHANGE';
