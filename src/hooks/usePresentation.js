import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

function usePresentation(handleMessage) {
  const [connection, setConnection] = useState(null);
  const [isReceiver, setIsReceiver] = useState(false);
  const requestRef = useRef(null)
  const [errors, setErrors] = useState([]);

  // Open to suggestions for better error handling
  const addError = e => setErrors(es => ([...es, e]));

  const terminateConnection = useCallback(() => {
    if (connection) {
      connection.terminate();
      setConnection(null);
    }
  }, [connection])

  // Create a presentation request and store it as a ref
  useEffect(() => {
    if (PresentationRequest) {
      if (!requestRef.current) {
        requestRef.current = new PresentationRequest(['/']);
      }
    } else {
      addError(new Error('Browser does not support Presentation API'));
    }
    return terminateConnection;
  }, [connection])

  // Listen for messages (from the controller to the presenter) and call handleMessage
  useEffect(() => {
    const handleConnectionList = list => {
      list.connections.forEach(connection => {
        connection.onmessage = ({ data }) => handleMessage(JSON.parse(data));
      })
    };
    const receiver = navigator && navigator.presentation && navigator.presentation.receiver;
    if (receiver) {
      receiver
        .connectionList
        .then(handleConnectionList)
        .catch(addError)
      setIsReceiver(true);
    }
    return () => setIsReceiver(false);
  }, [connection])

  // Opens the display selection dialog box
  const startConnection = useCallback(() => {
    const request = requestRef && requestRef.current;
    if (request) {
      request
        .start()
        .then(setConnection)
        .catch(() => addError(new Error('User exited display selection dialog box')))
    }
  }, [])

  // Send a message from the controller to the presenter
  const sendMessage = useCallback(message => {
    // This may throw if message isn't stringify-able
    try {
      if (connection) {
        connection.send(JSON.stringify(message));
      }
    } catch (e) {
      addError(e);
    }
  }, [connection])

  return { 
    startConnection, 
    terminateConnection, 
    sendMessage,
    errors,
    isReceiver,
    hasConnection: Boolean(connection)
  };
}

export default usePresentation;