import type { Restaurant } from '../types';

export const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: '스시로',
    category: '일식',
    rating: 4.8,
    price: '$$$',
    distance: '0.3km',
    image: '🍣'
  },
  {
    id: 2,
    name: '파스타 하우스',
    category: '이탈리안',
    rating: 4.5,
    price: '$$',
    distance: '0.5km',
    image: '🍝'
  },
  {
    id: 3,
    name: '한우 스테이크',
    category: '한식',
    rating: 4.7,
    price: '$$$$',
    distance: '0.8km',
    image: '🥩'
  },
  {
    id: 4,
    name: '타코 벨',
    category: '멕시칸',
    rating: 4.2,
    price: '$',
    distance: '0.2km',
    image: '🌮'
  },
  {
    id: 5,
    name: '중국집',
    category: '중식',
    rating: 4.4,
    price: '$$',
    distance: '0.6km',
    image: '🥢'
  },
  {
    id: 6,
    name: '카페 드 파리',
    category: '카페',
    rating: 4.6,
    price: '$$',
    distance: '0.4km',
    image: '☕'
  }
];