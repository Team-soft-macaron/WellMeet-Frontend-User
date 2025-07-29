import React, { useState, useEffect } from 'react';
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

type Page = 'home' | 'chat' | 'restaurant' | 'all-reviews' | 'reservation' | 'bookings' | 'booking-detail' | 'booking-edit' | 'favorites' | 'profile' | 'user-edit' | 'notifications' | 'search';

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

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [userEditReturnPage, setUserEditReturnPage] = useState<'profile' | 'reservation'>('profile');
  
  const [user, setUser] = useState<User>({
    id: '1',
    name: '김민수',
    email: 'user@example.com',
    phone: '010-1234-5678',
    tier: 'premium'
  });
  const [favorites, setFavorites] = useState<string[]>(['1', '4']); // Restaurant IDs

  // Mock bookings data for notification linking
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

  // Mock restaurants data for notification linking
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

  const [notifications, setNotifications] = useState<Notification[]>([
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
  ]);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    setSelectedRestaurant(null);
    setSelectedBooking(null);
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentPage('restaurant');
  };

  const handleViewAllReviews = () => {
    setCurrentPage('all-reviews');
  };

  const handleReservationRequest = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentPage('reservation');
  };

  const handleBookingSelect = (booking: Booking) => {
    setSelectedBooking(booking);
    setCurrentPage('booking-detail');
  };

  const handleBookingEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setCurrentPage('booking-edit');
  };

  const handleBookingUpdate = (updatedData: Partial<Booking>) => {
    // 예약 정보 업데이트 로직 (실제로는 서버에 저장)
    console.log('Booking updated:', updatedData);
    alert('예약이 성공적으로 수정되었습니다!');
    setCurrentPage('booking-detail');
  };

  const handleToggleFavorite = (restaurantId: string) => {
    setFavorites(prev => 
      prev.includes(restaurantId) 
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  // 사용자 정보 수정 관련 핸들러들
  const handleUserEdit = (returnPage: 'profile' | 'reservation' = 'profile') => {
    setUserEditReturnPage(returnPage);
    setCurrentPage('user-edit');
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    
    // 성공 메시지
    alert('개인정보가 성공적으로 수정되었습니다!');
    
    // 이전 페이지로 돌아가기
    if (userEditReturnPage === 'reservation') {
      setCurrentPage('reservation');
    } else {
      setCurrentPage('profile');
    }
  };

  const handleNotificationAction = (notification: Notification, action: string) => {
    // 알림을 읽음으로 표시
    setNotifications(prev => prev.map(n => 
      n.id === notification.id ? { ...n, isRead: true } : n
    ));

    switch (action) {
      case 'view':
        // 일반적인 알림 클릭 - 기본 동작
        if (notification.type === 'booking_confirmed' || notification.type === 'reminder') {
          if (notification.bookingId) {
            const booking = mockBookings.find(b => b.id === notification.bookingId);
            if (booking) {
              handleBookingSelect(booking);
            }
          } else {
            setCurrentPage('bookings');
          }
        } else if (notification.type === 'review_reply') {
          if (notification.restaurantId) {
            const restaurant = mockRestaurants.find(r => r.id === notification.restaurantId);
            if (restaurant) {
              handleRestaurantSelect(restaurant);
              // 리뷰 탭으로 이동하는 추가 로직을 나중에 구현할 수 있음
            }
          }
        }
        break;

      case 'booking_detail':
        // 예약 상세보기
        if (notification.bookingId) {
          const booking = mockBookings.find(b => b.id === notification.bookingId);
          if (booking) {
            handleBookingSelect(booking);
          }
        } else {
          setCurrentPage('bookings');
        }
        break;

      case 'booking_list':
        // 예약 확인하기
        setCurrentPage('bookings');
        break;

      case 'review_reply':
        // 답글 확인하기
        if (notification.restaurantId) {
          const restaurant = mockRestaurants.find(r => r.id === notification.restaurantId);
          if (restaurant) {
            setSelectedRestaurant(restaurant);
            setCurrentPage('all-reviews'); // 전체 리뷰 페이지로 바로 이동
          }
        }
        break;

      case 'concierge':
        // 상담 내역 보기
        alert('컨시어지 상담 내역 페이지로 이동합니다 (구현 예정)');
        break;

      default:
        break;
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationSettings = () => {
    alert('알림 설정 페이지로 이동합니다 (구현 예정)');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            onAIRecommendClick={() => setCurrentPage('chat')} 
            onRestaurantClick={handleRestaurantSelect} 
            onSearchClick={() => setCurrentPage('search')}
            onNotificationClick={() => setCurrentPage('notifications')}
          />
        );
      case 'chat':
        return <ChatPage onRestaurantSelect={handleRestaurantSelect} onReservationRequest={handleReservationRequest} />;
      case 'restaurant':
        return selectedRestaurant ? (
          <RestaurantDetail 
            restaurant={selectedRestaurant} 
            onBack={() => setCurrentPage('home')}
            onReservationRequest={() => handleReservationRequest(selectedRestaurant)}
            onViewAllReviews={handleViewAllReviews}
            isFavorited={favorites.includes(selectedRestaurant.id)}
            onToggleFavorite={() => handleToggleFavorite(selectedRestaurant.id)}
          />
        ) : null;
      case 'all-reviews':
        return selectedRestaurant ? (
          <AllReviewsPage
            restaurant={selectedRestaurant}
            onBack={() => setCurrentPage('restaurant')}
          />
        ) : null;
      case 'reservation':
        return selectedRestaurant ? (
          <ReservationPage
            restaurant={selectedRestaurant}
            user={user}
            onBack={() => setCurrentPage('restaurant')}
            onComplete={() => setCurrentPage('bookings')}
            onUserEdit={() => handleUserEdit('reservation')}
          />
        ) : null;
      case 'bookings':
        return <BookingList onBack={() => setCurrentPage('home')} onBookingSelect={handleBookingSelect} onBookingEdit={handleBookingEdit} />;
      case 'booking-detail':
        return selectedBooking ? (
          <BookingDetail
            booking={selectedBooking}
            onBack={() => setCurrentPage('bookings')}
            onModify={() => handleBookingEdit(selectedBooking)}
            onCancel={() => confirm('예약을 취소하시겠습니까?')}
            onReview={() => alert('리뷰 작성 페이지로 이동합니다')}
          />
        ) : null;
      case 'booking-edit':
        return selectedBooking ? (
          <BookingEdit
            booking={selectedBooking}
            onBack={() => setCurrentPage('booking-detail')}
            onSave={handleBookingUpdate}
          />
        ) : null;
      case 'profile':
        return (
          <ProfilePage 
            user={user} 
            onBack={() => setCurrentPage('home')}
            onUserEdit={() => handleUserEdit('profile')}
          />
        );
      case 'user-edit':
        return (
          <UserEditPage
            user={user}
            onBack={() => {
              if (userEditReturnPage === 'reservation') {
                setCurrentPage('reservation');
              } else {
                setCurrentPage('profile');
              }
            }}
            onSave={handleUserUpdate}
            returnPage={userEditReturnPage}
          />
        );
      case 'favorites':
        return <div className="p-4">찜한 식당 페이지 (구현 중)</div>;
      case 'search':
        return <div className="p-4">검색 페이지 (구현 중)</div>;
      case 'notifications':
        return (
          <NotificationPage 
            notifications={notifications} 
            onBack={() => setCurrentPage('home')}
            onNotificationAction={handleNotificationAction}
            onMarkAllAsRead={handleMarkAllAsRead}
            onNotificationSettings={handleNotificationSettings}
          />
        );
      default:
        return (
          <Home 
            onAIRecommendClick={() => setCurrentPage('chat')} 
            onRestaurantClick={handleRestaurantSelect} 
            onSearchClick={() => setCurrentPage('search')}
            onNotificationClick={() => setCurrentPage('notifications')}
          />
        );
    }
  };

  // Calculate unread notification count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      <div className="flex-1 overflow-hidden">
        {renderCurrentPage()}
      </div>
      <BottomNavigation 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        notificationCount={unreadCount}
      />
    </div>
  );
}