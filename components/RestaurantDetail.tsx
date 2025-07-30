import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Share, Heart, Star, MapPin, Phone, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { restaurantApi } from '../src/utils/api';
import type { Restaurant } from '../src/types/api';

// Fallback mock data for when API is not available
const fallbackRestaurant: Restaurant = {
  id: '1',
  name: '라비올로',
  address: '강남구 논현동',
  distance: '0m',
  rating: 4.8,
  thumbnail: '',
  category: '이탈리안',
  priceRange: '20-30만원',
  reviewCount: 124,
  phone: '02-1234-5678',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
  description: '로맨틱한 분위기의 이탈리안 레스토랑',
  operatingHours: {
    weekday: '11:00 - 22:00',
    weekend: '11:00 - 23:00',
    closedDay: '월요일'
  },
  features: ['와인', '데이트', '로맨틱']
};

interface RestaurantDetailProps {
  onToggleFavorite: (restaurantId: string) => void;
  favorites: string[];
}

export function RestaurantDetail({ onToggleFavorite }: RestaurantDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        if (id) {
          const data = await restaurantApi.getDetail(id);
          setRestaurantData(data);
        } else {
          setRestaurantData(fallbackRestaurant);
        }
      } catch (error) {
        console.error('Error fetching restaurant detail:', error);
        setError('식당 정보를 불러오는데 실패했습니다.');
        setRestaurantData(fallbackRestaurant);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetail();
  }, [id]);

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

  const handleToggleFavorite = async () => {
    if (!restaurantData) return;

    try {
      onToggleFavorite(restaurantData.id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
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

          {/* 메뉴 섹션 */}
          <TabsContent value="menu" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">메뉴</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">트러플 리조또</span>
                    <span className="text-primary font-semibold">85,000원</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">랍스터 파스타</span>
                    <span className="text-primary font-semibold">120,000원</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">미트볼 파스타</span>
                    <span className="text-primary font-semibold">68,000원</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 리뷰 섹션 */}
          <TabsContent value="reviews" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">리뷰 (3)</h3>
              <Button variant="outline" size="sm" onClick={() => navigate(`/restaurant/${id}/reviews`)}>
                전체보기
              </Button>
            </div>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">💕</span>
                  <span className="text-sm font-medium">데이트</span>
                </div>
                <p className="text-sm text-muted-foreground">데이트 코스로 최고예요! 분위기도 좋고 음식도 정말 맛있었어요.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">👥</span>
                  <span className="text-sm font-medium">회식</span>
                </div>
                <p className="text-sm text-muted-foreground">회사 회식으로 갔는데 정말 좋았어요. 랍스터 파스타가 일품이었고, 직원분들도 매우 친절하셨습니다.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                  <span className="text-sm font-medium">가족</span>
                </div>
                <p className="text-sm text-muted-foreground">가족 모임으로 갔는데 모두 만족했어요. 특히 아이들이 좋아하는 미트볼 파스타가 인기였습니다.</p>
              </div>
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
