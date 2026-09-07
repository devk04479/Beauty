export type ProductCategory =
  | 'Skincare'
  | 'Hair Care'
  | 'Makeup'
  | 'Fragrances'
  | 'Body Care'
  | 'Nail Care'
  | "Men's Grooming"
  | 'Beauty Tools'
  | 'Salon Essentials';

export type ServiceCategory =
  | 'Hair & Styling'
  | 'Skin & Facials'
  | 'Bridal & Makeup'
  | 'Nails & Hands'
  | 'Spa & Wellness'
  | "Men's Grooming";

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase?: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  images: string[];
  description: string;
  shortDescription: string;
  ingredients: string[];
  howToUse: string[];
  benefits: string[];
  reviews: Review[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  tags: string[];
}

export interface SalonService {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  durationMinutes: number;
  image: string;
  benefits: string[];
  suitableFor: string;
  popular?: boolean;
  assignedStylistIds?: string[];
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  title: string;
  experienceYears: number;
  specialization: string[];
  bio: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  instagramHandle?: string;
  availableDays: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BookingAddon {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
}

export interface AppointmentBooking {
  id: string;
  bookingCode: string;
  service: SalonService;
  stylist?: Stylist;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialInstructions?: string;
  addons: BookingAddon[];
  totalPrice: number;
  paymentMethod: 'salon' | 'online';
  paymentStatus: 'pending' | 'paid';
  status: 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  createdAt: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  priceAtPurchase: number;
}

export type OrderStatus = 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface OrderTrackingStep {
  status: OrderStatus;
  date: string;
  description: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  couponCode?: string;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'card' | 'upi' | 'wallet' | 'cod' | 'netbanking';
  paymentStatus: 'paid' | 'pending';
  status: OrderStatus;
  trackingHistory: OrderTrackingStep[];
  createdAt: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'customer' | 'admin';
  loyaltyPoints: number;
  membershipTier: 'Bronze' | 'Silver' | 'Gold' | 'VIP Platinum';
  addresses: {
    id: string;
    label: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }[];
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  description: string;
  expiryDate: string;
  usageCount: number;
  maxUsage?: number;
  isActive: boolean;
}

export interface HeroBanner {
  id: string;
  tagline: string;
  title: string;
  subtitle: string;
  image: string;
  primaryCtaText: string;
  primaryCtaAction: 'shop' | 'book' | 'offers' | 'services';
  secondaryCtaText?: string;
  secondaryCtaAction?: 'shop' | 'book' | 'offers' | 'services';
  badge?: string;
  active: boolean;
}

export interface BeforeAfterShowcase {
  id: string;
  title: string;
  category: string;
  description: string;
  stylistName: string;
  beforeImage: string;
  afterImage: string;
  duration: string;
  treatmentName: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Skincare Tips' | 'Hair Care Tips' | 'Makeup Tutorials' | 'Beauty Trends' | 'Salon Advice';
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  serviceName?: string;
}

export interface ProductFilters {
  searchQuery: string;
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular';
}

export type ActiveView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'product-details'
  | 'services'
  | 'booking'
  | 'offers'
  | 'transformations'
  | 'team'
  | 'blog'
  | 'blog-post'
  | 'about'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'dashboard'
  | 'admin'
  | 'auth';
