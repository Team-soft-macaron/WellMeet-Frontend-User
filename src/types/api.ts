// Restaurant types
export interface Restaurant {
    id: string;
    name: string;
    address: string;
    distance: string;
    rating: number;
    thumbnail: string;
    category?: string;
    priceRange?: string;
    reviewCount?: number;
    phone?: string;
    image?: string;
    description?: string;
    operatingHours?: {
        weekday: string;
        weekend: string;
        breakTime?: string;
        closedDay: string;
    };
    features?: string[];
    latitude?: number;
    longitude?: number;
    favorite?: boolean;
}

export interface RestaurantDetail extends Restaurant {
    menus: Menu[];
    reviews: Review[];
    latitude: number;
    longitude: number;
    favorite: boolean;
}

export interface Menu {
    name: string;
    price: number;
}

export interface Review {
    situation: string;
    logo: string;
    content: string;
}

// User types
export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    tier: 'standard' | 'premium' | 'vip';
}

// Booking types
export interface Booking {
    id: string;
    restaurantName: string;
    restaurantImage: string;
    date: string;
    time: string;
    partySize: number;
    estimatedCost: string;
    status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
    specialRequests?: string;
    location: string;
    phone?: string;
    confirmationNumber?: string;
    bookedAt?: string;
}

// Notification types
export interface Notification {
    id: string;
    type: 'booking_confirmed' | 'reminder' | 'review_reply' | 'concierge_message';
    title: string;
    message: string;
    detail: string;
    time: string;
    isRead: boolean;
    bookingId?: string;
    restaurantId?: string;
}

// API Response types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    size: number;
}

// Search types
export interface SearchParams {
    query: string;
    latitude?: number;
    longitude?: number;
    category?: string;
    priceRange?: string;
}

// Reservation types
export interface Reservation {
    id: string;
    restaurantId: string;
    restaurantName: string;
    date: string;
    time: string;
    partySize: number;
    status: 'confirmed' | 'pending' | 'cancelled';
    specialRequests?: string;
    createdAt: string;
} 
