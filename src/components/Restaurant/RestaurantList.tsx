import React from 'react';
import type { Restaurant } from '../../types';
import { RestaurantCard } from './RestaurantCard';
import { theme } from '../../styles/theme';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onRestaurantClick?: (restaurant: Restaurant) => void;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({ 
  restaurants, 
  onRestaurantClick 
}) => {
  return (
    <div style={styles.container}>
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onClick={onRestaurantClick}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing.xl,
    boxSizing: 'border-box' as const,
  },
};