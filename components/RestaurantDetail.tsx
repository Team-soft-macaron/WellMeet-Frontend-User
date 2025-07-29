import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Share, Heart, Star, MapPin, Phone, Clock, Calendar, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Restaurant {
  id: string;
  name: string;
  category: string;
  priceRange: string;
  rating: number;
  reviewCount: number;
  location: string;
  phone: string;
  image: string;
  description: string;
}

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onBack: () => void;
  onReservationRequest: () => void;
  onViewAllReviews: () => void;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

const mockMenuItems = [
  { name: '트러플 리조또', price: '85,000원', description: '이탈리아산 트러플과 파르미지아노 치즈' },
  { name: '랍스터 파스타', price: '120,000원', description: '신선한 랍스터와 토마토 소스' },
  { name: '미트볼 파스타', price: '68,000원', description: '수제 미트볼과 바질 페스토' },
  { name: '오사카 스테이크', price: '150,000원', description: '와규 등심 스테이크' }
];

// 모든 리뷰 데이터 (실제로는 서버에서 가져옴)
const allMockReviews = [
  {
    id: '1',
    author: '김○○님',
    rating: 5,
    date: '2일 전',
    content: '데이트 코스로 최고예요! 분위기도 좋고 음식도 정말 맛있었어요. 특히 트러플 리조또가 인상깊었습니다.',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop'
    ],
    helpful: 12
  },
  {
    id: '2',
    author: '박○○님',
    rating: 4,
    date: '1주 전',
    content: '음식 맛은 좋았지만 조금 시끄러워서 조용한 대화를 원한다면 추천하지 않아요.',
    images: [],
    helpful: 8
  },
  {
    id: '3',
    author: '이○○님',
    rating: 5,
    date: '2주 전',
    content: '회사 회식으로 갔는데 정말 좋았어요. 랍스터 파스타가 일품이었고, 직원분들도 매우 친절하셨습니다. 다음에 또 올 예정입니다!',
    images: [
      'https://images.unsplash.com/photo-1551218372-a8789b81b253?w=300&h=200&fit=crop'
    ],
    helpful: 15
  }
];

