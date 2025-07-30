import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Settings, Bell, Calendar, MessageSquare } from 'lucide-react';

interface Notification {
  id: string;
  type: 'booking_confirmed' | 'reminder' | 'review_reply' | 'concierge_message';
  title: string;
  message: string;
  detail: string;
  time: string;
  isRead: boolean;
  bookingId?: string; // 예약 관련 알림의 경우
  restaurantId?: string; // 식당 관련 알림의 경우
}

interface NotificationPageProps {
  notifications: Notification[];
  onNotificationAction: (notification: Notification, action: string) => void;
  onMarkAllAsRead: () => void;
  onNotificationSettings: () => void;
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'booking_confirmed':
      return <Bell className="h-5 w-5 text-green-600" />;
    case 'reminder':
      return <Calendar className="h-5 w-5 text-blue-600" />;
    case 'review_reply':
      return <MessageSquare className="h-5 w-5 text-purple-600" />;
    case 'concierge_message':
      return <MessageSquare className="h-5 w-5 text-orange-600" />;
    default:
      return <Bell className="h-5 w-5 text-gray-600" />;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'booking_confirmed':
      return 'bg-green-50 border-green-200';
    case 'reminder':
      return 'bg-blue-50 border-blue-200';
    case 'review_reply':
      return 'bg-purple-50 border-purple-200';
    case 'concierge_message':
      return 'bg-orange-50 border-orange-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

export function NotificationPage({
  notifications,
  onNotificationAction,
  onMarkAllAsRead,
  onNotificationSettings
}: NotificationPageProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const groupedNotifications = notifications.reduce((groups, notification) => {
    const timeGroup = notification.time;
    if (!groups[timeGroup]) {
      groups[timeGroup] = [];
    }
    groups[timeGroup].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  const timeGroups = ['2시간 전', '어제', '이번 주', '지난 주', '한 달 전'];

  const handleNotificationClick = (notification: Notification) => {
    // 알림 클릭 시 읽음 처리 및 해당 페이지로 이동
    onNotificationAction(notification, 'view');
  };

  const handleActionClick = (notification: Notification, action: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    onNotificationAction(notification, action);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-3" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-medium">알림 내역</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">
                읽지 않은 알림 {unreadCount}개
              </p>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onNotificationSettings}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="p-4 space-y-6">
            {timeGroups.map((timeGroup) => {
              const groupNotifications = groupedNotifications[timeGroup];
              if (!groupNotifications || groupNotifications.length === 0) {
                return null;
              }

              return (
                <div key={timeGroup} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="font-medium text-muted-foreground">{timeGroup}</h2>
                    <Badge variant="outline" className="text-xs">
                      {groupNotifications.length}개
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {groupNotifications.map((notification) => (
                      <Card
                        key={notification.id}
                        className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${!notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                          } ${getNotificationColor(notification.type)}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>

                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between">
                              <h3 className="font-medium text-sm">{notification.title}</h3>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2"></div>
                              )}
                            </div>

                            <p className="text-sm text-foreground">
                              {notification.message}
                            </p>

                            <p className="text-sm text-muted-foreground">
                              {notification.detail}
                            </p>

                            <div className="flex items-center justify-between pt-2">
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>

                              {notification.type === 'booking_confirmed' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-green-700 hover:text-green-800"
                                  onClick={(e) => handleActionClick(notification, 'booking_detail', e)}
                                >
                                  예약 상세보기
                                </Button>
                              )}

                              {notification.type === 'review_reply' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-purple-700 hover:text-purple-800"
                                  onClick={(e) => handleActionClick(notification, 'review_reply', e)}
                                >
                                  답글 확인하기
                                </Button>
                              )}

                              {notification.type === 'reminder' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-blue-700 hover:text-blue-800"
                                  onClick={(e) => handleActionClick(notification, 'booking_list', e)}
                                >
                                  예약 확인하기
                                </Button>
                              )}

                              {notification.type === 'concierge_message' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-orange-700 hover:text-orange-800"
                                  onClick={(e) => handleActionClick(notification, 'concierge', e)}
                                >
                                  상담 내역 보기
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Bell className="h-16 w-16 mx-auto text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="font-medium">알림이 없습니다</h3>
                <p className="text-sm text-muted-foreground">
                  새로운 알림이 있으면 여기에 표시됩니다
                </p>
              </div>
              <Button variant="outline" onClick={handleBack}>
                홈으로 돌아가기
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {notifications.length > 0 && (
        <div className="border-t border-border p-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              {unreadCount > 0 ? `모두 읽음 표시 (${unreadCount})` : '모두 읽음'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onNotificationSettings}
            >
              알림 설정
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
