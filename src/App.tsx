import { useState } from 'react';
import type { TabType } from './types';
import { PageLayout } from './components/Layout/PageLayout';
import { TopNavBar } from './components/Layout/TopNavBar';
import { BottomTabBar } from './components/Layout/BottomTabBar';
import { HomePage } from './pages/HomePage';
import { AIRecommendPage } from './pages/AIRecommendPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { MyPage } from './pages/MyPage';
import { SearchPage } from './pages/SearchPage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { BookingPage } from './pages/BookingPage';
import './App.css';

type PageType = TabType | 'search' | 'restaurant-detail' | 'booking';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | undefined>();

  const getPageTitle = (): string => {
    const titles: Record<PageType, string> = {
      home: '홈',
      ai: 'AI 추천',
      favorites: '예약 내역',
      mypage: '마이페이지',
      search: '검색',
      'restaurant-detail': '레스토랑 상세',
      booking: '예약하기',
    };
    return titles[currentPage];
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(tab);
  };

  const navigateTo = (page: PageType, restaurantId?: string) => {
    setCurrentPage(page);
    if (restaurantId) {
      setSelectedRestaurantId(restaurantId);
    }
  };

  const goBack = () => {
    setCurrentPage(activeTab);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onSearch={() => navigateTo('search')}
            onRestaurantClick={(id) => navigateTo('restaurant-detail', id)}
          />
        );
      case 'ai':
        return <AIRecommendPage />;
      case 'favorites':
        return <ReservationsPage />;
      case 'mypage':
        return <MyPage />;
      case 'search':
        return (
          <SearchPage 
            onBack={goBack}
            onRestaurantClick={(id) => navigateTo('restaurant-detail', id)}
          />
        );
      case 'restaurant-detail':
        return (
          <RestaurantDetailPage 
            restaurantId={selectedRestaurantId}
            onBack={goBack}
            onBooking={() => navigateTo('booking')}
          />
        );
      case 'booking':
        return (
          <BookingPage 
            onBack={goBack}
            onConfirm={() => {
              alert('예약이 완료되었습니다!');
              navigateTo('favorites');
            }}
          />
        );
      default:
        return (
          <HomePage 
            onSearch={() => navigateTo('search')}
            onRestaurantClick={(id) => navigateTo('restaurant-detail', id)}
          />
        );
    }
  };

  const showTabBar = ['home', 'ai', 'favorites', 'mypage'].includes(currentPage);

  return (
    <PageLayout>
      <TopNavBar title={getPageTitle()} />
      <div className="page-transition" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {renderContent()}
      </div>
      {showTabBar && <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />}
    </PageLayout>
  );
}

export default App;