import React, { useState, useRef, useEffect } from 'react';
import { theme } from '../styles/theme';
import { ChatMessage } from '../components/AIChat/ChatMessage';
import { ChatInput } from '../components/AIChat/ChatInput';
import { QuickReply } from '../components/AIChat/QuickReply';
import { RestaurantCard } from '../components/Home/RestaurantCard';
import type { Restaurant } from '../types';

interface ChatMessageType {
  id: string;
  type: 'ai' | 'user';
  message: string;
  timestamp: string;
  quickReplies?: string[];
  restaurants?: Restaurant[];
}

const initialMessage: ChatMessageType = {
  id: '1',
  type: 'ai',
  message: '안녕하세요! 완벽한 맛집을 찾아드리는 AI 웰밋입니다 🤖\n\n어떤 모임을 준비하고 계신가요? 자유롭게 말씀해주세요!',
  timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
  quickReplies: ['비즈니스 미팅', '데이트', '가족 모임', '친구 모임']
};

export const AIRecommendPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      message: text,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // AI 응답 시뮬레이션
    setTimeout(async () => {
      const aiResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: '',
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };

      // 분위기 키워드 확인
      const vibeKeywords = {
        'romantic': ['로맨틱', '데이트', '프로포즈', '기념일'],
        'formal': ['비즈니스', '미팅', '접대', '격식'],
        'comfortable': ['편안', '가족', '친구', '캐주얼']
      };

      let detectedVibe = '';
      for (const [vibe, keywords] of Object.entries(vibeKeywords)) {
        if (keywords.some(keyword => text.includes(keyword))) {
          detectedVibe = vibe;
          break;
        }
      }

      if (detectedVibe) {
        try {
          const res = await fetch(`/api/restaurant/recommend/${detectedVibe}`);
          if (res.ok) {
            const data = await res.json();
            const restaurants = Array.isArray(data) ? data : [data];
            
            aiResponse.message = `${text}에 완벽한 맛집을 찾았어요! 아래 추천 목록을 확인해주세요.`;
            aiResponse.restaurants = restaurants.map((r: any, index: number) => ({
              ...r,
              id: r.id || index.toString(),
              image: r.mainImage || r.image,
              icon: '🍽️',
              category: r.cuisine || '추천',
              distance: `${Math.floor(Math.random() * 20) / 10}km`,
              rating: r.rating || 4.5
            }));
          }
        } catch (error) {
          console.error('추천 실패:', error);
        }
      }

      if (!aiResponse.message) {
        if (text.includes('안녕') || text.includes('하이')) {
          aiResponse.message = '반갑습니다! 어떤 상황에 맞는 맛집을 찾아드릴까요?';
          aiResponse.quickReplies = ['비즈니스 미팅', '데이트', '가족 모임', '친구 모임'];
        } else if (text.includes('장소') || text.includes('지역')) {
          aiResponse.message = '어느 지역에서 찾아드릴까요?';
          aiResponse.quickReplies = ['강남', '성수', '홍대', '이태원'];
        } else if (text.includes('음식') || text.includes('종류')) {
          aiResponse.message = '어떤 종류의 음식을 선호하시나요?';
          aiResponse.quickReplies = ['한식', '일식', '양식', '중식'];
        } else {
          aiResponse.message = '좀 더 구체적으로 말씀해주시면 더 정확한 추천을 도와드릴 수 있어요! 예를 들어:\n- "비즈니스 미팅에 적합한 곳"\n- "데이트하기 좋은 로맨틱한 장소"\n- "가족 모임에 편안한 분위기"';
          aiResponse.quickReplies = ['비즈니스 미팅', '로맨틱한 데이트', '편안한 가족 모임'];
        }
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickReply = (option: string) => {
    handleSendMessage(option);
  };

  const handleRestaurantClick = (restaurantId: string) => {
    // TODO: Navigate to restaurant detail
    console.log('Restaurant clicked:', restaurantId);
  };

  const lastMessage = messages[messages.length - 1];
  const showQuickReplies = lastMessage.type === 'ai' && lastMessage.quickReplies && !isLoading;

  return (
    <div style={styles.container}>
      <div style={styles.messagesContainer}>
        {messages.map((message) => (
          <div key={message.id}>
            <ChatMessage
              type={message.type}
              message={message.message}
              timestamp={message.timestamp}
            />
            {message.restaurants && (
              <div style={styles.restaurantList}>
                {message.restaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    id={restaurant.id.toString()}
                    name={restaurant.name}
                    category={restaurant.category}
                    distance={restaurant.distance}
                    rating={restaurant.rating}
                    icon={restaurant.icon || '🍽️'}
                    onClick={() => handleRestaurantClick(restaurant.id.toString())}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <ChatMessage
            type="ai"
            message="답변을 준비중입니다..."
            timestamp={new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
          />
        )}
        {showQuickReplies && (
          <QuickReply
            options={lastMessage.quickReplies!}
            onSelect={handleQuickReply}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    backgroundColor: theme.colors.background,
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
    padding: theme.spacing.xl,
    height: '100%',
  },
  restaurantList: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
};