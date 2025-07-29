import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  ArrowLeft,
  Edit2,
  Bell,
  User,
  Crown,
  CreditCard,
  Phone,
  HelpCircle,
  Settings,
  FileText,
  Shield,
  LogOut,
  Star,
  Heart,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'standard' | 'premium' | 'vip';
}

interface ProfilePageProps {
  user: User;
  onUserUpdate: (updatedUser: User) => void;
}

const getTierInfo = (tier: User['tier']) => {
  switch (tier) {
    case 'premium':
      return {
        label: 'Premium Member',
        icon: '🏆',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50 border-yellow-200'
      };
    case 'vip':
      return {
        label: 'VIP Member',
        icon: '👑',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50 border-purple-200'
      };
    default:
      return {
        label: 'Standard Member',
        icon: '⭐',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50 border-gray-200'
      };
  }
};

const mockStats = {
  reviewsCount: 8,
  favoritesCount: 12,
  bookingsCount: 24,
  averageRating: 4.6
};

export function ProfilePage({ user, onUserUpdate }: ProfilePageProps) {
  const navigate = useNavigate();
  const tierInfo = getTierInfo(user.tier);

  const handleBack = () => {
    navigate('/');
  };

  const handleUserEdit = () => {
    navigate('/profile/edit');
  };

  const menuItems = [
    {
      icon: Bell,
      label: '알림 설정',
      description: 'SMS, 이메일, 리마인더 설정',
      onClick: () => { }
    },
    {
      icon: User,
      label: '개인정보 수정',
      description: '이름, 연락처, 프로필 사진',
      onClick: handleUserEdit
    },
    {
      icon: Crown,
      label: '멤버십 관리',
      description: '등급 혜택 및 포인트 확인',
      onClick: () => { }
    },
    {
      icon: CreditCard,
      label: '결제 수단 관리',
      description: '카드 등록 및 관리',
      onClick: () => { }
    },
    {
      icon: Phone,
      label: '컨시어지 연결',
      description: '1:1 맞춤 상담 서비스',
      onClick: () => { }
    },
    {
      icon: HelpCircle,
      label: '고객센터',
      description: 'FAQ, 문의하기',
      onClick: () => { }
    },
    {
      icon: Settings,
      label: '앱 설정',
      description: '언어, 알림, 데이터 설정',
      onClick: () => { }
    },
    {
      icon: FileText,
      label: '이용약관',
      description: '서비스 이용약관',
      onClick: () => { }
    },
    {
      icon: Shield,
      label: '개인정보처리방침',
      description: '개인정보 처리 및 보호',
      onClick: () => { }
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="icon" className="mr-3" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">내 정보</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Profile Info */}
          <Card className={`p-6 ${tierInfo.bgColor}`}>
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="text-xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 w-6 h-6"
                  variant="secondary"
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-medium">{user.name}</h2>
                <Badge className={`${tierInfo.color} ${tierInfo.bgColor} border-0`}>
                  {tierInfo.icon} {tierInfo.label}
                </Badge>
              </div>

              <Button variant="outline" size="sm" onClick={handleUserEdit}>
                프로필 수정
              </Button>
            </div>
          </Card>

          {/* Activity Stats */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">나의 활동</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-lg font-medium">{mockStats.reviewsCount}개</span>
                </div>
                <p className="text-sm text-muted-foreground">작성한 리뷰</p>
              </div>

              <div className="text-center space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-lg font-medium">{mockStats.favoritesCount}개</span>
                </div>
                <p className="text-sm text-muted-foreground">찜한 식당</p>
              </div>

              <div className="text-center space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-lg font-medium">{mockStats.bookingsCount}건</span>
                </div>
                <p className="text-sm text-muted-foreground">총 예약</p>
              </div>

              <div className="text-center space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-green-500" />
                  <span className="text-lg font-medium">{mockStats.averageRating}점</span>
                </div>
                <p className="text-sm text-muted-foreground">평균 평점</p>
              </div>
            </div>
          </Card>

          {/* Premium Benefits (if applicable) */}
          {user.tier !== 'standard' && (
            <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  <h3 className="font-medium">프리미엄 혜택</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>24시간 컨시어지 서비스</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>우선 예약 처리</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>특별 할인 및 혜택</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  혜택 자세히 보기
                </Button>
              </div>
            </Card>
          )}

          {/* Menu Items */}
          <Card className="divide-y divide-border">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full p-4 text-left hover:bg-muted/50 transition-colors flex items-center space-x-3"
                onClick={item.onClick}
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </Card>

          {/* Logout */}
          <Card className="border-red-200">
            <button
              className="w-full p-4 text-left hover:bg-red-50 transition-colors flex items-center space-x-3"
              onClick={() => {
                if (confirm('정말 로그아웃하시겠습니까?')) {
                  // Handle logout
                }
              }}
            >
              <LogOut className="h-5 w-5 text-red-600" />
              <div className="flex-1">
                <p className="font-medium text-red-600">로그아웃</p>
              </div>
            </button>
          </Card>

          {/* App Version */}
          <div className="text-center text-sm text-muted-foreground">
            WellMeet v1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}
