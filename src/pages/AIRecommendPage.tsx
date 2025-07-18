import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import { ChatMessage } from '../components/AIChat/ChatMessage';
import { ChatInput } from '../components/AIChat/ChatInput';
import { QuickReply } from '../components/AIChat/QuickReply';
import { RestaurantCard } from '../components/AIChat/RestaurantCard';

interface ChatMessageType {
  id: string;
  type: 'ai' | 'user';
  message: string;
  timestamp: string;
  quickReplies?: string[];
  restaurants?: RestaurantCardData[];
}

type RestaurantCardData = {
  name: string;
  category: string;
  location: string;
  rating: number;
  vibe?: string;
  icon?: string;
  thumbnail?: string;
  id?: string;
};

const initialMessage: ChatMessageType = {
  id: '1',
  type: 'ai',
  message: '안녕하세요! 완벽한 맛집을 찾아드리는 AI 웰밋입니다 🤖\n\n어떤 모임을 준비하고 계신가요? 자유롭게 말씀해주세요!',
  timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
  quickReplies: ['비즈니스 미팅', '데이트', '가족 모임', '친구 모임']
};

export const AIRecommendPage: React.FC = () => {
  const navigate = useNavigate();
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

    // AI 응답: /api/restaurants/recommend로 POST, body: { query: text }
    try {
      let aiResponse: ChatMessageType;
      const res = await fetch('/recommendation/restaurants/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text })
      });
      if (res.ok) {
        const data = await res.json();
        const restaurants = Array.isArray(data) ? data : [data];
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          message: '추천 식당 목록입니다!',
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        };
        aiResponse.restaurants = restaurants.map((r: any) => ({
          name: r.name,
          category: r.category || '카테고리',
          location: r.address?.split(' ')[1] || '지역',
          rating: r.rating || 4.5,
          vibe: r.vibe || '',
          thumbnail: r.thumbnail || '',
          id: r.id?.toString() || '',
        }));
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          message: '추천 결과를 불러오지 못했습니다.',
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        };
      }
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          message: '추천 중 오류가 발생했습니다.',
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
    setIsLoading(false);
  };

  const handleQuickReply = (option: string) => {
    handleSendMessage(option);
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
              <div>
                {message.restaurants.map((r, idx) => (
                  <RestaurantCard
                    key={idx}
                    name={r.name}
                    category={r.category}
                    location={r.location}
                    rating={r.rating}
                    vibe={r.vibe}
                    thumbnail={r.thumbnail}
                    onClick={() => r.id && navigate(`/restaurant/${r.id}`)}
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
