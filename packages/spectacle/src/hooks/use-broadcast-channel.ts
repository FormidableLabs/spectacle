import { useCallback, useEffect, useRef } from 'react';
import { ulid } from 'ulid';
import { BroadcastChannel as BroadcastChannelPolyfill } from 'broadcast-channel';
import { DeckView } from './use-deck-state';

const noop = () => {};
let safeWindow: any = {};
if (typeof window !== "undefined") {
  safeWindow = window;
}
const BroadcastChannel = safeWindow.BroadcastChannel || BroadcastChannelPolyfill;

type MessageCallback = (message: MessageTypes) => void;

type MessageTypes =
  | { type: 'SYNC'; payload: Partial<DeckView> }
  | { type: 'SYNC_REQUEST'; payload?: never };

export default function useBroadcastChannel(
  channelName: string,
  onMessage: MessageCallback = noop,
  deps = []
) {
  const broadcasterId = useRef(() => ulid());
  const channel = useRef<BroadcastChannel>();

  useEffect(() => {
    channel.current = new BroadcastChannel(channelName);

    return () => {
      channel.current?.close();
    };
  }, [channelName]);

  const postMessage = useCallback(
    <TType extends MessageTypes['type']>(
      type: TType,
      payload: MessageTypes['payload'] = {}
    ) => {
      const message = {
        type,
        payload,
        meta: {
          sender: broadcasterId.current
        }
      };
      const rawMessage = JSON.stringify(message);
      channel.current?.postMessage(rawMessage);
    },
    []
  );

  // Avoid constantly modifying the 'message' listener in the effect below
  const userMessageHandlerRef = useRef(onMessage);
  useEffect(() => {
    userMessageHandlerRef.current = onMessage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, postMessage]);

  useEffect(() => {
    if (!channel.current) return;
    const messageHandler = (event: MessageEvent<string>) => {
      const rawMessage = event.data;
      const message = JSON.parse(rawMessage);
      userMessageHandlerRef.current(message);
    };
    channel.current?.addEventListener('message', messageHandler);
    return () => {
      channel.current?.removeEventListener('message', messageHandler);
    };
  }, [postMessage]);

  return [postMessage, broadcasterId.current] as const;
}
