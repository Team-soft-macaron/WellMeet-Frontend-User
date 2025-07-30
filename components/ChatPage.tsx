import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  type: 'text' | 'recommendations';
  recommendations?: Restaurant[];
  timestamp: Date;
}

interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  thumbnail: string;
}

export function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: '안녕하세요! 어떤 맛집을 찾고 계신가요? 자유롭게 말씀해주세요 😊',
      type: 'text',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  const handleReservationRequest = (restaurant: Restaurant) => {
    navigate(`/reservation/${restaurant.id}`);
  };

  const handleBack = () => {
    navigate('/');
  };

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

    try {
      // Call API
      const response = await fetch('/api/restaurants/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: content.trim()
        })
      });

      if (response.ok) {
        const data = await response.json();

        let aiResponse: Message;

        if (data && data.length > 0) {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            content: `"${content.trim()}"에 대한 추천 식당 ${data.length}곳을 찾았어요! 🎉`,
            type: 'recommendations',
            recommendations: data,
            timestamp: new Date()
          };
        } else {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            content: '죄송해요. 해당 조건에 맞는 식당을 찾지 못했어요. 다른 키워드로 다시 검색해보세요! 😅',
            type: 'text',
            timestamp: new Date()
          };
        }

        setMessages(prev => [...prev, aiResponse]);
      } else {
        // API error
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: '죄송해요. 추천 서비스에 일시적인 문제가 있어요. 잠시 후 다시 시도해주세요! 😅',
          type: 'text',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }
    } catch (error) {
      // Network error
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: '네트워크 연결에 문제가 있어요. 인터넷 연결을 확인하고 다시 시도해주세요! 😅',
        type: 'text',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }

    setIsTyping(false);
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
        <Button variant="ghost" size="icon" className="mr-3" onClick={handleBack}>
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
                className={`rounded-2xl px-4 py-3 ${message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-md'
                  : 'bg-muted rounded-tl-md'
                  }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>

                {/* Recommendations */}
                {message.type === 'recommendations' && message.recommendations && (
                  <div className="mt-4 space-y-3">
                    {message.recommendations.map((restaurant, index) => (
                      <Card
                        key={restaurant.id}
                        className="p-4 bg-background border cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleRestaurantSelect(restaurant)}
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
                                  일식
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {restaurant.thumbnail && (
                            <ImageWithFallback
                              src={restaurant.thumbnail}
                              alt={restaurant.name}
                              className="w-full h-32 rounded-lg object-cover"
                            />
                          )}

                          <div className="space-y-2">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{restaurant.rating || '평점 없음'}</span>
                                {restaurant.reviewCount > 0 && (
                                  <span className="text-xs text-muted-foreground">({restaurant.reviewCount}개)</span>
                                )}
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{restaurant.address}</span>
                              </div>
                            </div>

                            <div className="flex space-x-2 pt-2">
                              <Button
                                size="sm"
                                className="flex-1"
                                onClick={() => handleReservationRequest(restaurant)}
                              >
                                <Calendar className="h-4 w-4 mr-1" />
                                예약하기
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRestaurantSelect(restaurant)}
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
