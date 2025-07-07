import React from 'react';
import { theme } from '../../styles/theme';

export const PremiumCard: React.FC = () => {
  return (
    <div style={styles.premiumCard}>
      <div style={styles.premiumBadge}>Premium</div>
      <h3 style={styles.title}>AI가 분석한 최적의 맛집</h3>
      <p style={styles.description}>
        비즈니스 미팅에 완벽한 프라이빗 룸<br />
        VIP 전용 서비스
      </p>
      <button className="button-press" style={styles.button}>지금 예약하기</button>
    </div>
  );
};

const styles = {
  premiumCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    color: '#333',
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: theme.typography.fontSize.small,
    fontWeight: 600,
    display: 'inline-block',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.typography.fontSize.medium,
    opacity: 0.9,
    lineHeight: 1.6,
    marginBottom: theme.spacing.lg,
  },
  button: {
    backgroundColor: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: theme.borderRadius.medium,
    padding: `${theme.spacing.md}px ${theme.spacing.xl}px`,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.semiBold,
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
};