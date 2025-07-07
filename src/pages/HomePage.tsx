import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import { SearchBar } from '../components/Home/SearchBar';
import { PremiumCard } from '../components/Home/PremiumCard';
import { RestaurantCard } from '../components/Home/RestaurantCard';

const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  } else {
    return `${(meters / 1000).toFixed(1)}km`;
  }
};

const mockRestaurants = [
  {
    id: '1',
    name: '정식당',
    address: '강남구',
    distance: formatDistance(500),
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
  },
  {
    id: '2',
    name: '한우 명가',
    address: '강남구',
    distance: formatDistance(800),
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800'
  },
  {
    id: '3',
    name: '비스트로 파리',
    address: '강남구',
    distance: formatDistance(1200),
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
  },
  {
    id: '4',
    name: '스시 오마카세',
    address: '강남구',
    distance: formatDistance(600),
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800'
  }
];

interface HomePageProps {
  onSearch: () => void;
  onRestaurantClick: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSearch, onRestaurantClick }) => {
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNearbyRestaurants = async () => {
      setLoading(true);
      setError(null);
      
      // Get current position
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
              const response = await fetch(
                `http://localhost:8080/api/restaurants/nearby?latitude=${latitude}&longitude=${longitude}`
              );
              
              if (!response.ok) {
                throw new Error('Failed to fetch restaurants');
              }
              
              const data = await response.json();
              // Format distance for each restaurant
              const formattedData = data.map((restaurant: { id: string; name: string; address: string; distance: number; rating: number; thumbnail: string }) => ({
                ...restaurant,
                distance: formatDistance(restaurant.distance)
              }));
              setRestaurants(formattedData);
            } catch (err) {
              console.error('Error fetching restaurants:', err);
              setError('Failed to load nearby restaurants');
              // Keep using mock data on error
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            setError('Location access denied');
            setLoading(false);
            // Use mock data if location access is denied
          }
        );
      } else {
        setError('Geolocation is not supported');
        setLoading(false);
      }
    };

    fetchNearbyRestaurants();
  }, []);

  return (
    <div style={styles.container}>
      <SearchBar onSearch={onSearch} />
      
      <PremiumCard />
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📍주변 추천 맛집</h2>
        {loading && <div style={styles.loading}>Loading nearby restaurants...</div>}
        {error && <div style={styles.error}>{error}</div>}
        {!loading && restaurants.map((restaurant) => (
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
  loading: {
    textAlign: 'center' as const,
    color: theme.colors.textSecondary,
    padding: theme.spacing.xl,
  },
  error: {
    textAlign: 'center' as const,
    color: '#ff6b6b',
    padding: theme.spacing.xl,
  },
};