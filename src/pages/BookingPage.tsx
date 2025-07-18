import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';

export const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurantName] = useState('정식당');
  const [selectedDate, setSelectedDate] = useState(17);
  const [selectedTime, setSelectedTime] = useState('12:30');
  const [selectedPeople, setSelectedPeople] = useState('4명');
  const [premiumOptions, setPremiumOptions] = useState({
    welcomeDrink: false,
    vipRoom: false
  });

  const dates = [
    { day: '월', date: 15 },
    { day: '화', date: 16 },
    { day: '수', date: 17 },
    { day: '목', date: 18 },
    { day: '금', date: 19 },
    { day: '토', date: 20 },
    { day: '일', date: 21 },
  ];

  const times = [
    { time: '11:30', available: true },
    { time: '12:00', available: true },
    { time: '12:30', available: true },
    { time: '13:00', available: false },
    { time: '18:00', available: true },
    { time: '18:30', available: true },
    { time: '19:00', available: true },
    { time: '19:30', available: false },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>←</button>
        <h1 style={styles.headerTitle}>예약하기</h1>
        <div style={styles.headerSpacer} />
      </div>

      <div style={styles.content}>
        <div style={styles.infoCard}>
          <h3 style={styles.restaurantTitle}>{restaurantName} 예약</h3>
          <p style={styles.subtitle}>AI가 분석한 최적 시간대</p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>날짜 선택</h4>
          <div style={styles.calendar}>
            {dates.map((item) => (
              <div key={item.date} style={styles.calendarHeader}>
                {item.day}
              </div>
            ))}
            {dates.map((item) => (
              <div
                key={`date-${item.date}`}
                style={{
                  ...styles.calendarDay,
                  ...(selectedDate === item.date ? styles.selectedDay : {})
                }}
                onClick={() => setSelectedDate(item.date)}
              >
                {item.date}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>시간 선택</h4>
          <div style={styles.timeGrid}>
            {times.map((item) => (
              <button
                key={item.time}
                style={{
                  ...styles.timeSlot,
                  ...(selectedTime === item.time ? styles.selectedTime : {}),
                  ...(item.available ? {} : styles.disabledTime)
                }}
                onClick={() => item.available && setSelectedTime(item.time)}
                disabled={!item.available}
              >
                {item.time}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>인원</h4>
          <select
            value={selectedPeople}
            onChange={(e) => setSelectedPeople(e.target.value)}
            style={styles.select}
          >
            <option>2명</option>
            <option>3명</option>
            <option>4명</option>
            <option>5명</option>
            <option>6명</option>
          </select>
        </div>

        <div style={styles.premiumSection}>
          <h4 style={styles.premiumTitle}>
            <span style={styles.premiumBadge}>Premium</span>
            추가 옵션
          </h4>
          
          <label style={styles.premiumOption}>
            <input
              type="checkbox"
              checked={premiumOptions.welcomeDrink}
              onChange={(e) => setPremiumOptions({
                ...premiumOptions,
                welcomeDrink: e.target.checked
              })}
              style={styles.checkbox}
            />
            <div>
              <div style={styles.optionTitle}>웰컴 드링크 서비스</div>
              <div style={styles.optionDesc}>샴페인 또는 논알콜 음료 제공</div>
            </div>
          </label>

          <label style={styles.premiumOption}>
            <input
              type="checkbox"
              checked={premiumOptions.vipRoom}
              onChange={(e) => setPremiumOptions({
                ...premiumOptions,
                vipRoom: e.target.checked
              })}
              style={styles.checkbox}
            />
            <div>
              <div style={styles.optionTitle}>VIP 프라이빗 룸</div>
              <div style={styles.optionDesc}>완벽한 프라이버시 보장</div>
            </div>
          </label>
        </div>

        <button style={styles.confirmButton} onClick={() => {
          alert('예약이 완료되었습니다!');
          navigate('/reservations');
        }}>
          예약 확정하기
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
    padding: theme.spacing.xl,
    height: '100%',
  },
  infoCard: {
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  restaurantTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.medium,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.md,
  },
  calendar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: theme.spacing.sm,
  },
  calendarHeader: {
    textAlign: 'center' as const,
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    padding: theme.spacing.sm,
  },
  calendarDay: {
    textAlign: 'center' as const,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.small,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: theme.colors.inputBackground,
  },
  selectedDay: {
    backgroundColor: theme.colors.primary,
    color: 'white',
  },
  timeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing.sm,
  },
  timeSlot: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.small,
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: theme.typography.fontSize.medium,
  },
  selectedTime: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderColor: theme.colors.primary,
  },
  disabledTime: {
    backgroundColor: theme.colors.inputBackground,
    color: theme.colors.textSecondary,
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  select: {
    width: '100%',
    height: 45,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.medium,
    padding: `0 ${theme.spacing.lg}px`,
    fontSize: theme.typography.fontSize.medium,
    backgroundColor: 'white',
  },
  premiumSection: {
    backgroundColor: '#FFF9E6',
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.large,
    marginBottom: theme.spacing.xl,
  },
  premiumTitle: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.lg,
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    padding: `4px 10px`,
    borderRadius: 20,
    fontSize: theme.typography.fontSize.small,
    marginRight: theme.spacing.sm,
  },
  premiumOption: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
    cursor: 'pointer',
  },
  checkbox: {
    marginRight: theme.spacing.md,
    marginTop: 4,
    width: 18,
    height: 18,
  },
  optionTitle: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  },
  optionDesc: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
  },
  confirmButton: {
    width: '100%',
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