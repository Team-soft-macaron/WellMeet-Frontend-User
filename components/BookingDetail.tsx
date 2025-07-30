import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Calendar, Users, CreditCard, MapPin, Phone, Clock, MessageSquare, Star } from 'lucide-react';
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

interface BookingDetailProps {
  onBookingUpdate: (updatedData: Partial<Booking>) => void;
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
        label: '예약 확정',
        color: 'bg-green-500',
        textColor: 'text-green-700',
        bgColor: 'bg-green-50 border-green-200'
      };
    case 'pending':
      return {
        label: '예약 대기',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-700',
        bgColor: 'bg-yellow-50 border-yellow-200'
      };
    case 'completed':
      return {
        label: '방문 완료',
        color: 'bg-gray-500',
        textColor: 'text-gray-700',
        bgColor: 'bg-gray-50 border-gray-200'
      };
    case 'cancelled':
      return {
        label: '예약 취소',
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

export function BookingDetail({ onBookingUpdate }: BookingDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // URL 파라미터로 받은 id로 예약 정보 찾기
  const booking = mockBookings.find(b => b.id === id);

  if (!booking) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center p-4 border-b border-border">
          <Button variant="ghost" size="icon" className="mr-3" onClick={() => navigate('/reservation')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-medium">예약 상세정보</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">예약을 찾을 수 없습니다</p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(booking.status);

  const handleBack = () => {
    navigate('/reservation');
  };

  const handleModify = () => {
    navigate(`/reservation/${booking.id}/edit`);
  };

  const handleCancel = () => {
    if (confirm(`${booking.restaurantName} 예약을 취소하시겠습니까?`)) {
      onBookingUpdate({ status: 'cancelled' });
      navigate('/reservation');
    }
  };

  const handleReview = () => {
    alert(`${booking.restaurantName} 리뷰 작성 페이지로 이동합니다`);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="icon" className="mr-3" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">예약 상세정보</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Status Card */}
        <Card className={`p-4 ${statusInfo.bgColor}`}>
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${statusInfo.color}`}></div>
            <div>
              <h2 className={`font-medium ${statusInfo.textColor}`}>
                {statusInfo.label}
              </h2>
              {booking.confirmationNumber && (
                <p className="text-sm text-muted-foreground mt-1">
                  확인번호: {booking.confirmationNumber}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Restaurant Info */}
        <Card className="p-4">
          <div className="space-y-4">
            <h3 className="font-medium">식당 정보</h3>
            <div className="flex space-x-4">
              <ImageWithFallback
                src={booking.restaurantImage}
                alt={booking.restaurantName}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-2">
                <h4 className="font-medium text-lg">{booking.restaurantName}</h4>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{booking.location}</span>
                </div>
                {booking.phone && (
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{booking.phone}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => booking.phone && window.open(`tel:${booking.phone}`)}
              >
                <Phone className="h-4 w-4 mr-1" />
                전화하기
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <MapPin className="h-4 w-4 mr-1" />
                길찾기
              </Button>
            </div>
          </div>
        </Card>

        {/* Booking Details */}
        <Card className="p-4">
          <div className="space-y-4">
            <h3 className="font-medium">예약 정보</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">날짜 및 시간</span>
                </div>
                <span className="font-medium">{booking.date} {booking.time}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">인원</span>
                </div>
                <span className="font-medium">{booking.partySize}명</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">예상 비용</span>
                </div>
                <span className="font-medium text-blue-600">{booking.estimatedCost}</span>
              </div>

              {booking.bookedAt && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">예약한 시간</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{booking.bookedAt}</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Special Requests */}
        {booking.specialRequests && (
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">특별 요청사항</h3>
              </div>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                "{booking.specialRequests}"
              </p>
            </div>
          </Card>
        )}

        {/* Important Notes */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="space-y-2">
            <h3 className="font-medium text-blue-800">예약 안내</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 예약 시간 10분 전까지 도착해 주세요</li>
              <li>• 노쇼 시 향후 예약이 제한될 수 있습니다</li>
              <li>• 예약 변경은 최소 2시간 전에 연락해 주세요</li>
              {booking.status === 'pending' && (
                <li>• 예약 확정까지 최대 1시간 소요됩니다</li>
              )}
            </ul>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-border space-y-3">
        {booking.status === 'confirmed' || booking.status === 'pending' ? (
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleModify}
            >
              예약 수정
            </Button>
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700"
              onClick={handleCancel}
            >
              예약 취소
            </Button>
          </div>
        ) : booking.status === 'completed' ? (
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => alert('재예약 기능은 구현 중입니다')}
            >
              재예약하기
            </Button>
            <Button
              className="flex items-center"
              onClick={handleReview}
            >
              <Star className="h-4 w-4 mr-1" />
              리뷰 작성
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
