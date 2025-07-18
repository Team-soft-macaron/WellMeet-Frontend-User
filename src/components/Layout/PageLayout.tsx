import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { TopNavBar } from './TopNavBar';
import { BottomTabBar } from './BottomTabBar';
import type { TabType } from '../../types';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const pathToTab: Record<string, TabType> = {
    '/home': 'home',
    '/ai': 'ai',
    '/reservations': 'favorites',
    '/mypage': 'mypage',
  };

  const tabToPath: Record<TabType, string> = {
    'home': '/home',
    'ai': '/ai',
    'favorites': '/reservations',
    'mypage': '/mypage',
  };

  useEffect(() => {
    const currentTab = pathToTab[location.pathname];
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [location.pathname]);

  const getPageTitle = (): string => {
    const titles: Record<string, string> = {
      '/home': '홈',
      '/ai': 'AI 추천',
      '/reservations': '예약 내역',
      '/mypage': '마이페이지',
      '/search': '검색',
      '/favorites': '즐겨찾기',
      '/booking': '예약하기',
    };
    
    if (location.pathname.startsWith('/restaurant/')) {
      return '레스토랑 상세';
    }
    if (location.pathname.startsWith('/booking/')) {
      return '예약하기';
    }
    
    return titles[location.pathname] || '홈';
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    navigate(tabToPath[tab]);
  };

  const showTabBar = ['/home', '/ai', '/reservations', '/mypage'].includes(location.pathname);

  return (
    <div style={styles.container}>
      <TopNavBar title={getPageTitle()} />
      <div className="page-transition" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {children}
      </div>
      {showTabBar && <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />}
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
    position: 'relative' as const,
    maxWidth: theme.layout.maxWidth,
    margin: '0 auto',
    boxShadow: theme.shadows.default,
  },
};