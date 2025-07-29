import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Send, Star, MapPin, Heart, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  type: 'text' | 'options' | 'recommendations';
  options?: string[];
  recommendations?: Restaurant[];
  timestamp: Date;
}

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
  reason: string;
}

interface ChatPageProps {
  onRestaurantSelect: (restaurant: Restaurant) => void;
  onReservationRequest: (restaurant: Restaurant) => void;
}

const mockRecommendations: Restaurant[] = [
  {
    id: '1',
    name: '라비올로',
    category: '이탈리안',
    priceRange: '15-20만원',
    rating: 4.5,
    reviewCount: 124,
    location: '강남구 논현동',
    phone: '02-1234-5678',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
    description: '로맨틱한 분위기의 이탈리안 레스토랑',
    reason: '데이트에 완벽한 로맨틱한 분위기로 유명해요'
  },
  {
    id: '2',
    name: '스시 오마카세',
    category: '일식',
    priceRange: '18-25만원',
    rating: 4.7,
    reviewCount: 89,
    location: '청담동',
    phone: '02-2345-6789',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    description: '프라이빗한 공간에서 즐기는 오마카세',
    reason: '프라이빗한 공간에서 특별한 경험을 할 수 있어요'
  },
  {
    id: '3',
    name: '더 키친',
    category: '프렌치',
    priceRange: '16-22만원',
    rating: 4.6,
    reviewCount: 156,
    location: '청담동',
    phone: '02-3456-7890',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
    description: '특별한 날을 위한 프렌치 레스토랑',
    reason: '특별한 날에 어울리는 고급스러운 분위기예요'
  }
];

export function ChatPage({ onRestaurantSelect, onReservationRequest }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: '안녕하세요! 어떤 상황에서 드실 건가요? 자세히 설명해주시면 완벽한 맛집을 추천해드릴게요 😊',
      type: 'text',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationState, setConversationState] = useState<'initial' | 'asking_people' | 'asking_budget' | 'complete'>('initial');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: content.trim(),
      type: 'text',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let aiResponse: Message;

      if (conversationState === 'initial') {
        // First response - ask for details
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: '몇 명이서 가시나요?',
          type: 'options',
          options: ['2명', '3명', '4명', '5명 이상'],
          timestamp: new Date()
        };
        setConversationState('asking_people');
      } else if (conversationState === 'asking_people') {
        // Second response - ask for budget
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: '예산은 어느 정도 생각하고 계세요?',
          type: 'options',
          options: ['8-12만원', '12-20만원', '20-30만원', '30만원 이상'],
          timestamp: new Date()
        };
        setConversationState('asking_budget');
      } else if (conversationState === 'asking_budget') {
        // Final response - provide recommendations
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: '데이트에 완벽한 3곳을 추천드려요! 🎉',
          type: 'recommendations',
          recommendations: mockRecommendations,
          timestamp: new Date()
        };
        setConversationState('complete');
      } else {
        // Already complete - provide additional help
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: '다른 상황이나 조건으로 추천받고 싶으시면 말씀해주세요! 😊',
          type: 'text',
          timestamp: new Date()
        };
      }

      setIsTyping(false);
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleOptionSelect = (option: string) => {
    handleSendMessage(option);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border bg-background">
        <Button variant="ghost" size="icon" className="mr-3" onClick={() => window.history.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">AI 추천</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-1' : 'order-0'}`}>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-md'
                    : 'bg-muted rounded-tl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                
                {/* Options */}
                {message.type === 'options' && message.options && (
                  <div className="mt-3 space-y-2">
                    {message.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="mr-2 mb-2 h-9 bg-background"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Recommendations */}
                {message.type === 'recommendations' && message.recommendations && (
                  <div className="mt-4 space-y-3">
                    {message.recommendations.map((restaurant, index) => (
                      <Card 
                        key={restaurant.id} 
                        className="p-4 bg-background border cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => onRestaurantSelect(restaurant)}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-medium">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{restaurant.name}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {restaurant.category}
                                </Badge>
                                <span className="text-sm text-blue-600 font-medium">
                                  {restaurant.priceRange}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <ImageWithFallback
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-full h-32 rounded-lg object-cover"
                          />
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{restaurant.rating}</span>
                                <span className="text-xs text-muted-foreground">({restaurant.reviewCount}개)</span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{restaurant.location}</span>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{restaurant.reason}</p>
                            
                            <div className="flex space-x-2 pt-2">
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => onReservationRequest(restaurant)}
                              >
                                <Calendar className="h-4 w-4 mr-1" />
                                예약하기
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => onRestaurantSelect(restaurant)}
                              >
                                상세보기
                              </Button>
                              <Button variant="outline" size="icon">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-1 px-1">
                {message.timestamp.toLocaleTimeString('ko-KR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지 입력..."
            className="flex-1 h-12"
            disabled={isTyping}
          />
          <Button 
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="h-12 w-12"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}