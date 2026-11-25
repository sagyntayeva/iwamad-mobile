import { useEffect, useRef, useState } from 'react';
import { type ChatMessage, DEVICE_ID, subscribeToChat } from '../lib/chat';
import { notifyNewMessage } from '../lib/notifications';

/** Subscribes to live chat messages for an event and notifies on incoming messages from other devices. */
export function useChat(eventId: number, eventTitle: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<'connecting' | 'live' | 'error'>('connecting');
  const seenIds = useRef<Set<string> | null>(null);

  useEffect(() => {
    seenIds.current = null;
    setStatus('connecting');

    const unsubscribe = subscribeToChat(
      eventId,
      (list) => {
        if (seenIds.current === null) {
          // the first call is history: remember it, notify nothing
          seenIds.current = new Set(list.map((m) => m.id));
        } else {
          for (const message of list) {
            if (!seenIds.current.has(message.id)) {
              seenIds.current.add(message.id);
              if (message.deviceId !== DEVICE_ID) {
                notifyNewMessage(eventTitle, message);
              }
            }
          }
        }
        setMessages(list);
        setStatus('live');
      },
      () => {
        setStatus('error');
      },
    );

    return unsubscribe;
  }, [eventId, eventTitle]);

  return { messages, status };
}
