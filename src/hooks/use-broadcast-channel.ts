import * as React from 'react';
import { ulid } from 'ulid';
import { BroadcastChannel as BroadcastChannelPolyfill } from 'broadcast-channel';
import { DeckView } from './use-deck-state';

const noop = () => {};
const BroadcastChannel = window.BroadcastChannel || BroadcastChannelPolyfill;

type MessageCallback = (message: MessageTypes) => void;

type MessageTypes =
  | { type: 'SYNC'; payload: Partial<DeckView> }
  | { type: 'SYNC_REQUEST'; payload?: never };

export default function useBroadcastChannel(
  channelName: string,
  onMessage: MessageCallback = noop,
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
    <TType extends MessageTypes['type']>(
      type: TType,
      payload: MessageTypes['payload'] = {}
    ) => {
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
    const messageHandler = (event: MessageEvent<string>) => {
      const rawMessage = event.data;
      const message = JSON.parse(rawMessage);
      userMessageHandlerRef.current(message);
    };
    channel.addEventListener('message', messageHandler);
    return () => {
      channel.removeEventListener('message', messageHandler);
    };
  }, [channel, postMessage]);

  return [postMessage, broadcasterId] as const;
}
