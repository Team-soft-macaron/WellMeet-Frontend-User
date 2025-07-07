import React from 'react';
import { theme } from '../../styles/theme';

interface QuickReplyProps {
  options: string[];
  onSelect: (option: string) => void;
}

export const QuickReply: React.FC<QuickReplyProps> = ({ options, onSelect }) => {
  return (
    <div style={styles.container}>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          style={styles.button}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  button: {
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    backgroundColor: 'white',
    border: `1px solid ${theme.colors.primary}`,
    borderRadius: 20,
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.small,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};