export type ScreenType = 
  | 'home' 
  | 'shop-drops' 
  | 'product-spotlight' 
  | 'x-club-community' 
  | 'taste-lab' 
  | 'about';

export interface Product {
  id: string;
  name: string;
  series: string;
  price: number;
  subPrice?: number;
  servings: number | string;
  protein?: string;
  cals?: string;
  sugar?: string;
  caffeine?: string;
  citrulline?: string;
  creapure?: string;
  specBadge?: string;
  tag?: string;
  tagRotate?: string;
  tagColor?: 'primary' | 'secondary' | 'neutral' | 'accent';
  claimedPercent?: string;
  image: string;
  alt: string;
  description: string;
  category: 'whey-isolate' | 'pre-workout' | 'creatine' | 'hydration' | 'merch';
  specs?: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  flavor: string;
  size: string;
  isSubscription: boolean;
  price: number;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  niche: string;
  code: string;
  tagline: string;
  favoriteStack: string;
  image: string;
  category: 'powerlifting' | 'hybrid' | 'mobility' | 'core';
}

export interface DropEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  badge: string;
  badgeColor: string;
  badgeRotate: string;
  description: string;
  waitlistCount: number;
  capacity: number;
  soldPercent: number;
  exclusive?: string;
}

export interface Soundtrack {
  id: string;
  title: string;
  genre: string;
  bpm: string;
  duration: string;
  description: string;
  coverImage: string;
  badgeColor: string;
  audioTrackTitle: string;
  artist: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  flavor: string;
  rating: number;
  title: string;
  content: string;
  userImage?: string;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  id: string;
  name: string;
  flavor: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderTimelineStep {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  carrier?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  shippingAddress: string;
  timeline: OrderTimelineStep[];
}
