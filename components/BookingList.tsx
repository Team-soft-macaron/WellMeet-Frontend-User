import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Calendar, Users, CreditCard } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { bookingApi } from '../src/utils/api';
import { useApi } from '../src/hooks/useApi';
import type { Booking } from '../src/types/api';

// Fallback mock data for when API is not available
const fallbackBookings: Booking[] = [
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
  },
  {
    id: '2',
    restaurantName: '스시 오마카세',
    restaurantImage: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop',
    date: '7월 25일 (목)',
    time: '18:00',
    partySize: 4,
    estimatedCost: '72만원',
    status: 'pending',
    location: '청담동',
    phone: '02-2345-6789',
    confirmationNumber: 'WM240725002',
    bookedAt: '7월 23일 09:15'
  },
  {
    id: '3',
    restaurantName: '더 키친',
    restaurantImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300&h=200&fit=crop',
    date: '7월 10일 (수)',
    time: '19:30',
    partySize: 2,
    estimatedCost: '32만원',
    status: 'completed',
    location: '청담동',
    phone: '02-3456-7890',
    confirmationNumber: 'WM240710003',
    bookedAt: '7월 8일 16:20'
  }
];

const getStatusInfo = (status: Booking['status']) => {
  switch (status) {
    case 'confirmed':
      return {
        label: '확정',
        color: 'bg-green-500',
        textColor: 'text-green-700',
        bgColor: 'bg-green-50 border-green-200'
      };
    case 'pending':
      return {
        label: '대기',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-700',
        bgColor: 'bg-yellow-50 border-yellow-200'
      };
    case 'completed':
      return {
        label: '완료',
        color: 'bg-gray-500',
        textColor: 'text-gray-700',
        bgColor: 'bg-gray-50 border-gray-200'
      };
    case 'cancelled':
      return {
        label: '취소',
        color: 'bg-red-500',
        textColor: 'text-red-700',
        bgColor: 'bg-red-50 border-red-200'
      };
    default:
      return {
        label: '알 수 없음',
        color: 'bg-gray-500',
        textColor: 'text-gray-700',
        bgColor: 'bg-gray-50 border-gray-200'
      };
  }
};

export function BookingList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use custom hook for API calls
  const { execute: fetchBookings } = useApi(bookingApi.getBookings, {
    onSuccess: (data) => {
      setBookings(data);
      setLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings');
      // Use fallback data when API fails
      setBookings(fallbackBookings);
      setLoading(false);
    }
  });

  // Fetch bookings only once on mount
  useEffect(() => {
    setLoading(true);
    fetchBookings();
  }, []); // Empty dependency array to prevent infinite loops

  const handleBack = () => {
    navigate(-1);
  };

  const handleBookingSelect = (booking: Booking) => {
    navigate(`/reservation/${booking.id}`);
  };

  const renderBookingCard = (booking: Booking) => {
    const statusInfo = getStatusInfo(booking.status);

    return (
      <Card
        key={booking.id}
        className="p-4 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => handleBookingSelect(booking)}
      >
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <ImageWithFallback
              src={booking.restaurantImage}
              alt={booking.restaurantName}
              className="w-20 h-20 rounded-lg object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg truncate">{booking.restaurantName}</h3>
              <Badge
                variant="outline"
                className={`${statusInfo.bgColor} ${statusInfo.textColor} border-current`}
              >
                {statusInfo.label}
              </Badge>
            </div>

            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{booking.date} {booking.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{booking.partySize}명</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>{booking.estimatedCost}</span>
              </div>
              {booking.confirmationNumber && (
                <div className="text-xs">
                  예약번호: {booking.confirmationNumber}
                </div>
              )}
            </div>

            {booking.specialRequests && (
              <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                <span className="font-medium">특별 요청:</span> {booking.specialRequests}
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  const upcomingBookings = bookings.filter(booking =>
    booking.status === 'confirmed' || booking.status === 'pending'
  );

  const pastBookings = bookings.filter(booking =>
    booking.status === 'completed' || booking.status === 'cancelled'
  );

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">예약 내역</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {error && (
          <div className="text-center py-4 text-red-500 mb-4">
            {error}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">
              예정 ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              완료 ({pastBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-4">
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>예정된 예약이 없습니다</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => navigate('/')}
                >
                  맛집 찾기
                </Button>
              </div>
            ) : (
              upcomingBookings.map(renderBookingCard)
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-4">
            {pastBookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>완료된 예약이 없습니다</p>
              </div>
            ) : (
              pastBookings.map(renderBookingCard)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
