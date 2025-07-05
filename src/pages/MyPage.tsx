import React from 'react';
import { theme } from '../styles/theme';

export const MyPage: React.FC = () => {
  const menuItems = [
    { icon: '👤', label: '프로필 설정', badge: null },
    { icon: '🏆', label: 'Premium 멤버십', badge: 'Premium' },
    { icon: '💳', label: '결제 수단 관리', badge: null },
    { icon: '🔔', label: '알림 설정', badge: null },
    { icon: '📞', label: '고객센터', badge: null },
    { icon: '📄', label: '이용약관', badge: null },
    { icon: '🚪', label: '로그아웃', badge: null },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.profileSection}>
        <div style={styles.profileImage}>👤</div>
        <div style={styles.profileInfo}>
          <h2 style={styles.profileName}>김웰밋</h2>
          <p style={styles.profileEmail}>wellmeet@example.com</p>
          <div style={styles.premiumBadge}>Premium Member</div>
        </div>
      </div>

      <div style={styles.statsSection}>
        <div style={styles.statItem}>
          <div style={styles.statValue}>42</div>
          <div style={styles.statLabel}>예약 횟수</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statValue}>15</div>
          <div style={styles.statLabel}>작성 리뷰</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statValue}>8</div>
          <div style={styles.statLabel}>즐겨찾기</div>
        </div>
      </div>

      <div style={styles.menuList}>
        {menuItems.map((item, index) => (
          <button key={index} style={styles.menuItem}>
            <div style={styles.menuLeft}>
              <span style={styles.menuIcon}>{item.icon}</span>
              <span style={styles.menuLabel}>{item.label}</span>
            </div>
            <div style={styles.menuRight}>
              {item.badge && (
                <span style={styles.menuBadge}>{item.badge}</span>
              )}
              <span style={styles.menuArrow}>›</span>
            </div>
          </button>
        ))}
      </div>

      <div style={styles.versionInfo}>
        버전 1.0.0
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
    backgroundColor: theme.colors.backgroundSecondary,
    height: '100%',
  },
  profileSection: {
    backgroundColor: 'white',
    padding: theme.spacing.xl,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: '50%',
    backgroundColor: theme.colors.inputBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 36,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  },
  profileEmail: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  premiumBadge: {
    display: 'inline-block',
    backgroundColor: '#FFD700',
    color: '#333',
    padding: `4px 12px`,
    borderRadius: 20,
    fontSize: theme.typography.fontSize.small,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  statsSection: {
    backgroundColor: 'white',
    padding: theme.spacing.xl,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  statItem: {
    textAlign: 'center' as const,
  },
  statValue: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
  },
  menuList: {
    backgroundColor: 'white',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  menuItem: {
    width: '100%',
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    backgroundColor: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  menuLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  menuIcon: {
    fontSize: 20,
    width: 24,
    textAlign: 'center' as const,
  },
  menuLabel: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
  },
  menuRight: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  menuBadge: {
    backgroundColor: '#FFD700',
    color: '#333',
    padding: `2px 8px`,
    borderRadius: 12,
    fontSize: theme.typography.fontSize.xsmall,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  menuArrow: {
    fontSize: 20,
    color: theme.colors.textSecondary,
  },
  versionInfo: {
    textAlign: 'center' as const,
    padding: theme.spacing.xl,
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
  },
};