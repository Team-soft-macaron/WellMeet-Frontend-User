import React from 'react';
import { theme } from '../../styles/theme';

interface TopNavBarProps {
  title: string;
  onBack?: () => void;
  showBorder?: boolean;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({ title, onBack, showBorder = false }) => {
  return (
    <div style={styles.container(showBorder)}>
      {onBack && (
        <button onClick={onBack} style={styles.backButton}>
          ← 뒤로
        </button>
      )}
      <h1 style={styles.title}>{title}</h1>
    </div>
  );
};

const styles = {
  container: (showBorder: boolean) => ({
    height: theme.layout.headerHeight,
    backgroundColor: theme.colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `0 ${theme.spacing.xl}`,
    position: 'relative' as const,
    flexShrink: 0,
    width: '100%',
    boxSizing: 'border-box' as const,
    ...(showBorder && { borderBottom: `1px solid ${theme.colors.border}` }),
  }),
  
  backButton: {
    position: 'absolute' as const,
    left: theme.spacing.xl,
    background: 'none',
    border: 'none',
    fontSize: theme.typography.fontSize.regular,
    color: theme.colors.primary,
    cursor: 'pointer',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.small,
  },
  
  title: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    margin: 0,
  },
};