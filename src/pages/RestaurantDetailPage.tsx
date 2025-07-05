import React from 'react';
import { theme } from '../styles/theme';

interface RestaurantDetailPageProps {
  restaurantId?: string;
  onBack: () => void;
  onBooking: () => void;
}

const mockRestaurantData = {
  id: '1',
  name: '정식당',
  address: '강남구 테헤란로 142',
  rating: 4.9,
  reviewCount: 234,
  icon: '🍽️',
  menus: [
    { name: '런치 코스 A', price: '35,000원' },
    { name: '런치 코스 B', price: '50,000원' },
    { name: '디너 코스', price: '80,000원' }
  ],
  reviews: [
    {
      type: '비즈니스 미팅',
      icon: '💼',
      comment: '조용한 룸, 완벽한 서비스로 계약 성공!'
    },
    {
      type: '데이트',
      icon: '❤️',
      comment: '분위기 좋고 음식도 맛있어요. 프로포즈 성공!'
    }
  ]
};

export const RestaurantDetailPage: React.FC<RestaurantDetailPageProps> = ({
  onBack,
  onBooking
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>←</button>
        <h1 style={styles.headerTitle}>{mockRestaurantData.name}</h1>
        <div style={styles.headerSpacer} />
      </div>

      <div style={styles.content}>
        <div style={styles.imageContainer}>
          <div style={styles.imagePlaceholder}>
            {mockRestaurantData.icon}
          </div>
        </div>

        <div style={styles.infoSection}>
          <div style={styles.titleSection}>
            <div>
              <h2 style={styles.restaurantName}>{mockRestaurantData.name}</h2>
              <p style={styles.address}>{mockRestaurantData.address}</p>
            </div>
            <span style={styles.favoriteIcon}>☆</span>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{mockRestaurantData.rating}</div>
              <div style={styles.statLabel}>평점</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{mockRestaurantData.reviewCount}</div>
              <div style={styles.statLabel}>리뷰수</div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>대표 메뉴</h3>
            <div style={styles.menuList}>
              {mockRestaurantData.menus.map((menu, index) => (
                <div key={index} style={styles.menuItem}>
                  <span>{menu.name}</span>
                  <span style={styles.menuPrice}>{menu.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>상황별 후기</h3>
              <button style={styles.moreButton}>더보기 ›</button>
            </div>
            {mockRestaurantData.reviews.map((review, index) => (
              <div key={index} style={styles.reviewCard}>
                <span style={styles.reviewIcon}>{review.icon}</span>
                <div>
                  <strong>{review.type}</strong>
                  <br />
                  <span style={styles.reviewComment}>"{review.comment}"</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button style={styles.bookingButton} onClick={onBooking}>
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
    color: '#ccc',
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
};