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

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'standard' | 'premium' | 'vip';
}

interface Restaurant {
  id: string;
  name: string;
  category: string;
  priceRange: string;
  rating: number;
  reviewCount: number;
  location: string;
  phone: string;
  image: string;
  description: string;
  operatingHours: {
    weekday: string;
    weekend: string;
    breakTime?: string;
    closedDay: string;
  };
  features: string[];
}

interface Booking {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  date: string;
  time: string;
  partySize: number;
  estimatedCost: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  specialRequests?: string;
  location: string;
  phone?: string;
  confirmationNumber?: string;
  bookedAt?: string;
}

interface Notification {
  id: string;
  type: 'booking_confirmed' | 'reminder' | 'review_reply' | 'concierge_message';
  title: string;
  message: string;
  detail: string;
  time: string;
  isRead: boolean;
  bookingId?: string;
  restaurantId?: string;
}

// Mock data
const mockBookings: Booking[] = [
  {
    id: '1',
    restaurantName: '라비올로',
    restaurantImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop',
    date: '7월 20일 (토)',
    time: '19:00',
    partySize: 2,
    estimatedCost: '30만원',
    status: 'confirmed',
    specialRequests: '창가 자리로 부탁드려요',
    location: '강남구 논현동',
    phone: '02-1234-5678',
    confirmationNumber: 'WM240720001',
    bookedAt: '7월 18일 14:30'
  }
];

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: '라비올로',
    category: '이탈리안',
    priceRange: '20-30만원',
    rating: 4.8,
    reviewCount: 124,
    location: '강남구 논현동',
    phone: '02-1234-5678',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop',
    description: '정통 이탈리안 레스토랑',
    operatingHours: {
      weekday: '11:30 - 22:00',
      weekend: '11:30 - 22:30',
      breakTime: '15:00 - 17:00',
      closedDay: '매주 월요일'
    },
    features: ['발렛파킹', '프라이빗룸', '와인바']
  }
];

const mockNotifications: Notification[] = [
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
  const [user, setUser] = useState<User>({
    id: '1',
    name: '김민수',
    email: 'user@example.com',
    phone: '010-1234-5678',
    tier: 'premium'
  });
  const [favorites, setFavorites] = useState<string[]>(['1', '4']);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const handleToggleFavorite = (restaurantId: string) => {
    setFavorites(prev =>
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    alert('개인정보가 성공적으로 수정되었습니다!');
  };

  const handleBookingUpdate = (updatedData: Partial<Booking>) => {
    console.log('Booking updated:', updatedData);
    alert('예약이 성공적으로 수정되었습니다!');
  };

  const handleNotificationAction = (notification: Notification, action: string) => {
    setNotifications(prev => prev.map(n =>
      n.id === notification.id ? { ...n, isRead: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationSettings = () => {
    alert('알림 설정 페이지로 이동합니다 (구현 예정)');
  };

  // Calculate unread notification count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
        <div className="flex-1 overflow-hidden">
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
            <Route path="/bookings" element={<BookingList />} />
            <Route path="/bookings/:id" element={
              <BookingDetail
                onBookingUpdate={handleBookingUpdate}
              />
            } />
            <Route path="/bookings/:id/edit" element={
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
        <BottomNavigation
          notificationCount={unreadCount}
        />
      </div>
    </Router>
  );
}
