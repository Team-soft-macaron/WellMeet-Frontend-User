import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Home,
  MessageCircle,
  Calendar,
  User,
  Bell
} from 'lucide-react';

interface BottomNavigationProps {
  notificationCount?: number;
}

export function BottomNavigation({ notificationCount = 0 }: BottomNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: 'home',
      label: '홈',
      icon: Home,
      path: '/',
      onClick: () => navigate('/')
    },
    {
      id: 'chat',
      label: 'AI추천',
      icon: MessageCircle,
      path: '/chat',
      onClick: () => navigate('/chat')
    },
    {
      id: 'reservation',
      label: '예약',
      icon: Calendar,
      path: '/reservation',
      onClick: () => navigate('/reservation')
    },
    {
      id: 'notifications',
      label: '알림',
      icon: Bell,
      path: '/notifications',
      onClick: () => navigate('/notifications'),
      badge: notificationCount > 0 ? notificationCount : undefined
    },
    {
      id: 'profile',
      label: '내정보',
      icon: User,
      path: '/profile',
      onClick: () => navigate('/profile')
    }
  ];

  // Only show bottom nav on main pages
  const showOnPages = ['/', '/chat', '/reservation', '/notifications', '/profile'];

  if (!showOnPages.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="border-t border-border bg-background">
      <div className="flex items-center justify-around px-2 py-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 relative ${isActive ? 'text-blue-600' : 'text-muted-foreground'
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
