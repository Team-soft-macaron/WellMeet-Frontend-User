import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ArrowLeft,
  Star,
  ThumbsUp,
  MessageSquare,
  Camera,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  visitDate: string;
  partySize: number;
  content: string;
  images: string[];
  helpful: number;
  isHelpful: boolean;
  reply?: {
    author: string;
    content: string;
    date: string;
  };
}

interface AllReviewsPageProps {
  restaurant: Restaurant;
  onBack: () => void;
}

// Mock 확장된 리뷰 데이터
const allReviews: Review[] = [
  {
    id: "1",
    author: "김○○님",
    rating: 5,
    date: "2024.07.10",
    visitDate: "2024.07.08",
    partySize: 2,
    content:
      "데이트 코스로 정말 최고예요! 분위기도 로맨틱하고 음식도 너무 맛있었어요. 특히 트러플 리조또가 일품이었습니다 ✨",
    images: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1551218372-a8789b81b253?w=300&h=200&fit=crop",
    ],
    helpful: 12,
    isHelpful: false,
    reply: {
      author: "라비올로",
      content:
        "소중한 리뷰 감사합니다! 트러플 리조또를 좋아해 주셔서 기뻐요. 다음에도 더 맛있는 요리로 모시겠습니다 😊",
      date: "2024.07.11 오후 3:20",
    },
  },
  {
    id: "2",
    author: "이○○님",
    rating: 5,
    date: "2024.07.08",
    visitDate: "2024.07.06",
    partySize: 4,
    content:
      "회사 회식으로 갔는데 모든 직원들이 만족했어요. 서비스도 정말 친절하시고 음식 퀄리티도 훌륭했습니다. 재방문 의사 100%!",
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1559329007-40df8b9345d8?w=300&h=200&fit=crop",
    ],
    helpful: 8,
    isHelpful: false,
  },
  {
    id: "3",
    author: "박○○님",
    rating: 3,
    date: "2024.07.05",
    visitDate: "2024.07.03",
    partySize: 2,
    content:
      "음식은 맛있었지만 웨이팅이 너무 길었어요. 예약을 했는데도 20분 정도 기다렸습니다.",
    images: [],
    helpful: 3,
    isHelpful: false,
    reply: {
      author: "라비올로",
      content:
        "불편을 드려 죄송합니다. 주방 운영을 더욱 효율적으로 개선하겠습니다. 다음에는 더 나은 서비스로 모시겠습니다.",
      date: "2024.07.06 오전 10:15",
    },
  },
  {
    id: "4",
    author: "정○○님",
    rating: 5,
    date: "2024.07.01",
    visitDate: "2024.06.29",
    partySize: 3,
    content:
      "친구들과 생일 파티로 갔는데 정말 만족했어요. 미트볼 파스타와 스테이크 모두 완벽했습니다. 사장님께서 깜짝 케이크도 준비해 주셔서 감동이었어요!",
    images: [
      "https://images.unsplash.com/photo-1559329007-40df8b9345d8?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop",
    ],
    helpful: 20,
    isHelpful: true,
  },
  {
    id: "5",
    author: "최○○님",
    rating: 4,
    date: "2024.06.25",
    visitDate: "2024.06.23",
    partySize: 2,
    content:
      "음식은 맛있었는데 가격이 조금 비싸네요. 그래도 특별한 날에는 추천합니다.",
    images: [],
    helpful: 6,
    isHelpful: false,
  },
  {
    id: "6",
    author: "윤○○님",
    rating: 3,
    date: "2024.06.20",
    visitDate: "2024.06.18",
    partySize: 2,
    content:
      "분위기는 좋지만 음식이 조금 짰어요. 서비스는 만족스러웠습니다.",
    images: [],
    helpful: 3,
    isHelpful: false,
  },
  {
    id: "7",
    author: "장○○님",
    rating: 5,
    date: "2024.06.15",
    visitDate: "2024.06.13",
    partySize: 2,
    content:
      "첫 데이트 장소로 완벽했어요! 분위기도 로맨틱하고 음식도 맛있어서 좋은 추억을 만들 수 있었습니다.",
    images: [
      "https://images.unsplash.com/photo-1551218372-a8789b81b253?w=300&h=200&fit=crop",
    ],
    helpful: 11,
    isHelpful: false,
  },
  {
    id: "8",
    author: "송○○님",
    rating: 4,
    date: "2024.06.10",
    visitDate: "2024.06.08",
    partySize: 5,
    content:
      "가족 모임으로 갔는데 모든 연령대가 만족할 만한 메뉴와 분위기였어요. 주차도 편리했습니다.",
    images: [],
    helpful: 9,
    isHelpful: false,
  },
];

