import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';


interface Menu {
  name: string;
  price: number;
}

interface Review {
  situation: string;
  logo: string;
  content: string;
}

interface RestaurantData {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  thumbnail: string;
  latitude: number;
  longitude: number;
  menus: Menu[];
  reviews: Review[];
  favorite: boolean;
}

const formatPrice = (price: number): string => {
  return price.toLocaleString('ko-KR') + '원';
};

export const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState<RestaurantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Restaurant ID is required');
      setLoading(false);
      return;
    }

    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/restaurant/${id}?memberId=1`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant data');
        }
        
        const data = await response.json();
        setRestaurantData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]);

  const toggleFavorite = async () => {
    if (!restaurantData || !id) return;

    try {
      const method = restaurantData.favorite ? 'DELETE' : 'POST';
      const response = await fetch(
        `http://localhost:8080/api/favorite/restaurant/${id}?memberId=1`,
        { method }
      );

      if (!response.ok) {
        throw new Error('Failed to update favorite status');
      }

      // Update local state
      setRestaurantData({
        ...restaurantData,
        favorite: !restaurantData.favorite
      });
    } catch (err) {
      console.error('Error toggling favorite:', err);
      alert('즐겨찾기 변경에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <p>Error: {error}</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  if (!restaurantData) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <p>No restaurant data found</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>←</button>
        <h1 style={styles.headerTitle}>{restaurantData.name}</h1>
        <div style={styles.headerSpacer} />
      </div>

      <div style={styles.content}>
        <div style={styles.imageContainer}>
          <img 
            src={restaurantData.thumbnail} 
            alt={restaurantData.name}
            style={styles.image}
          />
        </div>

        <div style={styles.infoSection}>
          <div style={styles.titleSection}>
            <div>
              <h2 style={styles.restaurantName}>{restaurantData.name}</h2>
              <p style={styles.address}>{restaurantData.address}</p>
            </div>
            <button
              onClick={toggleFavorite}
              style={{
                ...styles.favoriteIcon,
                color: restaurantData.favorite ? '#FFD700' : '#ccc',
                background: 'none',
                border: 'none',
              }}
            >
              {restaurantData.favorite ? '★' : '☆'}
            </button>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{restaurantData.rating}</div>
              <div style={styles.statLabel}>평점</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{restaurantData.reviewCount}</div>
              <div style={styles.statLabel}>리뷰수</div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>대표 메뉴</h3>
            <div style={styles.menuList}>
              {restaurantData.menus.map((menu, index) => (
                <div key={index} style={styles.menuItem}>
                  <span>{menu.name}</span>
                  <span style={styles.menuPrice}>{formatPrice(menu.price)}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>상황별 후기</h3>
              <button style={styles.moreButton}>더보기 ›</button>
            </div>
            {restaurantData.reviews.map((review, index) => (
              <div key={index} style={styles.reviewCard}>
                <span style={styles.reviewIcon}>{review.logo}</span>
                <div>
                  <strong>{review.situation}</strong>
                  <br />
                  <span style={styles.reviewComment}>"{review.content}"</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button style={styles.bookingButton} onClick={() => navigate(`/booking/${id}`)}>
          예약하기
        </button>
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
    paddingBottom: theme.spacing.xl,
    height: '100%',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: theme.colors.inputBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    fontSize: 48,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  infoSection: {
    padding: theme.spacing.xl,
  },
  titleSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xl,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  },
  address: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.medium,
  },
  favoriteIcon: {
    fontSize: 32,
    cursor: 'pointer',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  statItem: {
    textAlign: 'center' as const,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.borderRadius.medium,
  },
  statValue: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.medium,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.lg,
  },
  moreButton: {
    background: 'none',
    border: 'none',
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.medium,
    cursor: 'pointer',
  },
  menuList: {
    backgroundColor: theme.colors.inputBackground,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.medium,
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  menuPrice: {
    fontWeight: theme.typography.fontWeight.semibold,
  },
  reviewCard: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
  },
  reviewIcon: {
    fontSize: 24,
    marginRight: theme.spacing.lg,
  },
  reviewComment: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
  },
  bookingButton: {
    margin: theme.spacing.xl,
    marginTop: 0,
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    backgroundColor: theme.colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: theme.borderRadius.medium,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
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