import React, { useState } from 'react';
import type { Restaurant } from '../../types';
import { theme } from '../../styles/theme';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: (restaurant: Restaurant) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <div
      style={styles.container(isPressed)}
      onClick={() => onClick?.(restaurant)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div style={styles.imageContainer}>
        {restaurant.image}
      </div>
      <div style={styles.content}>
        <div style={styles.name}>
          {restaurant.name}
        </div>
        <div style={styles.details}>
          {restaurant.category} • {restaurant.price} • {restaurant.distance}
        </div>
        <div style={styles.rating}>
          ⭐ {restaurant.rating}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: (isPressed: boolean) => ({
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    border: `1px solid ${theme.colors.border}`,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: theme.transition.default,
    transform: isPressed ? 'scale(0.98)' : 'scale(1)',
  }),
  
  imageContainer: {
    fontSize: '32px',
    marginRight: theme.spacing.lg,
    width: '40px',
    textAlign: 'center' as const,
  },
  
  content: {
    flex: 1,
  },
  
  name: {
    fontSize: theme.typography.fontSize.regular,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  
  details: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  
  rating: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.medium,
  },
};