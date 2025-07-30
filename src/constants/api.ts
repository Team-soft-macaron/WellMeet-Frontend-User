// Environment-based API configuration
const getApiBaseUrl = () => {
    // In production, use the full AWS ALB URL
    if ((import.meta as any).env.PROD) {
        return 'http://wellmeet-alb-1955693121.ap-northeast-2.elb.amazonaws.com/api';
    }

    // In development, use relative path (will be proxied by Vite)
    return '/api';
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
    // Restaurant endpoints
    RESTAURANTS: {
        NEARBY: `${API_BASE_URL}/restaurant/nearby`,
        SEARCH: `${API_BASE_URL}/restaurants/search`,
        DETAIL: (id: string) => `${API_BASE_URL}/restaurant/${id}`,
    },

    // User endpoints
    USER: {
        PROFILE: `${API_BASE_URL}/user/profile`,
    },

    // Favorite endpoints
    FAVORITE: {
        RESTAURANTS: `${API_BASE_URL}/favorite/restaurants`,
        TOGGLE: (restaurantId: string) => `${API_BASE_URL}/favorite/restaurant/${restaurantId}`,
    },

    // Reservation endpoints
    RESERVATIONS: {
        LIST: `${API_BASE_URL}/reservations`,
        CREATE: `${API_BASE_URL}/reservations`,
        UPDATE: (id: string) => `${API_BASE_URL}/reservations/${id}`,
        DELETE: (id: string) => `${API_BASE_URL}/reservations/${id}`,
    },

    // Booking endpoints
    BOOKINGS: {
        LIST: `${API_BASE_URL}/reservation`,
        DETAIL: (id: string) => `${API_BASE_URL}/reservation/${id}`,
        CREATE: `${API_BASE_URL}/reservation`,
        UPDATE: (id: string) => `${API_BASE_URL}/reservation/${id}`,
        DELETE: (id: string) => `${API_BASE_URL}/reservation/${id}`,
    },

    // Notification endpoints
    NOTIFICATIONS: {
        LIST: `${API_BASE_URL}/notifications`,
        MARK_READ: (id: string) => `${API_BASE_URL}/notifications/${id}/read`,
        MARK_ALL_READ: `${API_BASE_URL}/notifications/read-all`,
    },
} as const;

export const DEFAULT_MEMBER_ID = '1'; // Default member ID for API calls 
