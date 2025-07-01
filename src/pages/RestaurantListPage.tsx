import React from 'react';
import { PageLayout } from '../components/Layout/PageLayout';
import { TopNavBar } from '../components/Layout/TopNavBar';
import { BottomTabBar } from '../components/Layout/BottomTabBar';
import { RestaurantList } from '../components/Restaurant/RestaurantList';
import type { TabType, Restaurant } from '../types';

interface RestaurantListPageProps {
  restaurants: Restaurant[];
  onBack?: () => void;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export const RestaurantListPage: React.FC<RestaurantListPageProps> = ({
  restaurants,
  onBack,
  activeTab = 'ai',
  onTabChange = () => { }
}) => {
  return (
    <PageLayout>
      <TopNavBar title="추천 식당" onBack={onBack} showBorder />
      <RestaurantList restaurants={restaurants} />
      <BottomTabBar activeTab={activeTab} onTabChange={onTabChange} />
    </PageLayout>
  );
};