import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
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
  booking: Booking;
  onBack: () => void;
  onModify?: () => void;
  onCancel?: () => void;
  onReview?: () => void;
}

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

export function BookingDetail({ booking, onBack, onModify, onCancel, onReview }: BookingDetailProps) {
  const statusInfo = getStatusInfo(booking.status);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="icon" className="mr-3" onClick={onBack}>
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
              onClick={onModify}
            >
              예약 수정
            </Button>
            <Button 
              variant="outline" 
              className="text-red-600 hover:text-red-700"
              onClick={onCancel}
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
              onClick={onReview}
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