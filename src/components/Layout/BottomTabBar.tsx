import React from 'react';
import type { TabType, TabItem } from '../../types';
import { theme } from '../../styles/theme';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: TabItem[] = [
  { id: 'home', label: '홈' },
  { id: 'ai', label: 'AI 추천' },
  { id: 'favorites', label: '즐겨찾기' },
  { id: 'mypage', label: '마이페이지' },
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div style={styles.container}>
      {tabs.map((tab) => (
        <TabBarItem
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        />
      ))}
    </div>
  );
};

interface TabBarItemProps {
  tab: TabItem;
  isActive: boolean;
  onClick: () => void;
}

const TabBarItem: React.FC<TabBarItemProps> = ({ tab, isActive, onClick }) => {
  return (
    <div onClick={onClick} style={styles.tabItem(isActive)}>
      <div style={styles.tabIcon(isActive)} />
      <span style={styles.tabLabel(isActive)}>{tab.label}</span>
    </div>
  );
};

const styles = {
  container: {
    height: theme.layout.tabBarHeight,
    backgroundColor: theme.colors.background,
    borderTop: `1px solid ${theme.colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: theme.spacing.xl,
    flexShrink: 0,
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  
  tabItem: (isActive: boolean) => ({
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    cursor: 'pointer',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: isActive ? theme.colors.activeBackground : 'transparent',
    transition: theme.transition.default,
  }),
  
  tabIcon: (isActive: boolean) => ({
    width: '24px',
    height: '24px',
    backgroundColor: isActive ? theme.colors.primary : theme.colors.secondary,
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.xs,
    transition: theme.transition.default,
  }),
  
  tabLabel: (isActive: boolean) => ({
    fontSize: theme.typography.fontSize.small,
    color: isActive ? theme.colors.primary : theme.colors.secondary,
    fontWeight: isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.regular,
    transition: theme.transition.default,
  }),
};