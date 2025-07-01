import React, { useState } from 'react';
import { RecommendForm } from '../components/AIRecommend/RecommendForm';
import { RestaurantListPage } from './RestaurantListPage';
import type { Restaurant } from '../types';

export const AIRecommendPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);

  const handleRecommend = async (vibe: string) => {
    try {
      const res = await fetch(`/api/restaurant/recommend/${vibe}`);
      if (!res.ok) throw new Error(await res.text() || "서버 오류");
      const data = await res.json();
      const normalized = Array.isArray(data)
        ? data.map((r: any) => ({ ...r, image: r.mainImage || r.image }))
        : [{ ...data, image: data.mainImage || data.image }];
      setRestaurants(normalized);
    } catch (e) {
      alert('추천 실패');
    }
  };

  if (restaurants) {
    return <RestaurantListPage restaurants={restaurants} onBack={() => setRestaurants(null)} />;
  }

  return (
    <RecommendForm onRecommend={handleRecommend} />
  );
};