import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Share, Heart, Star, MapPin, Phone, Clock, Calendar, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { restaurantApi, favoriteApi } from '../src/utils/api';
import { useApiWithId } from '../src/hooks/useApi';
import type { RestaurantDetail as RestaurantDetailType } from '../src/types/api';

interface RestaurantDetailProps {
  onToggleFavorite: (restaurantId: string) => void;
  favorites: string[];
}

// Fallback mock data for when API is not available
const fallbackRestaurant: RestaurantDetailType = {
  id: '1',
  name: '라비올로',
  address: '강남구 논현동',
  distance: '500m',
  rating: 4.5,
  thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
  category: '이탈리안',
  priceRange: '15-20만원',
  reviewCount: 124,
  phone: '02-1234-5678',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
  description: '로맨틱한 분위기로 유명한 이탈리안 레스토랑',
  latitude: 37.5665,
  longitude: 126.9780,
  favorite: false,
  menus: [
    { name: '트러플 리조또', price: 85000 },
    { name: '랍스터 파스타', price: 120000 },
    { name: '미트볼 파스타', price: 68000 },
    { name: '오사카 스테이크', price: 150000 }
  ],
  reviews: [
    { situation: '데이트', logo: '💕', content: '데이트 코스로 최고예요! 분위기도 좋고 음식도 정말 맛있었어요.' },
    { situation: '회식', logo: '👥', content: '회사 회식으로 갔는데 정말 좋았어요. 랍스터 파스타가 일품이었고, 직원분들도 매우 친절하셨습니다.' },
    { situation: '가족', logo: '👨‍👩‍👧‍👦', content: '가족 모임으로 갔는데 모두 만족했어요. 특히 아이들이 좋아하는 미트볼 파스타가 인기였습니다.' }
  ]
};

const formatPrice = (price: number): string => {
  return price.toLocaleString('ko-KR') + '원';
};

export function RestaurantDetail({ onToggleFavorite, favorites }: RestaurantDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedReviewFilter, setSelectedReviewFilter] = useState('전체');
  const [restaurantData, setRestaurantData] = useState<RestaurantDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use custom hook for API calls
  const { execute: fetchRestaurantDetail } = useApiWithId(restaurantApi.getDetail, {
    onSuccess: (data) => {
      setRestaurantData(data);
      setLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching restaurant detail:', error);
      setError('Failed to load restaurant details');
      // Use fallback data when API fails
      setRestaurantData(fallbackRestaurant);
      setLoading(false);
    }
  });

  useEffect(() => {
    if (id) {
      fetchRestaurantDetail(id);
    }
  }, [id]); // Remove fetchRestaurantDetail from dependencies to prevent infinite loops

  useEffect(() => {
    if (!restaurantData && !loading) {
      // If no restaurant data and not loading, redirect to home
      navigate('/');
    }
  }, [restaurantData, loading, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleReservationRequest = () => {
    if (restaurantData) {
      navigate(`/reservation/${restaurantData.id}`);
    }
  };

  const handleViewAllReviews = () => {
    if (restaurantData) {
      navigate(`/restaurant/${restaurantData.id}/reviews`);
    }
  };

  const handleToggleFavorite = async () => {
    if (!restaurantData) return;

    try {
      await favoriteApi.toggleFavorite(restaurantData.id, restaurantData.favorite);

      // Update local state
      setRestaurantData({
        ...restaurantData,
        favorite: !restaurantData.favorite
      });

      // Update parent component state
      onToggleFavorite(restaurantData.id);
    } catch (err) {
      console.error('Error toggling favorite:', err);
      alert('즐겨찾기 변경에 실패했습니다.');
    }
  };

  const handleShare = () => {
    if (navigator.share && restaurantData) {
      navigator.share({
        title: restaurantData.name,
        text: `${restaurantData.name} - ${restaurantData.description}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading restaurant details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !restaurantData) {
    return (
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurantData) {
    return null;
  }

  const isFavorite = restaurantData.favorite;

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className={isFavorite ? 'text-red-500' : ''}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Restaurant Images */}
      <div className="relative h-64">
        <ImageWithFallback
          src={restaurantData.thumbnail || restaurantData.image}
          alt={restaurantData.name}
          className="w-full h-full object-cover"
          fallbackSrc="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-2xl font-bold mb-1">{restaurantData.name}</h1>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{restaurantData.rating}</span>
              <span>({restaurantData.reviewCount})</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
              {restaurantData.category}
            </Badge>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{restaurantData.address}</span>
            <span>•</span>
            <span>{restaurantData.distance}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{restaurantData.phone}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{restaurantData.description}</p>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button
            onClick={handleReservationRequest}
            className="flex-1 h-12 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Calendar className="h-4 w-4 mr-2" />
            예약하기
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="menu">메뉴</TabsTrigger>
            <TabsTrigger value="reviews">리뷰</TabsTrigger>
            <TabsTrigger value="info">정보</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-4">
            <div className="space-y-3">
              {restaurantData.menus.map((menu, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{menu.name}</h4>
                    </div>
                    <span className="font-semibold text-primary">
                      {formatPrice(menu.price)}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">리뷰 ({restaurantData.reviews.length})</h3>
              <Button variant="ghost" size="sm" onClick={handleViewAllReviews}>
                전체보기
              </Button>
            </div>
            <div className="space-y-4">
              {restaurantData.reviews.slice(0, 3).map((review, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{review.logo}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {review.situation}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">영업 정보</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">카테고리</span>
                  <span>{restaurantData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">가격대</span>
                  <span>{restaurantData.priceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">평점</span>
                  <span>{restaurantData.rating} ({restaurantData.reviewCount}개 리뷰)</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
