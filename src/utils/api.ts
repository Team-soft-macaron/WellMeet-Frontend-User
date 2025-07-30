import { API_ENDPOINTS, DEFAULT_MEMBER_ID } from '../constants/api';
import {
    Restaurant,
    Booking,
    Notification,
    User,
    RestaurantDetail
} from '../types/api';

// Helper function to format distance
const formatDistance = (meters: number): string => {
    if (meters < 1000) {
        return `${Math.round(meters)}m`;
    } else {
        return `${(meters / 1000).toFixed(1)}km`;
    }
};

// Generic API request function
async function apiRequest<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// Restaurant API functions
export const restaurantApi = {
    // Get nearby restaurants
    async getNearby(latitude: number, longitude: number): Promise<Restaurant[]> {
        const url = `${API_ENDPOINTS.RESTAURANTS.NEARBY}?latitude=${latitude}&longitude=${longitude}`;
        const data = await apiRequest<Restaurant[]>(url);

        // Format distance for each restaurant
        return data.map((restaurant: Restaurant) => ({
            ...restaurant,
            distance: restaurant.distance ? formatDistance(parseFloat(restaurant.distance)) : '거리 정보 없음'
        }));
    },

    // Search restaurants
    async search(params: { query: string; latitude?: number; longitude?: number; category?: string; priceRange?: string }): Promise<Restaurant[]> {
        const queryParams = new URLSearchParams({
            query: params.query,
            ...(params.latitude && { latitude: params.latitude.toString() }),
            ...(params.longitude && { longitude: params.longitude.toString() }),
            ...(params.category && { category: params.category }),
            ...(params.priceRange && { priceRange: params.priceRange }),
        });

        const url = `${API_ENDPOINTS.RESTAURANTS.SEARCH}?${queryParams}`;
        return apiRequest<Restaurant[]>(url);
    },

    // Get restaurant detail
    async getDetail(id: string): Promise<RestaurantDetail> {
        const url = `${API_ENDPOINTS.RESTAURANTS.DETAIL(id)}?memberId=${DEFAULT_MEMBER_ID}`;
        return apiRequest<RestaurantDetail>(url);
    },
};

// User API functions
export const userApi = {
    // Get user profile
    async getProfile(): Promise<User> {
        const url = `${API_ENDPOINTS.USER.PROFILE}?memberId=${DEFAULT_MEMBER_ID}`;
        return apiRequest<User>(url);
    },

    // Update user profile
    async updateProfile(userData: Partial<User>): Promise<User> {
        const url = `${API_ENDPOINTS.USER.PROFILE}?memberId=${DEFAULT_MEMBER_ID}`;
        return apiRequest<User>(url, {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    },
};

// Favorite API functions
export const favoriteApi = {
    // Get favorite restaurants
    async getFavorites(): Promise<Restaurant[]> {
        const url = `${API_ENDPOINTS.FAVORITE.RESTAURANTS}?memberId=${DEFAULT_MEMBER_ID}`;
        return apiRequest<Restaurant[]>(url);
    },

    // Toggle favorite status
    async toggleFavorite(restaurantId: string, isFavorite: boolean): Promise<void> {
        const url = `${API_ENDPOINTS.FAVORITE.TOGGLE(restaurantId)}?memberId=${DEFAULT_MEMBER_ID}`;
        await apiRequest(url, {
            method: isFavorite ? 'DELETE' : 'POST',
        });
    },
};

// Booking API functions
export const bookingApi = {
    // Get bookings list
    async getBookings(): Promise<Booking[]> {
        const url = `${API_ENDPOINTS.BOOKINGS.LIST}?memberId=${DEFAULT_MEMBER_ID}`;
        return apiRequest<Booking[]>(url);
    },

    // Get booking detail
    async getBookingDetail(id: string): Promise<Booking> {
        const url = `${API_ENDPOINTS.BOOKINGS.DETAIL(id)}?memberId=${DEFAULT_MEMBER_ID}`;
        return apiRequest<Booking>(url);
    },

    // Create booking
    async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
        const url = `${API_ENDPOINTS.BOOKINGS.CREATE}?memberId=${DEFAULT_MEMBER_ID}`;
        return apiRequest<Booking>(url, {
            method: 'POST',
            body: JSON.stringify(bookingData),
        });
    },

    // Update booking
    async updateBooking(id: string, bookingData: Partial<Booking>): Promise<Booking> {
        const url = `${API_ENDPOINTS.BOOKINGS.UPDATE(id)}?memberId=${DEFAULT_MEMBER_ID}`;
        return apiRequest<Booking>(url, {
            method: 'PUT',
            body: JSON.stringify(bookingData),
        });
    },

    // Delete booking
    async deleteBooking(id: string): Promise<void> {
        const url = `${API_ENDPOINTS.BOOKINGS.DELETE(id)}?memberId=${DEFAULT_MEMBER_ID}`;
        await apiRequest(url, {
            method: 'DELETE',
        });
    },
};

// Reservation API functions
export const reservationApi = {
    // Get reservations list
    async getReservations(): Promise<Booking[]> {
        const url = `${API_ENDPOINTS.RESERVATIONS.LIST}?memberId=${DEFAULT_MEMBER_ID}`;
        return apiRequest<Booking[]>(url);
    },

    // Create reservation
    async createReservation(reservationData: Partial<Booking>): Promise<Booking> {
        const url = `${API_ENDPOINTS.RESERVATIONS.CREATE}?memberId=${DEFAULT_MEMBER_ID}`;
        return apiRequest<Booking>(url, {
            method: 'POST',
            body: JSON.stringify(reservationData),
        });
    },

    // Update reservation
    async updateReservation(id: string, reservationData: Partial<Booking>): Promise<Booking> {
        const url = `${API_ENDPOINTS.RESERVATIONS.UPDATE(id)}?memberId=${DEFAULT_MEMBER_ID}`;
        return apiRequest<Booking>(url, {
            method: 'PUT',
            body: JSON.stringify(reservationData),
        });
    },

    // Delete reservation
    async deleteReservation(id: string): Promise<void> {
        const url = `${API_ENDPOINTS.RESERVATIONS.DELETE(id)}?memberId=${DEFAULT_MEMBER_ID}`;
        await apiRequest(url, {
            method: 'DELETE',
        });
    },
};

// Notification API functions
export const notificationApi = {
    // Get notifications
    async getNotifications(): Promise<Notification[]> {
        const url = `${API_ENDPOINTS.NOTIFICATIONS.LIST}?memberId=${DEFAULT_MEMBER_ID}`;
        return apiRequest<Notification[]>(url);
    },

    // Mark notification as read
    async markAsRead(id: string): Promise<void> {
        const url = `${API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id)}?memberId=${DEFAULT_MEMBER_ID}`;
        await apiRequest(url, {
            method: 'PUT',
        });
    },

    // Mark all notifications as read
    async markAllAsRead(): Promise<void> {
        const url = `${API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ}?memberId=${DEFAULT_MEMBER_ID}`;
        await apiRequest(url, {
            method: 'PUT',
        });
    },
}; 