// 평점 분포 계산
const getRatingDistribution = (reviews: Review[]) => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((review) => {
    distribution[review.rating as keyof typeof distribution]++;
  });
  return distribution;
};

export function AllReviewsPage({
  restaurant,
  onBack,
}: AllReviewsPageProps) {
  const [displayedReviews, setDisplayedReviews] = useState<
    Review[]
  >(allReviews.slice(0, 5));
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [sortOrder, setSortOrder] = useState("최신순");
  const [showPhotoOnly, setShowPhotoOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<
    string[]
  >([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  const ratingDistribution = getRatingDistribution(allReviews);
  const totalReviews = allReviews.length;

  // 필터링된 리뷰 가져오기
  const getFilteredReviews = () => {
    let filtered = allReviews;

    // 카테고리 필터
    if (selectedFilter !== "전체") {
      // 간단한 필터링 로직 (실제로는 더 복잡할 수 있음)
      if (selectedFilter === "맛") {
        filtered = filtered.filter(
          (review) =>
            review.content.includes("맛") ||
            review.content.includes("음식") ||
            review.rating >= 4,
        );
      } else if (selectedFilter === "서비스") {
        filtered = filtered.filter(
          (review) =>
            review.content.includes("서비스") ||
            review.content.includes("친절") ||
            review.content.includes("직원"),
        );
      } else if (selectedFilter === "분위기") {
        filtered = filtered.filter(
          (review) =>
            review.content.includes("분위기") ||
            review.content.includes("로맨틱") ||
            review.content.includes("데이트"),
        );
      }
    }

    // 사진 리뷰만 필터
    if (showPhotoOnly) {
      filtered = filtered.filter(
        (review) => review.images.length > 0,
      );
    }

    // 정렬
    if (sortOrder === "최신순") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime(),
      );
    } else if (sortOrder === "평점순") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOrder === "도움순") {
      filtered = filtered.sort((a, b) => b.helpful - a.helpful);
    }

    return filtered;
  };

  const filteredReviews = getFilteredReviews();
  const hasMoreReviews =
    displayedReviews.length < filteredReviews.length;

  // 더 많은 리뷰 로드
  const loadMoreReviews = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const currentCount = displayedReviews.length;
    const newReviews = filteredReviews.slice(
      currentCount,
      currentCount + 5,
    );
    setDisplayedReviews((prev) => [...prev, ...newReviews]);
    setIsLoading(false);
  };

  // 필터 변경 시 리뷰 재설정
  useEffect(() => {
    setDisplayedReviews(filteredReviews.slice(0, 5));
  }, [selectedFilter, sortOrder, showPhotoOnly]);

  // 도움됨 버튼 클릭
  const handleHelpfulClick = (reviewId: string) => {
    setDisplayedReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              helpful: review.isHelpful
                ? review.helpful - 1
                : review.helpful + 1,
              isHelpful: !review.isHelpful,
            }
          : review,
      ),
    );
  };

  // 이미지 모달 열기
  const openImageModal = (images: string[], index: number) => {
    setSelectedImages(images);
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

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
        <div>
          <h1 className="text-lg font-medium">
            {restaurant.name} 리뷰
          </h1>
          <p className="text-sm text-muted-foreground">
            ({totalReviews}개)
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* 평점 요약 */}
          <Card className="p-4 bg-muted/30">
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-medium">
                    {restaurant.rating}
                  </span>
                  <span className="text-muted-foreground">
                    ({totalReviews}개 리뷰)
                  </span>
                </div>
              </div>

              {/* 평점 분포 */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count =
                    ratingDistribution[
                      rating as keyof typeof ratingDistribution
                    ];
                  const percentage =
                    totalReviews > 0
                      ? (count / totalReviews) * 100
                      : 0;

                  return (
                    <div
                      key={rating}
                      className="flex items-center space-x-3 text-sm"
                    >
                      <div className="flex items-center space-x-1 w-12">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{rating}</span>
                      </div>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">
                        {count}개
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* 필터 및 정렬 */}
          <div className="space-y-4">
            {/* 카테고리 필터 */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {["전체", "맛", "서비스", "분위기"].map(
                (filter) => (
                  <Badge
                    key={filter}
                    variant={
                      selectedFilter === filter
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer whitespace-nowrap"
                    onClick={() => setSelectedFilter(filter)}
                  >
                    {filter}
                  </Badge>
                ),
              )}
            </div>

            {/* 정렬 및 옵션 */}
            <div className="flex items-center justify-between">
              <Select
                value={sortOrder}
                onValueChange={setSortOrder}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                  <ChevronDown className="h-4 w-4 ml-1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="최신순">최신순</SelectItem>
                  <SelectItem value="평점순">평점순</SelectItem>
                  <SelectItem value="도움순">도움순</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Button
                  variant={
                    showPhotoOnly ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setShowPhotoOnly(!showPhotoOnly)
                  }
                  className="text-xs"
                >
                  <Camera className="h-3 w-3 mr-1" />
                  사진 리뷰만
                </Button>
              </div>
            </div>
          </div>

          {/* 리뷰 목록 */}
          <div className="space-y-4">
            {displayedReviews.map((review) => (
              <Card
                key={review.id}
                className="p-4 space-y-4 shadow-sm"
              >
                {/* 리뷰 헤더 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {review.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">
                          {review.author}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {review.date} • {review.partySize}명
                        방문
                      </p>
                    </div>
                  </div>
                </div>

                {/* 구분선 */}
                <hr className="border-border" />

                {/* 리뷰 내용 */}
                <p className="text-sm leading-relaxed">
                  {review.content}
                </p>

                {/* 리뷰 이미지 */}
                {review.images.length > 0 && (
                  <>
                    <hr className="border-border" />
                    <div className="grid grid-cols-3 gap-2">
                      {review.images.map((image, index) => (
                        <ImageWithFallback
                          key={index}
                          src={image}
                          alt="리뷰 이미지"
                          className="w-full h-20 rounded object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() =>
                            openImageModal(review.images, index)
                          }
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* 도움됨 버튼 */}
                <hr className="border-border" />
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-xs ${review.isHelpful ? "text-blue-600" : "text-muted-foreground"}`}
                    onClick={() =>
                      handleHelpfulClick(review.id)
                    }
                  >
                    <ThumbsUp
                      className={`h-3 w-3 mr-1 ${review.isHelpful ? "fill-blue-600" : ""}`}
                    />
                    도움됨 {review.helpful}
                  </Button>
                  {review.reply && (
                    <span className="text-xs text-muted-foreground flex items-center">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      답글 1개
                    </span>
                  )}
                </div>

                {/* 사장님 답글 */}
                {review.reply && (
                  <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        사장님 답글
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-primary-foreground font-medium">
                          {review.reply.author.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium">
                            {review.reply.author}
                          </span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                          {review.reply.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {review.reply.date}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}

            {/* 더 많은 리뷰 로드 버튼 */}
            {hasMoreReviews && (
              <Button
                variant="outline"
                className="w-full"
                onClick={loadMoreReviews}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    더 많은 리뷰 불러오는 중...
                  </>
                ) : (
                  `더 많은 리뷰 불러오기 (${filteredReviews.length - displayedReviews.length}개 더)`
                )}
              </Button>
            )}

            {/* 모든 리뷰 로드 완료 */}
            {!hasMoreReviews && displayedReviews.length > 5 && (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  모든 리뷰를 확인했습니다! 🎉
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom padding */}
        <div className="h-6" />
      </div>

      {/* 이미지 풀스크린 모달 */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white z-10"
              onClick={() => setShowImageModal(false)}
            >
              ✕
            </Button>

            <ImageWithFallback
              src={selectedImages[currentImageIndex]}
              alt="리뷰 이미지"
              className="max-w-full max-h-full object-contain"
            />

            {selectedImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 text-white"
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev > 0
                        ? prev - 1
                        : selectedImages.length - 1,
                    )
                  }
                >
                  ❮
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 text-white"
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev < selectedImages.length - 1
                        ? prev + 1
                        : 0,
                    )
                  }
                >
                  ❯
                </Button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                  {currentImageIndex + 1} /{" "}
                  {selectedImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}