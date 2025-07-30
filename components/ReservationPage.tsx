import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Restaurant {
  id: string;
  name: string;
  category?: string;
  priceRange?: string;
  rating: number;
  address: string;
  image?: string;
  phone?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ReservationPageProps {
  restaurant: Restaurant;
  user: User;
  onBack: () => void;
  onComplete: () => void;
  onUserEdit: () => void;
}

export function ReservationPage({
  restaurant,
  user,
  onBack,
  onComplete,
  onUserEdit,
}: ReservationPageProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Check for quick reservation data from localStorage
  const getQuickReservationData = () => {
    try {
      const data = localStorage.getItem("quickReservationData");
      if (data) {
        localStorage.removeItem("quickReservationData"); // Clean up after use
        return JSON.parse(data);
      }
    } catch (error) {
      console.error(
        "Error parsing quick reservation data:",
        error,
      );
    }
    return null;
  };

  const quickData = getQuickReservationData();

  const [selectedDate, setSelectedDate] = useState(
    quickData?.date || "",
  );
  const [selectedTime, setSelectedTime] = useState(
    quickData?.time || "",
  );
  const [adults, setAdults] = useState(
    quickData?.partySize ? parseInt(quickData.partySize) : 2,
  );
  const [children, setChildren] = useState(0);
  const [specialRequests, setSpecialRequests] = useState("");
  const [smsNotification, setSmsNotification] = useState(true);
  const [emailNotification, setEmailNotification] =
    useState(true);
  const [reminderNotification, setReminderNotification] =
    useState(true);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const quickDates = (() => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      let label;
      if (i === 0) {
        label = "오늘";
      } else if (i === 1) {
        label = "내일";
      } else {
        label = "모레";
      }

      dates.push({
        label: label,
        value: date.toISOString().split("T")[0],
      });
    }

    return dates;
  })();

  const lunchTimes = [
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
  ];
  const dinnerTimes = [
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];

  const partySize = adults + children;
  const estimatedCost = adults * 150000 + children * 75000; // 성인 15만원, 어린이 7.5만원

  const handleDateInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedDate(e.target.value);
  };

  const handleDatePickerClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus();
      dateInputRef.current.showPicker?.();
    }
  };

  const formatSelectedDate = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];

    // Check if it's today, tomorrow, or day after tomorrow
    if (date.toDateString() === today.toDateString()) {
      return `오늘 (${month}/${day}, ${weekday})`;
    } else if (
      date.toDateString() === tomorrow.toDateString()
    ) {
      return `내일 (${month}/${day}, ${weekday})`;
    } else if (
      date.toDateString() === dayAfterTomorrow.toDateString()
    ) {
      return `모레 (${month}/${day}, ${weekday})`;
    } else {
      return `${month}/${day} (${weekday})`;
    }
  };

  const handleSubmit = () => {
    if (
      !selectedDate ||
      !selectedTime ||
      !agreedToPolicy ||
      !agreedToPrivacy
    ) {
      return;
    }
    onComplete();
  };

  const isFormValid =
    selectedDate &&
    selectedTime &&
    agreedToPolicy &&
    agreedToPrivacy;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          className="mr-3"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">예약 요청</h1>
      </div>

      {/* Hidden date input */}
      <input
        ref={dateInputRef}
        type="date"
        value={selectedDate}
        onChange={handleDateInputChange}
        min={new Date().toISOString().split("T")[0]}
        className="sr-only"
        tabIndex={-1}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Restaurant Info */}
          <Card className="p-4 bg-muted/30">
            <div className="flex space-x-3">
              <ImageWithFallback
                src={restaurant.image}
                alt={restaurant.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">
                  {restaurant.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {restaurant.category} •{" "}
                  {restaurant.priceRange}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-sm">
                    ⭐ {restaurant.rating}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    • {restaurant.address}
                  </span>
                </div>
              </div>
            </div>
            {quickData && (
              <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  📋 빠른 예약에서 선택한 정보가 자동으로
                  입력되었습니다
                </p>
              </div>
            )}
          </Card>
          {/* Date Selection */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              날짜 선택
            </h3>

            {/* Quick date buttons */}
            <div className="flex space-x-2 mb-3">
              {quickDates.map((date) => (
                <Button
                  key={date.value}
                  variant={
                    selectedDate === date.value
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedDate(date.value)}
                >
                  {date.label}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={handleDatePickerClick}
              >
                <Calendar className="h-3 w-3 mr-1" />
                날짜 직접 선택
              </Button>
            </div>

            {/* Selected date display */}
            {selectedDate && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    선택된 날짜:{" "}
                    {formatSelectedDate(selectedDate)}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* Time Selection */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              시간 선택
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">
                  점심시간
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {lunchTimes.map((time) => (
                    <Button
                      key={time}
                      variant={
                        selectedTime === time
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">
                  저녁시간
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {dinnerTimes.map((time) => (
                    <Button
                      key={time}
                      variant={
                        selectedTime === time
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected time display */}
            {selectedTime && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    선택된 시간: {selectedTime}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* Party Size */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center">
              <Users className="h-4 w-4 mr-2" />
              인원 선택
            </h3>

            <Card className="p-4">
              <div className="space-y-4">
                {/* Adults Selection */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">성인</div>
                    <div className="text-sm text-muted-foreground">
                      만 13세 이상
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setAdults(Math.max(1, adults - 1))
                      }
                      disabled={adults <= 1}
                    >
                      -
                    </Button>
                    <span className="min-w-[2rem] text-center font-medium">
                      {adults}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setAdults(adults + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Children Selection */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">어린이</div>
                    <div className="text-sm text-muted-foreground">
                      만 2세 ~ 12세
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setChildren(Math.max(0, children - 1))
                      }
                      disabled={children <= 0}
                    >
                      -
                    </Button>
                    <span className="min-w-[2rem] text-center font-medium">
                      {children}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setChildren(children + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Total Summary */}
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">총 인원</span>
                    <span className="font-medium text-lg">
                      {partySize}명
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    성인 {adults}명
                    {children > 0 && `, 어린이 ${children}명`}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          {/* Special Requests */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              특별 요청사항 (선택)
            </h3>
            <Textarea
              placeholder="알레르기, 축하 케이크, 창가 자리 등 요청사항을 적어주세요"
              value={specialRequests}
              onChange={(e) =>
                setSpecialRequests(e.target.value)
              }
              className="min-h-[100px]"
            />
          </div>
          {/* Estimated Cost */}
          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="space-y-2">
              <h3 className="font-medium flex items-center">
                💰 예상 금액: {estimatedCost.toLocaleString()}원
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  성인 {adults}명 × 150,000원 ={" "}
                  {(adults * 150000).toLocaleString()}원
                </p>
                {children > 0 && (
                  <p>
                    어린이 {children}명 × 75,000원 ={" "}
                    {(children * 75000).toLocaleString()}원
                  </p>
                )}
                <p className="font-medium">
                  총 {partySize}명 기준 (코스 메뉴)
                </p>
              </div>
              <div className="border-t border-yellow-200 pt-2 mt-2">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-700 mt-0.5" />
                  <div className="text-sm text-yellow-700 space-y-1">
                    <p className="font-medium">⚠️ 예약 정책</p>
                    <p>• 2시간 전 취소 가능</p>
                    <p>• 노쇼 시 1만원 패널티</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          {/* Customer Info */}
          <div className="space-y-3">
            <h3 className="font-medium">👤 예약자 정보</h3>
            <Card className="p-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">
                    이름
                  </label>
                  <Input
                    value={user.name}
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    연락처
                  </label>
                  <Input
                    value={user.phone}
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    이메일
                  </label>
                  <Input
                    value={user.email}
                    disabled
                    className="mt-1"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600"
                  onClick={onUserEdit}
                >
                  정보 수정하기
                </Button>
              </div>
            </Card>
          </div>
          {/* Notification Settings */}
          <div className="space-y-3">
            <h3 className="font-medium">🔔 알림 설정</h3>
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sms"
                    checked={smsNotification}
                    onCheckedChange={(checked) => setSmsNotification(checked === true)}
                  />
                  <label htmlFor="sms" className="text-sm">
                    SMS 알림 받기
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email"
                    checked={emailNotification}
                    onCheckedChange={(checked) => setEmailNotification(checked === true)}
                  />
                  <label htmlFor="email" className="text-sm">
                    이메일 알림 받기
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="reminder"
                    checked={reminderNotification}
                    onCheckedChange={(checked) => setReminderNotification(checked === true)}
                  />
                  <label htmlFor="reminder" className="text-sm">
                    방문 3시간 전 리마인더
                  </label>
                </div>
              </div>
            </Card>
          </div>
          {/* Agreements */}
          <div className="space-y-3">
            <h3 className="font-medium">약관 동의</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="policy"
                  checked={agreedToPolicy}
                  onCheckedChange={(checked) => setAgreedToPolicy(checked === true)}
                />
                <label htmlFor="policy" className="text-sm">
                  예약 정책 및 취소 규정에 동의{" "}
                  <span className="text-red-500">*</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-blue-600 ml-1"
                  >
                    (상세보기)
                  </Button>
                </label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy"
                  checked={agreedToPrivacy}
                  onCheckedChange={(checked) => setAgreedToPrivacy(checked === true)}
                />
                <label htmlFor="privacy" className="text-sm">
                  개인정보 수집 및 이용에 동의{" "}
                  <span className="text-red-500">*</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-blue-600 ml-1"
                  >
                    (상세보기)
                  </Button>
                </label>
              </div>
            </div>
          </div>
          <div className="h-20"></div>{" "}
          {/* Bottom padding for fixed button */}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-background border-t border-border">
        <Button
          className="w-full h-14"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          예약 요청하기
        </Button>
      </div>
    </div>
  );
}