export function RestaurantDetail({ restaurant, onBack, onReservationRequest, onViewAllReviews, isFavorited, onToggleFavorite }: RestaurantDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedReviewFilter, setSelectedReviewFilter] = useState('전체');

  const restaurantImages = [
    restaurant.image,
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1551218372-a8789b81b253?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1559329007-40df8b9345d8?w=400&h=300&fit=crop'
  ];

  const displayedReviews = allMockReviews.slice(0, 2); // 처음에는 2개만 표시

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header with image - 높이 44px + 240px */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 h-11">
          <Button 
            variant="secondary" 
            size="icon" 
            className="bg-black/20 backdrop-blur-sm border-0"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="bg-black/20 backdrop-blur-sm border-0"
            >
              <Share className="h-4 w-4 text-white" />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="bg-black/20 backdrop-blur-sm border-0"
              onClick={onToggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </Button>
          </div>
        </div>

        {/* Image slider - 높이 240px */}
        <div className="relative h-60 bg-muted">
          <ImageWithFallback 
            src={restaurantImages[currentImageIndex]}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {restaurantImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {currentImageIndex + 1}/{restaurantImages.length}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Basic Info - padding 20px */}
        <div className="p-5 space-y-4">
          <div>
            <h1 className="text-2xl font-medium">{restaurant.name}</h1>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-medium">{restaurant.rating}</span>
                <span className="text-muted-foreground">(리뷰 {restaurant.reviewCount}개)</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-muted-foreground">
              <span>{restaurant.category}</span>
              <span>•</span>
              <span>{restaurant.priceRange}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{restaurant.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{restaurant.phone}</span>
              {/* 전화 버튼 - 터치 영역 44px */}
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-auto h-11 px-4"
                onClick={() => window.open(`tel:${restaurant.phone}`)}
              >
                <Phone className="h-3 w-3 mr-1" />
                전화
              </Button>
            </div>
          </div>
        </div>

        {/* 예약하기 CTA - 높이 56px, margin 16px, border-radius 12px, 배경 #2196F3 */}
        <div className="px-4 mb-4">
          <Button 
            className="w-full h-14 bg-[#2196F3] hover:bg-[#1976D2] text-white rounded-xl text-base font-medium"
            onClick={onReservationRequest}
          >
            예약하기
          </Button>
        </div>

        {/* Tabs - 탭 높이 48px */}
        <div className="px-4">
          <Tabs defaultValue="hours">
            <TabsList className="grid w-full grid-cols-4 h-12">
              <TabsTrigger value="hours" className="h-full">영업시간</TabsTrigger>
              <TabsTrigger value="menu" className="h-full">메뉴</TabsTrigger>
              <TabsTrigger value="location" className="h-full">위치</TabsTrigger>
              <TabsTrigger value="reviews" className="h-full">리뷰</TabsTrigger>
            </TabsList>

            {/* 내용 영역 - padding 16px */}
            <TabsContent value="hours" className="space-y-4 mt-4 p-4">
              <Card className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>평일</span>
                    <span>11:30 - 22:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>주말</span>
                    <span>11:30 - 22:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>브레이크타임</span>
                    <span>15:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>휴무</span>
                    <span className="text-red-600">매주 월요일</span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="menu" className="space-y-4 mt-4 p-4">
              {/* 카테고리 탭 - 높이 36px */}
              <div className="flex space-x-2 mb-4">
                {['대표메뉴', '파스타', '리조또'].map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="cursor-pointer h-9 px-3"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              
              <div className="space-y-3">
                {mockMenuItems.map((item, index) => (
                  <Card key={index} className="p-4">
                    {/* 메뉴 아이템 - 높이 64px */}
                    <div className="flex justify-between items-center min-h-16">
                      <div className="space-y-1 flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-medium">{item.price}</p>
                        {/* + 버튼 - 장바구니 추가 */}
                        <Button variant="outline" size="sm" className="mt-1 w-8 h-8">
                          +
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4 mt-4 p-4">
              <Card className="p-4">
                <div className="space-y-4">
                  {/* 지도 영역 - 높이 200px */}
                  <div className="h-50 bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                    <div className="text-center space-y-2">
                      <MapPin className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">📍 지도 보기</p>
                    </div>
                  </div>
                  
                  {/* 하단 정보 영역 */}
                  <div className="space-y-2">
                    <p><strong>주소:</strong> {restaurant.location}</p>
                    <p><strong>지하철:</strong> 신논현역 3번출구 도보 5분</p>
                    <p><strong>주차:</strong> 🚗 발렛파킹 2시간 무료</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      길찾기
                    </Button>
                    <Button variant="outline" className="flex-1">
                      공유하기
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4 mt-4 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">리뷰 ({restaurant.reviewCount}개)</h3>
                  {/* 필터 탭 */}
                  <div className="flex space-x-2">
                    {['전체', '맛', '서비스', '분위기'].map((filter) => (
                      <Badge 
                        key={filter}
                        variant={selectedReviewFilter === filter ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedReviewFilter(filter)}
                      >
                        {filter}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {displayedReviews.map((review) => (
                  <Card key={review.id} className="p-4 animate-in fade-in duration-300">
                    {/* 리뷰 아이템 - 최소 높이 80px */}
                    <div className="space-y-3 min-h-20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {/* 프로필 - 32px 원형 */}
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {review.author.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium">{review.author}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      
                      {/* 텍스트 - 최대 3줄 표시 */}
                      <p className="text-sm leading-relaxed line-clamp-3">{review.content}</p>
                      
                      {/* 이미지 - 64px × 64px 썸네일 */}
                      {review.images.length > 0 && (
                        <div className="flex space-x-2 overflow-x-auto">
                          {review.images.map((image, index) => (
                            <ImageWithFallback
                              key={index}
                              src={image}
                              alt="리뷰 이미지"
                              className="w-16 h-16 rounded object-cover flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                            />
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          👍 도움됨 {review.helpful}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {/* 더 많은 리뷰 보기 - 높이 44px */}
                <Button 
                  variant="outline" 
                  className="w-full h-11" 
                  onClick={onViewAllReviews}
                >
                  더 많은 리뷰 보기
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom padding for better scrolling */}
        <div className="h-6" />
      </div>
    </div>
  );
}