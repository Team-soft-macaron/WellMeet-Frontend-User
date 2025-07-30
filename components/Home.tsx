import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Search, Bell, Star, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { restaurantApi } from '../src/utils/api';
import type { Restaurant } from '../src/types/api';

// Fallback mock data for when API is not available
const fallbackRestaurants: Restaurant[] = [
  {
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
    description: '로맨틱한 분위기로 유명한 이탈리안 레스토랑'
  },
  {
    id: '2',
    name: '스시 오마카세',
    address: '청담동',
    distance: '1.2km',
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    category: '일식',
    priceRange: '18-25만원',
    reviewCount: 89,
    phone: '02-2345-6789',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    description: '프라이빗한 공간에서 즐기는 오마카세'
  },
  {
    id: '3',
    name: '더 키친',
    address: '청담동',
    distance: '800m',
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
    category: '프렌치',
    priceRange: '16-22만원',
    reviewCount: 156,
    phone: '02-3456-7890',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
    description: '특별한 날 완벽한 선택'
  }
];

// Mock data for recent and popular restaurants (keeping original design)
const recentRestaurants: Restaurant[] = [
  {
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
    description: '로맨틱한 분위기로 유명한 이탈리안 레스토랑'
  },
  {
    id: '2',
    name: '스시 오마카세',
    address: '청담동',
    distance: '1.2km',
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    category: '일식',
    priceRange: '18-25만원',
    reviewCount: 89,
    phone: '02-2345-6789',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    description: '프라이빗한 공간에서 즐기는 오마카세'
  },
  {
    id: '3',
    name: '더 키친',
    address: '청담동',
    distance: '800m',
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
    category: '프렌치',
    priceRange: '16-22만원',
    reviewCount: 156,
    phone: '02-3456-7890',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
    description: '특별한 날 완벽한 선택'
  }
];

const popularRestaurants: Restaurant[] = [
  {
    id: '4',
    name: '모던 바비큐',
    address: '삼성동',
    distance: '1.5km',
    rating: 4.4,
    thumbnail: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    category: '한식',
    priceRange: '12-18만원',
    reviewCount: 203,
    phone: '02-4567-8901',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    description: '품격있는 한식 바비큐 전문점'
  },
  {
    id: '5',
    name: '오션 테이블',
    address: '압구정동',
    distance: '2.1km',
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    category: '씨푸드',
    priceRange: '20-30만원',
    reviewCount: 78,
    phone: '02-5678-9012',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    description: '신선한 해산물 요리 전문점'
  },
  {
    id: '6',
    name: '스테이크 하우스',
    address: '한남동',
    distance: '1.8km',
    rating: 4.5,
    thumbnail: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
    category: '양식',
    priceRange: '25-35만원',
    reviewCount: 145,
    phone: '02-6789-0123',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
    description: '프리미엄 스테이크 전문점'
  }
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [nearbyRestaurants, setNearbyRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch nearby restaurants using geolocation
  useEffect(() => {
    const fetchNearbyRestaurants = async () => {
      setLoading(true);
      setError(null);

      // Get current position
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const data = await restaurantApi.getNearby(latitude, longitude);
              setNearbyRestaurants(data);
            } catch (err) {
              console.error('Error fetching restaurants:', err);
              setError('Failed to load nearby restaurants');
              // Use fallback data when API fails
              setNearbyRestaurants(fallbackRestaurants);
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            setError('Location access denied');
            // Use fallback data when location access is denied
            setNearbyRestaurants(fallbackRestaurants);
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported');
        // Use fallback data when geolocation is not supported
        setNearbyRestaurants(fallbackRestaurants);
        setLoading(false);
      }
    };

    fetchNearbyRestaurants();
  }, []);

  const handleAIRecommendClick = () => {
    navigate('/chat');
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-background border-b border-border">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-medium">WellMeet</h1>
        </div>
        <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
            2
          </span>
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="맛집, 지역, 음식 검색..."
              className="pl-10 h-12 bg-input-background border-0 cursor-pointer"
              onClick={handleSearchClick}
              readOnly
            />
          </div>

          {/* AI Recommendation CTA */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-0">
            <div className="text-center space-y-3">
              <h2 className="text-lg font-medium">AI가 맞춤 맛집을 추천해드려요</h2>
              <p className="text-sm text-muted-foreground">
                "내일 여자친구와 기념일 데이트하는데 분위기 좋은 곳 추천해줘"
              </p>
              <Button
                onClick={handleAIRecommendClick}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
              >
                AI에게 맛집 추천 받기
              </Button>
            </div>
          </Card>

          {/* Recent Restaurants */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">최근 본 식당</h3>
              <Button variant="ghost" size="sm" onClick={() => alert('더 많은 최근 본 식당을 보여줍니다')}>더보기</Button>
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {recentRestaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  className="flex-shrink-0 w-72 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleRestaurantClick(restaurant)}
                >
                  <div className="p-3">
                    <div className="flex space-x-3">
                      <ImageWithFallback
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium">{restaurant.name}</h4>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{restaurant.rating}</span>
                          <span className="text-xs text-muted-foreground">({restaurant.reviewCount})</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{restaurant.category} • {restaurant.priceRange}</p>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{restaurant.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Nearby Restaurants */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">📍주변 추천 맛집</h3>
              <Badge variant="secondary">{nearbyRestaurants.length}건</Badge>
            </div>
            {loading && (
              <div className="text-center py-8 text-muted-foreground">
                Loading nearby restaurants...
              </div>
            )}
            {error && (
              <div className="text-center py-8 text-red-500">
                {error}
              </div>
            )}
            {!loading && nearbyRestaurants.length > 0 && (
              <div className="space-y-3">
                {nearbyRestaurants.map((restaurant) => (
                  <Card
                    key={restaurant.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleRestaurantClick(restaurant)}
                  >
                    <div className="p-4">
                      <div className="flex space-x-4">
                        <ImageWithFallback
                          src={restaurant.thumbnail || restaurant.image}
                          alt={restaurant.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium">{restaurant.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {restaurant.category}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{restaurant.rating}</span>
                              <span className="text-sm text-muted-foreground">({restaurant.reviewCount}개)</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{restaurant.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{restaurant.address}</span>
                            </div>
                            <span className="text-sm font-medium text-blue-600">{restaurant.priceRange}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Popular Restaurants */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">인기 식당</h3>
              <Button variant="ghost" size="sm" onClick={() => alert('더 많은 인기 식당을 보여줍니다')}>더보기</Button>
            </div>
            <div className="space-y-3">
              {popularRestaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleRestaurantClick(restaurant)}
                >
                  <div className="p-4">
                    <div className="flex space-x-4">
                      <ImageWithFallback
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium">{restaurant.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {restaurant.category}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{restaurant.rating}</span>
                            <span className="text-sm text-muted-foreground">({restaurant.reviewCount}개)</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{restaurant.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{restaurant.address}</span>
                          </div>
                          <span className="text-sm font-medium text-blue-600">{restaurant.priceRange}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom padding for better scrolling */}
        <div className="h-6" />
      </div>
    </div>
  );
};
