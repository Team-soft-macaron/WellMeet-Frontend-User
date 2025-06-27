export interface Restaurant {
  id: number;
  name: string;
  category: string;
  rating: number;
  price: string;
  distance: string;
  image: string;
}

export type TabType = 'home' | 'ai' | 'favorites' | 'mypage';

export interface TabItem {
  id: TabType;
  label: string;
}

export type AtmosphereType = '고급스러운' | '조용한' | '활기찬' | '클래식한' | '모던한' | '깔끔한' | '로맨틱한';

export interface RecommendFormData {
  withWhom: string;
  meetingType: string;
  atmosphere: AtmosphereType | '';
}