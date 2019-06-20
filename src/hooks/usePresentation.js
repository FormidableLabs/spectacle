import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

function usePresentation(handleMessage) {
  const [connection, setConnection] = useState(null);
  const requestRef = useRef(null)
  const [errors, setErrors] = useState([]);

  // Open to suggestions for better error handling
  const addError = e => setErrors(es => ([...es, e]));

  const terminateConnection = useCallback(() => {
    if (connection) {
      connection.terminate();
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

  // Listen for messages and call handleMessage
  useEffect(() => {
    const handleConnectionList = list => {
      list.forEach(connection => {
        connection.onmessage = ({ data }) => handleMessage(data);
      })
    };
    const receiver = navigator && navigator.presentation && navigator.presentation.receiver;
    if (reciever) {
      receiver
        .connectionList
        .then(handleConnectionList)
        .catch(addError)
    } else {
      addError(new Error('Browser does not support Presentation API'))
    }
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

  const sendMessage = useCallback(message => {
    // This may throw if message isn't stringify-able
    try {
      if (connection) {
        connection.send(message);
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
    isConnected: Boolean(connection)
  };
}

export default usePresentation;