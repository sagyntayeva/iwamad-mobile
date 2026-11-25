import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/chat';
import { askNotificationPermission } from '../lib/notifications';

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

/** Live event chat composer, status indicator, and reverse-chronological message feed. */
export default function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState('');

  useEffect(() => {
    askNotificationPermission();
  }, []);

  const isEmpty = text.trim().length === 0;

  const handleSend = () => {
    if (isEmpty) {
      return;
    }
    sendMessage(eventId, text.trim());
    setText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live chat</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Write a message"
        maxLength={200}
        style={styles.input}
      />
      <Pressable
        onPress={handleSend}
        disabled={isEmpty}
        style={({ pressed }) => [
          styles.button,
          isEmpty && styles.buttonDisabled,
          pressed && !isEmpty && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>
      {status === 'connecting' && <Text style={styles.status}>Connecting</Text>}
      {status === 'error' && <Text style={styles.error}>Chat unavailable</Text>}
      {status === 'live' && messages.length === 0 && (
        <Text style={styles.status}>No messages yet</Text>
      )}
      {[...messages].reverse().map((m) => (
        <Text key={m.id} style={styles.message}>
          {m.author}: {m.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    minHeight: 44,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 15,
    color: '#4b5563',
  },
  error: {
    fontSize: 15,
    color: '#b91c1c',
  },
  message: {
    fontSize: 15,
    color: '#111827',
  },
});
