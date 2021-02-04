import * as React from 'react';
import { ulid } from 'ulid';
import { BroadcastChannel as BroadcastChannelPolyfill } from 'broadcast-channel';

const noop = () => {};
const BroadcastChannel = window.BroadcastChannel || BroadcastChannelPolyfill;

export default function useBroadcastChannel(
  channelName,
  onMessage = noop,
  deps = []
) {
  const [broadcasterId] = React.useState(() => ulid());
  const [channel, setChannel] = React.useState(
    () => new BroadcastChannel(channelName)
  );

  React.useEffect(() => {
    if (channel.name !== channelName) {
      setChannel(() => new BroadcastChannel(channelName));
    }
    return () => {
      channel.close();
    };
  }, [channel, channelName]);

  const postMessage = React.useCallback(
    (type, payload = {}) => {
      const message = {
        type,
        payload,
        meta: {
          sender: broadcasterId
        }
      };
      const rawMessage = JSON.stringify(message);
      channel.postMessage(rawMessage);
    },
    [channel, broadcasterId]
  );

  // Avoid constantly modifying the 'message' listener in the effect below
  const userMessageHandlerRef = React.useRef(onMessage);
  React.useEffect(() => {
    userMessageHandlerRef.current = onMessage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, postMessage]);

  React.useEffect(() => {
    if (!channel) return;
    const messageHandler = event => {
      const rawMessage = event.data;
      const message = JSON.parse(rawMessage);
      userMessageHandlerRef.current(message, postMessage);
    };
    channel.addEventListener('message', messageHandler);
    return () => {
      channel.removeEventListener('message', messageHandler);
    };
  }, [channel, postMessage]);

  return [postMessage, broadcasterId];
}
