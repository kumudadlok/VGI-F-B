export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'cakes' | 'cookies' | 'bespoke';
  price: number;
  image: string;
  rating: number;
  reviewsCount: number;
  tags: string[];
  options?: {
    sizes?: string[];
    flavors?: string[];
    icings?: string[];
  };
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  avatar?: string;
  category: string;
}

export interface CartItem {
  id: string; // unique cart item id (e.g., id + size + flavor)
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: string;
  selectedFlavor?: string;
  selectedIcing?: string;
  decorationText?: string;
  specialRequests?: string;
}

export interface CustomInquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: string;
  guestCount: number;
  cakeType: 'birthday' | 'wedding' | 'anniversary' | 'corporate' | 'other';
  tiers: number;
  shape: 'round' | 'square' | 'heart' | 'sculpted';
  flavor: string;
  icing: string;
  description: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'approved';
  createdAt: string;
}

export type OrderStatus = 'placed' | 'baking' | 'decorating' | 'out_for_delivery' | 'delivered';

export interface OrderTimelineEvent {
  status: OrderStatus;
  title: string;
  description: string;
  completed: boolean;
  time?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  payment: {
    cardBrand: string;
    last4: string;
    transactionId: string;
  };
  status: OrderStatus;
  estimatedDelivery: string;
  timeline: OrderTimelineEvent[];
  createdAt: string;
}
