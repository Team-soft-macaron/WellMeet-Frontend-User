import React from 'react';
import { theme } from '../../styles/theme';

interface ChatMessageProps {
  type: 'ai' | 'user';
  message: string;
  timestamp?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ type, message, timestamp }) => {
  const isAI = type === 'ai';
  
  return (
    <div style={{
      ...styles.messageContainer,
      ...(isAI ? styles.aiMessage : styles.userMessage)
    }}>
      {isAI && <div style={styles.chatName}>AI 웰밋</div>}
      <div style={{
        ...styles.bubble,
        ...(isAI ? styles.aiBubble : styles.userBubble)
      }}>
        {message}
      </div>
      {timestamp && <div style={styles.timestamp}>{timestamp}</div>}
    </div>
  );
};

const styles = {
  messageContainer: {
    marginBottom: theme.spacing.lg,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  chatName: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  bubble: {
    maxWidth: '80%',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    fontSize: theme.typography.fontSize.medium,
    lineHeight: 1.5,
  },
  aiBubble: {
    backgroundColor: theme.colors.inputBackground,
    color: theme.colors.text,
  },
  userBubble: {
    backgroundColor: theme.colors.primary,
    color: 'white',
  },
  timestamp: {
    fontSize: theme.typography.fontSize.xsmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
};