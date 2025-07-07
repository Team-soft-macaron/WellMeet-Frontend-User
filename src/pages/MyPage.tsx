import React from 'react';
import { theme } from '../styles/theme';

interface MyPageProps {
  onFavoritesClick?: () => void;
  onReservationsClick?: () => void;
}

export const MyPage: React.FC<MyPageProps> = ({ onFavoritesClick, onReservationsClick }) => {
  const menuItems = [
    { icon: '👤', label: '내 정보', detail: '프로필 및 계정 관리', badge: null, onClick: undefined },
    { icon: '📋', label: '예약 내역', detail: '지난 예약 및 리뷰 관리', badge: null, onClick: onReservationsClick },
    { icon: '🎁', label: '이벤트/혜택', detail: '프리미엄 회원 전용 혜택', badge: null, onClick: undefined },
    { icon: '⭐', label: '즐겨찾기', detail: '자주 가는 맛집 목록', badge: null, onClick: onFavoritesClick },
    { icon: '⚙️', label: '설정', detail: '알림, 언어, 로그아웃', badge: null, onClick: undefined },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.profileSection}>
        <div style={styles.profileImageContainer}>
          <div style={styles.profileImage}>👤</div>
        </div>
        <div style={styles.profileInfo}>
          <div style={styles.profileName}>유성민</div>
          <div style={styles.profileStatus}>Premium Member</div>
        </div>
      </div>


      <div style={styles.menuList}>
        {menuItems.map((item, index) => (
          <button key={index} style={styles.menuItem} onClick={item.onClick}>
            <div style={styles.menuIconContainer}>
              <span style={styles.menuIcon}>{item.icon}</span>
            </div>
            <div style={styles.menuContent}>
              <div style={styles.menuLabel}>{item.label}</div>
              <div style={styles.menuDetail}>{item.detail}</div>
            </div>
            <span style={styles.menuArrow}>›</span>
          </button>
        ))}
      </div>

    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
    boxSizing: 'border-box' as const,
    width: '100%',
    backgroundColor: theme.colors.background,
    height: '100%',
  },
  profileSection: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: `${theme.spacing.xl}px ${theme.spacing.xl}px ${theme.spacing.xxl}px`,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
    borderRadius: theme.borderRadius.large,
    margin: theme.spacing.xl,
    marginBottom: theme.spacing.xxl,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: theme.colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    fontSize: 32,
    color: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  },
  profileStatus: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
  },
  menuList: {
    padding: `0 ${theme.spacing.xl}px`,
  },
  menuItem: {
    width: '100%',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.large,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginBottom: theme.spacing.md,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: theme.colors.backgroundSecondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 20,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  menuDetail: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
  },
  menuArrow: {
    fontSize: 20,
    color: theme.colors.textSecondary,
  },
};