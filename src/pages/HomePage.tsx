import React from 'react';
import { theme } from '../styles/theme';

export const HomePage: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        홈 페이지입니다.
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: theme.spacing.xl,
    overflow: 'auto',
    boxSizing: 'border-box' as const,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  content: {
    fontSize: theme.typography.fontSize.xlarge,
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
  },
};