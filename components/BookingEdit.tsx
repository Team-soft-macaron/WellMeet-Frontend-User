import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  MessageSquare,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Booking {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  date: string;
  time: string;
  partySize: number;
  estimatedCost: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  specialRequests?: string;
  location: string;
  phone?: string;
  confirmationNumber?: string;
  bookedAt?: string;
}

interface BookingEditProps {
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

const timeSlots = [
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

export function BookingEdit({ onBookingUpdate }: BookingEditProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // URL 파라미터로 받은 id로 예약 정보 찾기
  const booking = mockBookings.find(b => b.id === id);

  if (!booking) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center p-4 border-b border-border">
          <Button variant="ghost" size="icon" className="mr-3" onClick={() => navigate('/bookings')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-medium">예약 수정</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">예약을 찾을 수 없습니다</p>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    date: booking.date,
    time: booking.time,
    partySize: booking.partySize,
    specialRequests: booking.specialRequests || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate('/bookings');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 수정된 데이터 저장 시뮬레이션
    setTimeout(() => {
      onBookingUpdate(formData);
      setIsLoading(false);
      navigate(`/bookings/${booking.id}`);
    }, 1500);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          className="mr-3"
          onClick={handleBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">예약 수정</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Restaurant Info */}
          <Card className="p-4">
            <div className="space-y-3">
              <h3 className="font-medium">식당 정보</h3>
              <div className="flex space-x-4">
                <ImageWithFallback
                  src={booking.restaurantImage}
                  alt={booking.restaurantName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">
                    {booking.restaurantName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {booking.location}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    확인번호: {booking.confirmationNumber}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Date Selection */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">예약 날짜</h3>
              </div>

              <div className="space-y-2">
                <Label>날짜 선택</Label>
                <Input
                  type="date"
                  value="2024-07-20"
                  onChange={(e) =>
                    handleInputChange("date", e.target.value)
                  }
                  className="w-full"
                  min={new Date().toISOString().split("T")[0]}
                />
                <p className="text-xs text-muted-foreground">
                  현재: {booking.date}
                </p>
              </div>
            </div>
          </Card>

          {/* Time Selection */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">예약 시간</h3>
              </div>

              <div className="space-y-2">
                <Label>시간 선택</Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) =>
                    handleInputChange("time", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="시간을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  현재: {booking.time}
                </p>
              </div>
            </div>
          </Card>

          {/* Party Size */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">인원 수</h3>
              </div>

              <div className="space-y-2">
                <Label>인원 선택</Label>
                <Select
                  value={formData.partySize.toString()}
                  onValueChange={(value) =>
                    handleInputChange(
                      "partySize",
                      parseInt(value),
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="인원을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {partySizes.map((size) => (
                      <SelectItem
                        key={size}
                        value={size.toString()}
                      >
                        {size}명
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  현재: {booking.partySize}명
                </p>
              </div>
            </div>
          </Card>

          {/* Special Requests */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">특별 요청사항</h3>
              </div>

              <div className="space-y-2">
                <Label>요청사항</Label>
                <Textarea
                  placeholder="특별한 요청사항이 있으시면 입력해 주세요..."
                  value={formData.specialRequests}
                  onChange={(e) =>
                    handleInputChange(
                      "specialRequests",
                      e.target.value,
                    )
                  }
                  className="min-h-20"
                />
                {booking.specialRequests && (
                  <p className="text-xs text-muted-foreground">
                    기존 요청: "{booking.specialRequests}"
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Important Notes */}
          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="space-y-2">
              <h3 className="font-medium text-yellow-800">
                예약 수정 안내
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>
                  • 예약 수정은 방문 2시간 전까지 가능합니다
                </li>
                <li>
                  • 수정된 예약은 식당 확인 후 최종 확정됩니다
                </li>
                <li>
                  • 인원 증가 시 추가 요금이 발생할 수 있습니다
                </li>
                <li>• 취소된 예약은 수정할 수 없습니다</li>
              </ul>
            </div>
          </Card>

          {/* Cost Information */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="space-y-2">
              <h3 className="font-medium text-blue-800">
                예상 비용
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">
                  {formData.partySize}명 기준
                </span>
                <span className="font-medium text-blue-800">
                  {booking.estimatedCost}
                </span>
              </div>
              <p className="text-xs text-blue-600">
                * 최종 금액은 주문 내용에 따라 달라질 수
                있습니다
              </p>
            </div>
          </Card>
        </form>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-border space-y-3">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleBack}
            disabled={isLoading}
          >
            취소
          </Button>
          <Button
            className="flex-1"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "수정 중..." : "수정 완료"}
          </Button>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          수정된 예약은 식당 확인 후 최종 확정됩니다
        </p>
      </div>
    </div>
  );
}
