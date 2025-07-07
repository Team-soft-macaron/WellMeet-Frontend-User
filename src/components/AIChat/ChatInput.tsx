import React, { useState } from 'react';
import { theme } from '../../styles/theme';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  placeholder = '메시지를 입력하세요...' 
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputWrapper}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          ➤
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative' as const,
    padding: theme.spacing.xl,
    backgroundColor: 'white',
    borderTop: `1px solid ${theme.colors.border}`,
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 25,
    padding: '5px 5px 5px 20px',
  },
  input: {
    flex: 1,
    border: 'none',
    background: 'none',
    outline: 'none',
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
    padding: '10px 0',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: theme.colors.primary,
    color: 'white',
    border: 'none',
    fontSize: 18,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
  },
};