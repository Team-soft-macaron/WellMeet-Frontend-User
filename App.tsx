import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { ChatPage } from './components/ChatPage';
import { RestaurantDetail } from './components/RestaurantDetail';
import { AllReviewsPage } from './components/AllReviewsPage';
import { ReservationPage } from './components/ReservationPage';
import { BookingList } from './components/BookingList';
import { BookingDetail } from './components/BookingDetail';
import { BookingEdit } from './components/BookingEdit';
import { ProfilePage } from './components/ProfilePage';
import { UserEditPage } from './components/UserEditPage';
import { NotificationPage } from './components/NotificationPage';
import { BottomNavigation } from './components/BottomNavigation';
import { userApi, notificationApi, favoriteApi } from './src/utils/api';
import { useApi } from './src/hooks/useApi';
import type { User, Notification } from './src/types/api';

// Fallback mock data for when API is not available
const fallbackUser: User = {
  id: '1',
  name: '김민수',
  email: 'user@example.com',
  phone: '010-1234-5678',
  tier: 'premium'
};

const fallbackNotifications: Notification[] = [
  {
    id: '1',
    type: 'booking_confirmed',
    title: '예약 확정',
    message: '라비올로 예약이 확정됐어요',
    detail: '내일 7:00 PM • 2명',
    time: '2시간 전',
    isRead: false,
    bookingId: '1',
    restaurantId: '1'
  },
  {
    id: '2',
    type: 'reminder',
    title: '방문 리마인더',
    message: '내일 라비올로 예약 확인',
    detail: '1일 전',
    time: '어제',
    isRead: false,
    bookingId: '1',
    restaurantId: '1'
  },
  {
    id: '3',
    type: 'review_reply',
    title: '리뷰 답글',
    message: '라비올로 사장님이 답글 작성',
    detail: '3일 전',
    time: '이번 주',
    isRead: true,
    restaurantId: '1'
  }
];

export default function App() {
  const [user, setUser] = useState<User>(fallbackUser);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(fallbackNotifications);

  // Use custom hooks for API calls
  const { execute: fetchUserProfile } = useApi(userApi.getProfile, {
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      console.error('Error fetching user profile:', error);
      // Keep fallback user data
    }
  });

  const { execute: fetchNotifications } = useApi(notificationApi.getNotifications, {
    onSuccess: (data) => {
      setNotifications(data);
    },
    onError: (error) => {
      console.error('Error fetching notifications:', error);
      // Keep fallback notification data
    }
  });

  // Fetch initial data - only once on mount
  useEffect(() => {
    fetchUserProfile();
    fetchNotifications();
  }, []); // Empty dependency array to prevent infinite loops

  const handleToggleFavorite = async (restaurantId: string) => {
    try {
      const isCurrentlyFavorite = favorites.includes(restaurantId);
      await favoriteApi.toggleFavorite(restaurantId, isCurrentlyFavorite);

      setFavorites(prev =>
        prev.includes(restaurantId)
          ? prev.filter(id => id !== restaurantId)
          : [...prev, restaurantId]
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('즐겨찾기 변경에 실패했습니다.');
    }
  };

  const handleUserUpdate = async (updatedUser: User) => {
    try {
      const result = await userApi.updateProfile(updatedUser);
      setUser(result);
      alert('개인정보가 성공적으로 수정되었습니다!');
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert('개인정보 수정에 실패했습니다.');
    }
  };

  const handleBookingUpdate = (updatedData: any) => {
    console.log('Booking updated:', updatedData);
    alert('예약이 성공적으로 수정되었습니다!');
  };

  const handleNotificationAction = async (notification: Notification, action: string) => {
    try {
      if (!notification.isRead) {
        await notificationApi.markAsRead(notification.id);
        setNotifications(prev => prev.map(n =>
          n.id === notification.id ? { ...n, isRead: true } : n
        ));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleNotificationSettings = () => {
    alert('알림 설정 페이지로 이동합니다 (구현 예정)');
  };

  // Calculate unread notification count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Router>
      <div className="h-screen bg-background flex flex-col max-w-md mx-auto relative">
        <div className="flex-1 overflow-hidden pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/restaurant/:id" element={
              <RestaurantDetail
                onToggleFavorite={handleToggleFavorite}
                favorites={favorites}
              />
            } />
            <Route path="/restaurant/:id/reviews" element={<AllReviewsPage />} />
            <Route path="/reservation/:id" element={
              <ReservationPage
                user={user}
                onUserUpdate={handleUserUpdate}
              />
            } />
            <Route path="/reservation" element={<BookingList />} />
            <Route path="/reservation/:id" element={
              <BookingDetail
                onBookingUpdate={handleBookingUpdate}
              />
            } />
            <Route path="/reservation/:id/edit" element={
              <BookingEdit
                onBookingUpdate={handleBookingUpdate}
              />
            } />
            <Route path="/profile" element={
              <ProfilePage
                user={user}
                onUserUpdate={handleUserUpdate}
              />
            } />
            <Route path="/profile/edit" element={
              <UserEditPage
                user={user}
                onSave={handleUserUpdate}
              />
            } />
            <Route path="/notifications" element={
              <NotificationPage
                notifications={notifications}
                onNotificationAction={handleNotificationAction}
                onMarkAllAsRead={handleMarkAllAsRead}
                onNotificationSettings={handleNotificationSettings}
              />
            } />
            <Route path="/search" element={<div className="p-4">검색 페이지 (구현 중)</div>} />
            <Route path="/favorites" element={<div className="p-4">찜한 식당 페이지 (구현 중)</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
          <BottomNavigation
            notificationCount={unreadCount}
          />
        </div>
      </div>
    </Router>
  );
}
