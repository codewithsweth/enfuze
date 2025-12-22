import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MoreVertical, Paperclip, Smile, Send } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Message {
  id: number;
  text: string;
  time: string;
  isSent: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! I saw your campaign for the summer collection. Very interested!",
    time: '10:30 AM',
    isSent: false,
  },
  {
    id: 2,
    text: "That's awesome! Would love to discuss this further.",
    time: '10:32 AM',
    isSent: true,
  },
  {
    id: 3,
    text: "What's your expected timeline for this?",
    time: '10:35 AM',
    isSent: false,
  },
  {
    id: 4,
    text: "We're looking to launch in about 2 weeks. Does that work for you?",
    time: '10:37 AM',
    isSent: true,
  },
  {
    id: 5,
    text: "Sounds great! When can we start?",
    time: '10:40 AM',
    isSent: false,
  },
];

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');

  const name = params.name as string || 'User';
  const avatar = params.avatar as string || '👤';
  const verified = params.verified === 'true';
  const online = params.online === 'true';

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText.trim(),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isSent: true,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatar}</Text>
          </View>
          {online && <View style={styles.onlineDot} />}
        </View>
        <View style={styles.headerContent}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
            {verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>
          <Text style={styles.status}>{online ? 'Online' : 'Offline'}</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MoreVertical color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View key={message.id} style={styles.messageWrapper}>
            {message.isSent ? (
              <View style={styles.sentMessageContainer}>
                <View style={styles.sentMessageBubble}>
                  <LinearGradient
                    colors={['#14B8A6', '#0D9488']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.sentMessageGradient}
                  >
                    <Text style={styles.sentMessageText}>{message.text}</Text>
                  </LinearGradient>
                </View>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
            ) : (
              <View style={styles.receivedMessageContainer}>
                <View style={styles.receivedMessageBubble}>
                  <Text style={styles.receivedMessageText}>{message.text}</Text>
                </View>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Paperclip color="#9CA3AF" size={20} />
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#6B7280"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
        </View>
        <TouchableOpacity style={styles.emojiButton}>
          <Smile color="#9CA3AF" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <LinearGradient
            colors={inputText.trim() ? ['#14B8A6', '#0D9488'] : ['#374151', '#1F2937']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sendButtonGradient}
          >
            <Send color="#FFFFFF" size={20} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#0A1F1C',
    gap: 12,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#14433C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#0A1F1C',
  },
  headerContent: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#14B8A6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#14433C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
  messageWrapper: {
    marginBottom: 8,
  },
  sentMessageContainer: {
    alignItems: 'flex-end',
  },
  sentMessageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 4,
  },
  sentMessageGradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sentMessageText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  receivedMessageContainer: {
    alignItems: 'flex-start',
  },
  receivedMessageBubble: {
    maxWidth: '75%',
    backgroundColor: '#1A2F2A',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(45, 212, 191, 0.2)',
  },
  receivedMessageText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  messageTime: {
    fontSize: 12,
    color: '#6B7280',
    paddingHorizontal: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0A1F1C',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(45, 212, 191, 0.1)',
  },
  attachButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A2F2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#1A2F2A',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
  },
  input: {
    fontSize: 16,
    color: '#FFFFFF',
    minHeight: 24,
  },
  emojiButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A2F2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
