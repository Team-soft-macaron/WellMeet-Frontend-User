import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Calendar, Users, CreditCard, MoreVertical, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

  const upcomingBookings = mockBookings.filter(b =>
    b.status === 'confirmed' || b.status === 'pending'
  );
  const pastBookings = mockBookings.filter(b =>
    b.status === 'completed' || b.status === 'cancelled'
  );

  const handleBack = () => {
    navigate('/');
  };

  const handleBookingSelect = (booking: Booking) => {
    navigate(`/bookings/${booking.id}`);
  };

  const handleBookingEdit = (booking: Booking) => {
    navigate(`/bookings/${booking.id}/edit`);
  };

  const renderBookingCard = (booking: Booking) => {
    const statusInfo = getStatusInfo(booking.status);

    return (
      <Card key={booking.id} className={`p-4 ${statusInfo.bgColor}`}>
        <div className="space-y-3">
          {/* Header with status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${statusInfo.color}`}></div>
              <span className={`font-medium ${statusInfo.textColor}`}>
                {statusInfo.label}
              </span>
              <span className="font-medium">{booking.restaurantName}</span>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          {/* Restaurant info */}
          <div className="flex space-x-3">
            <ImageWithFallback
              src={booking.restaurantImage}
              alt={booking.restaurantName}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{booking.date} {booking.time}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{booking.partySize}명</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CreditCard className="h-4 w-4" />
                  <span>{booking.estimatedCost}</span>
                </div>
              </div>
              {booking.specialRequests && (
                <p className="text-sm text-muted-foreground">
                  "{booking.specialRequests}"
                </p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-2 pt-2">
            {booking.status === 'confirmed' || booking.status === 'pending' ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleBookingSelect(booking)}
                >
                  상세보기
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleBookingEdit(booking)}
                >
                  수정
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => confirm(`${booking.restaurantName} 예약을 취소하시겠습니까?`)}
                >
                  취소
                </Button>
              </>
            ) : booking.status === 'completed' ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleBookingSelect(booking)}
                >
                  상세보기
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => alert(`${booking.restaurantName} 재예약을 진행합니다.`)}
                >
                  재예약
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={() => alert(`${booking.restaurantName} 리뷰 작성 페이지로 이동합니다.`)}
                >
                  <Star className="h-3 w-3 mr-1" />
                  리뷰 작성
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => alert(`${booking.restaurantName} 재예약을 진행합니다.`)}
                >
                  재예약하기
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600"
                  onClick={() => confirm(`${booking.restaurantName} 예약 기록을 삭제하시겠습니까?`)}
                >
                  삭제
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-3" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-medium">내 예약</h1>
        </div>
        <Button variant="ghost" size="sm">
          필터 ⚙️
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-4 pt-4 pb-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">진행중</TabsTrigger>
              <TabsTrigger value="past">완료</TabsTrigger>
              <TabsTrigger value="cancelled">취소</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="upcoming" className="p-4 pb-10 space-y-4 mt-4 h-full">
              {upcomingBookings.length > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="font-medium">예정된 예약</h2>
                    <Badge variant="secondary">{upcomingBookings.length}건</Badge>
                  </div>
                  <div className="space-y-3">
                    {upcomingBookings.map(renderBookingCard)}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">예정된 예약이 없습니다</p>
                  <Button className="mt-4">새 예약 만들기</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="p-4 pb-10 space-y-4 mt-4 h-full">
              {pastBookings.filter(b => b.status === 'completed').length > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="font-medium">지난 예약</h2>
                    <Badge variant="secondary">
                      {pastBookings.filter(b => b.status === 'completed').length}건
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {pastBookings
                      .filter(b => b.status === 'completed')
                      .map(renderBookingCard)}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">완료된 예약이 없습니다</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="p-4 pb-10 space-y-4 mt-4 h-full">
              {pastBookings.filter(b => b.status === 'cancelled').length > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="font-medium">취소된 예약</h2>
                    <Badge variant="secondary">
                      {pastBookings.filter(b => b.status === 'cancelled').length}건
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {pastBookings
                      .filter(b => b.status === 'cancelled')
                      .map(renderBookingCard)}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">취소된 예약이 없습니다</p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
