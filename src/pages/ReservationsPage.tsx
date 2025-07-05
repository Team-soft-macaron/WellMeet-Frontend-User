import React from 'react';
import { theme } from '../styles/theme';

interface ReservationItem {
  id: string;
  restaurantName: string;
  date: string;
  time: string;
  people: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  icon: string;
}

const mockReservations: ReservationItem[] = [
  {
    id: '1',
    restaurantName: '정식당',
    date: '2024.01.20',
    time: '19:00',
    people: '4명',
    status: 'upcoming',
    icon: '🍽️'
  },
  {
    id: '2',
    restaurantName: '스시 오마카세',
    date: '2024.01.15',
    time: '18:30',
    people: '2명',
    status: 'completed',
    icon: '🍣'
  },
  {
    id: '3',
    restaurantName: '비스트로 파리',
    date: '2024.01.10',
    time: '12:00',
    people: '3명',
    status: 'completed',
    icon: '🍷'
  }
];

export const ReservationsPage: React.FC = () => {
  const getStatusStyle = (status: ReservationItem['status']) => {
    switch (status) {
      case 'upcoming':
        return { color: theme.colors.primary, text: '예약 확정' };
      case 'completed':
        return { color: theme.colors.textSecondary, text: '방문 완료' };
      case 'cancelled':
        return { color: '#FF3B30', text: '취소됨' };
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>예약 내역</h2>
      
      <div style={styles.reservationList}>
        {mockReservations.map((reservation) => {
          const statusStyle = getStatusStyle(reservation.status);
          return (
            <div key={reservation.id} style={styles.reservationCard}>
              <div style={styles.cardHeader}>
                <div style={styles.restaurantInfo}>
                  <span style={styles.icon}>{reservation.icon}</span>
                  <div>
                    <h3 style={styles.restaurantName}>{reservation.restaurantName}</h3>
                    <p style={styles.reservationDetails}>
                      {reservation.date} · {reservation.time} · {reservation.people}
                    </p>
                  </div>
                </div>
                <span style={{ ...styles.status, color: statusStyle.color }}>
                  {statusStyle.text}
                </span>
              </div>
              
              {reservation.status === 'upcoming' && (
                <div style={styles.cardActions}>
                  <button style={styles.actionButton}>예약 변경</button>
                  <button style={{ ...styles.actionButton, ...styles.cancelButton }}>
                    예약 취소
                  </button>
                </div>
              )}
              
              {reservation.status === 'completed' && (
                <div style={styles.cardActions}>
                  <button style={styles.actionButton}>리뷰 작성</button>
                  <button style={styles.actionButton}>재예약</button>
                </div>
              )}
            </div>
          );
        })}
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
  title: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.xl,
  },
  reservationList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing.lg,
  },
  reservationCard: {
    backgroundColor: 'white',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  restaurantInfo: {
    display: 'flex',
    gap: theme.spacing.md,
  },
  icon: {
    fontSize: 32,
    width: 50,
    height: 50,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.borderRadius.small,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  },
  reservationDetails: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
  },
  status: {
    fontSize: theme.typography.fontSize.small,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  cardActions: {
    display: 'flex',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTop: `1px solid ${theme.colors.border}`,
  },
  actionButton: {
    flex: 1,
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    border: `1px solid ${theme.colors.primary}`,
    borderRadius: theme.borderRadius.small,
    backgroundColor: 'white',
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.small,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
  },
  cancelButton: {
    borderColor: '#FF3B30',
    color: '#FF3B30',
  },
};