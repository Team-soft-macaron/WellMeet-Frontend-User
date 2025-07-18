import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';


interface FavoriteRestaurant {
  id: string;
  name: string;
  thumbnail: string;
  address: string;
  rating: number;
}

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteRestaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/favorite/restaurants?memberId=1');
        
        if (!response.ok) {
          throw new Error('Failed to fetch favorite restaurants');
        }
        
        const data = await response.json();
        setFavorites(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => navigate(-1)}>←</button>
          <h1 style={styles.headerTitle}>즐겨찾기</h1>
          <div style={styles.headerSpacer} />
        </div>
        <div style={styles.loadingContainer}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => navigate(-1)}>←</button>
          <h1 style={styles.headerTitle}>즐겨찾기</h1>
          <div style={styles.headerSpacer} />
        </div>
        <div style={styles.errorContainer}>
          <p>Error: {error}</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>←</button>
        <h1 style={styles.headerTitle}>즐겨찾기</h1>
        <div style={styles.headerSpacer} />
      </div>

      <div style={styles.content}>
        <h3 style={styles.sectionTitle}>내가 찜한 맛집</h3>
        
        <div style={styles.restaurantList}>
          {favorites.map((restaurant) => (
            <button
              key={restaurant.id}
              style={styles.restaurantCard}
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            >
              <div style={styles.restaurantIcon}>
                <img 
                  src={restaurant.thumbnail} 
                  alt={restaurant.name}
                  style={styles.restaurantImage}
                />
              </div>
              <div style={styles.restaurantInfo}>
                <div style={styles.restaurantName}>{restaurant.name}</div>
                <div style={styles.restaurantDetail}>
                  {restaurant.address} • ⭐ {restaurant.rating}
                </div>
              </div>
              <span style={styles.arrowIcon}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    backgroundColor: theme.colors.background,
  },
  header: {
    height: 60,
    backgroundColor: 'white',
    borderBottom: `1px solid ${theme.colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing.xl}px`,
  },
  backButton: {
    background: 'none',
    border: 'none',
    fontSize: 24,
    cursor: 'pointer',
    padding: theme.spacing.sm,
    marginLeft: `-${theme.spacing.sm}px`,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
    padding: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.xl,
  },
  restaurantList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.md,
  },
  restaurantCard: {
    width: '100%',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.backgroundSecondary,
    border: 'none',
    borderRadius: theme.borderRadius.large,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  restaurantIcon: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.inputBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
  },
  restaurantInfo: {
    flex: 1,
    textAlign: 'left' as const,
  },
  restaurantName: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  restaurantDetail: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
  },
  arrowIcon: {
    fontSize: 20,
    color: theme.colors.textSecondary,
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    borderRadius: theme.borderRadius.medium,
  },
  loadingContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.fontSize.large,
    color: theme.colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    textAlign: 'center' as const,
    color: theme.colors.textSecondary,
  },
};