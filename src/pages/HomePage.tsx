import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

interface Restaurant {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  thumbnail: string;
}

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
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
              const formattedData = data.map((restaurant: Restaurant & { distance: number }) => ({
                ...restaurant,
                distance: formatDistance(restaurant.distance)
              }));
              setRestaurants(formattedData);
            } catch (err) {
              console.error('Error fetching restaurants:', err);
              setError('Failed to load nearby restaurants');
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            setError('Location access denied');
            setLoading(false);
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
      <SearchBar onSearch={() => navigate('/search')} />
      
      <PremiumCard />
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📍주변 추천 맛집</h2>
        {loading && <div style={styles.loading}>Loading nearby restaurants...</div>}
        {error && <div style={styles.error}>{error}</div>}
        {!loading && restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            {...restaurant}
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
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