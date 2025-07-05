import React from 'react';
import { theme } from '../styles/theme';
import { SearchBar } from '../components/Home/SearchBar';
import { PremiumCard } from '../components/Home/PremiumCard';
import { RestaurantCard } from '../components/Home/RestaurantCard';

const mockRestaurants = [
  {
    id: '1',
    name: '정식당',
    category: '한식',
    distance: '500m',
    rating: 4.9,
    icon: '🍽️'
  },
  {
    id: '2',
    name: '한우 명가',
    category: '한식',
    distance: '800m',
    rating: 4.7,
    icon: '🥩'
  },
  {
    id: '3',
    name: '비스트로 파리',
    category: '프랑스',
    distance: '1.2km',
    rating: 4.6,
    icon: '🍷'
  },
  {
    id: '4',
    name: '스시 오마카세',
    category: '일식',
    distance: '600m',
    rating: 4.8,
    icon: '🍣'
  }
];

interface HomePageProps {
  onSearch: () => void;
  onRestaurantClick: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSearch, onRestaurantClick }) => {

  return (
    <div style={styles.container}>
      <SearchBar onSearch={onSearch} />
      
      <PremiumCard />
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>추천 맛집</h2>
        {mockRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            {...restaurant}
            onClick={() => onRestaurantClick(restaurant.id)}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: theme.spacing.xl,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
    boxSizing: 'border-box' as const,
    width: '100%',
    backgroundColor: theme.colors.background,
    height: '100%',
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text,
  },
};