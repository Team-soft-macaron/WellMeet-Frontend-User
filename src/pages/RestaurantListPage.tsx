import React from 'react';
import { PageLayout } from '../components/Layout/PageLayout';
import { TopNavBar } from '../components/Layout/TopNavBar';
import { BottomTabBar } from '../components/Layout/BottomTabBar';
import { RestaurantList } from '../components/Restaurant/RestaurantList';
import { mockRestaurants } from '../constants/mockData';
import type { TabType } from '../types';

interface RestaurantListPageProps {
  onBack: () => void;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export const RestaurantListPage: React.FC<RestaurantListPageProps> = ({ 
  onBack, 
  activeTab = 'ai',
  onTabChange = () => {}
}) => {
  return (
    <PageLayout>
      <TopNavBar title="추천 식당" onBack={onBack} showBorder />
      <RestaurantList restaurants={mockRestaurants} />
      <BottomTabBar activeTab={activeTab} onTabChange={onTabChange} />
    </PageLayout>
  );
};