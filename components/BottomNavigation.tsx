import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home, 
  MessageCircle, 
  Calendar, 
  Heart, 
  User,
  Bell
} from 'lucide-react';

type Page = 'home' | 'chat' | 'restaurant' | 'reservation' | 'bookings' | 'favorites' | 'profile' | 'notifications';

interface BottomNavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  notificationCount?: number;
}

export function BottomNavigation({ currentPage, onPageChange, notificationCount = 0 }: BottomNavigationProps) {
  const navigationItems = [
    {
      id: 'home' as Page,
      label: '홈',
      icon: Home,
      onClick: () => onPageChange('home')
    },
    {
      id: 'chat' as Page,
      label: 'AI추천',
      icon: MessageCircle,
      onClick: () => onPageChange('chat')
    },
    {
      id: 'bookings' as Page,
      label: '예약',
      icon: Calendar,
      onClick: () => onPageChange('bookings')
    },
    {
      id: 'notifications' as Page,
      label: '알림',
      icon: Bell,
      onClick: () => onPageChange('notifications'),
      badge: notificationCount > 0 ? notificationCount : undefined
    },
    {
      id: 'profile' as Page,
      label: '내정보',
      icon: User,
      onClick: () => onPageChange('profile')
    }
  ];

  // Only show bottom nav on main pages
  const showOnPages: Page[] = ['home', 'chat', 'bookings', 'notifications', 'profile'];
  
  if (!showOnPages.includes(currentPage)) {
    return null;
  }

  return (
    <div className="border-t border-border bg-background">
      <div className="flex items-center justify-around px-2 py-1">
        {navigationItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 relative ${
                isActive ? 'text-blue-600' : 'text-muted-foreground'
              }`}
              onClick={item.onClick}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-muted-foreground'}`} />
                {item.badge && (
                  <Badge 
                    className="absolute -top-2 -right-2 min-w-[18px] h-[18px] p-0 flex items-center justify-center bg-red-500 text-white text-xs"
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs ${isActive ? 'text-blue-600' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}