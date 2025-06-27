import React from 'react';
import type { ReactNode } from 'react';
import { theme } from '../../styles/theme';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: theme.colors.background,
    fontFamily: theme.typography.fontFamily,
    overflow: 'hidden',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    maxWidth: theme.layout.maxWidth,
    margin: '0 auto',
    boxShadow: theme.shadows.default,
  },
};