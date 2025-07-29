import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, User, Mail, Phone, Save } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'standard' | 'premium' | 'vip';
}

interface UserEditPageProps {
  user: User;
  onBack: () => void;
  onSave: (updatedUser: User) => void;
  returnPage?: 'profile' | 'reservation';
}

export function UserEditPage({ user, onBack, onSave, returnPage = 'profile' }: UserEditPageProps) {
  const [formData, setFormData] = useState<User>({
    ...user
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  // 입력 검증
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '이름은 2글자 이상 입력해주세요';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '전화번호를 입력해주세요';
    } else if (!/^010-\d{4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '전화번호는 010-0000-0000 형식으로 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 전화번호 자동 포맷팅
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handleInputChange = (field: keyof User, value: string) => {
    if (field === 'phone') {
      value = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // 실시간 오류 제거
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // 서버 업데이트 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave(formData);
    setIsLoading(false);
  };

  const getTierDisplayName = (tier: string) => {
    switch (tier) {
      case 'standard': return '스탠다드';
      case 'premium': return '프리미엄';
      case 'vip': return 'VIP';
      default: return tier;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'standard': return 'text-gray-600';
      case 'premium': return 'text-blue-600';
      case 'vip': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const hasChanges = () => {
    return formData.name !== user.name || 
           formData.email !== user.email || 
           formData.phone !== user.phone;
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="icon" className="mr-3" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">개인정보 수정</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* 프로필 이미지 */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary-foreground" />
              </div>
              <Button 
                size="sm" 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs"
                variant="outline"
              >
                사진 변경
              </Button>
            </div>
          </div>

          {/* 멤버십 정보 */}
          <Card className="p-4 bg-muted/30">
            <div className="text-center space-y-2">
              <div className={`text-sm font-medium ${getTierColor(formData.tier)}`}>
                {getTierDisplayName(formData.tier)} 멤버
              </div>
              <div className="text-xs text-muted-foreground">
                {formData.tier === 'vip' ? '최고 등급 회원입니다' : 
                 formData.tier === 'premium' ? '다음 달 VIP 승급 가능' : 
                 '5회 더 이용시 프리미엄 승급'}
              </div>
            </div>
          </Card>

          {/* 개인정보 수정 폼 */}
          <div className="space-y-4">
            <h3 className="font-medium">기본 정보</h3>
            
            {/* 이름 */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <User className="h-4 w-4 mr-2" />
                이름 <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="이름을 입력하세요"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* 이메일 */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                이메일 <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="이메일을 입력하세요"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* 전화번호 */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                전화번호 <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="010-0000-0000"
                maxLength={13}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* 알림 설정 */}
          <div className="space-y-4">
            <h3 className="font-medium">알림 설정</h3>
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">예약 알림</span>
                  <Button variant="outline" size="sm">설정</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">마케팅 알림</span>
                  <Button variant="outline" size="sm">설정</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">이벤트 알림</span>
                  <Button variant="outline" size="sm">설정</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* 계정 관리 */}
          <div className="space-y-4">
            <h3 className="font-medium">계정 관리</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                비밀번호 변경
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                계정 연동 관리
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-600">
                계정 탈퇴
              </Button>
            </div>
          </div>

          <div className="h-20"></div> {/* Bottom padding for fixed button */}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-background border-t border-border">
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1" onClick={onBack}>
            취소
          </Button>
          <Button 
            className="flex-1"
            onClick={handleSave}
            disabled={!hasChanges() || isLoading}
          >
            {isLoading ? (
              <>
                <Save className="h-4 w-4 mr-2 animate-spin" />
                저장 중...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                저장하기
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}