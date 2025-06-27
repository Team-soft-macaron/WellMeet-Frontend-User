import { useState } from 'react';
import type { TabType } from './types';
import { PageLayout } from './components/Layout/PageLayout';
import { TopNavBar } from './components/Layout/TopNavBar';
import { BottomTabBar } from './components/Layout/BottomTabBar';
import { HomePage } from './pages/HomePage';
import { AIRecommendPage } from './pages/AIRecommendPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { MyPage } from './pages/MyPage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const getTabTitle = (): string => {
    const titles: Record<TabType, string> = {
      home: '홈',
      ai: 'AI 추천',
      favorites: '즐겨찾기',
      mypage: '마이페이지',
    };
    return titles[activeTab];
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'ai':
        return <AIRecommendPage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'mypage':
        return <MyPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <PageLayout>
      <TopNavBar title={getTabTitle()} />
      {renderContent()}
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </PageLayout>
  );
}

export default App;