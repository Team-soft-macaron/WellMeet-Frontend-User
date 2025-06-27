import React, { useState } from 'react';
import type { RecommendFormData } from '../types';
import { RecommendForm } from '../components/AIRecommend/RecommendForm';
import { RestaurantListPage } from './RestaurantListPage';

export const AIRecommendPage: React.FC = () => {
  const [showRestaurants, setShowRestaurants] = useState(false);

  const handleRecommend = (formData: RecommendFormData) => {
    console.log('누구와 함께:', formData.withWhom);
    console.log('어떠한 만남:', formData.meetingType);
    console.log('분위기:', formData.atmosphere);
    setShowRestaurants(true);
  };

  const handleBack = () => {
    setShowRestaurants(false);
  };

  if (showRestaurants) {
    return <RestaurantListPage onBack={handleBack} />;
  }

  return <RecommendForm onSubmit={handleRecommend} />;
};