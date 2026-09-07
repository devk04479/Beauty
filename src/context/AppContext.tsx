import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  SalonService,
  Stylist,
  CartItem,
  AppointmentBooking,
  Order,
  UserProfile,
  Coupon,
  HeroBanner,
  BeforeAfterShowcase,
  BlogPost,
  Testimonial,
  ActiveView,
  Review,
  OrderStatus,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_SERVICES,
  INITIAL_STYLISTS,
  INITIAL_HERO_BANNERS,
  INITIAL_BEFORE_AFTERS,
  INITIAL_BLOG_POSTS,
  INITIAL_TESTIMONIALS,
  INITIAL_COUPONS,
} from '../data/initialData';

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // State
  products: Product[];
  services: SalonService[];
  stylists: Stylist[];
  banners: HeroBanner[];
  heroBanners: HeroBanner[];
  beforeAfterItems: BeforeAfterShowcase[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  coupons: Coupon[];
  cart: CartItem[];
  wishlist: string[];
  bookings: AppointmentBooking[];
  orders: Order[];
  currentUser: UserProfile | null;
  appliedCoupon: Coupon | null;
  activeView: ActiveView;
  selectedProductId: string | null;
  selectedBlogPostId: string | null;
  selectedServiceForBooking: SalonService | null;
  selectedStylistForBooking: Stylist | null;
  quickViewProduct: Product | null;
  isCartOpen: boolean;
  isAuthModalOpen: boolean;
  isQuizModalOpen: boolean;
  toasts: Toast[];

  // Navigation
  setActiveView: (view: ActiveView) => void;
  navigateToProduct: (productId: string) => void;
  navigateToBlogPost: (blogId: string) => void;
  startBookingFlow: (service?: SalonService, stylist?: Stylist) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsQuizModalOpen: (open: boolean) => void;

  // Cart & Wishlist
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string) => void;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCouponCode: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryFee: number;
  cartTax: number;
  cartTotal: number;
  cartItemCount: number;

  // Bookings
  createBooking: (bookingData: Omit<AppointmentBooking, 'id' | 'bookingCode' | 'createdAt'>) => string;
  cancelBooking: (bookingId: string) => void;
  updateBookingStatus: (bookingId: string, status: AppointmentBooking['status']) => void;

  // Orders
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingHistory'>) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string) => void;

  // Reviews
  addProductReview: (productId: string, rating: number, comment: string, author: string) => void;

  // Auth
  login: (email: string, name?: string, role?: 'customer' | 'admin') => void;
  signup: (
    name: string,
    email: string,
    phone?: string,
    role?: 'customer' | 'admin',
    password?: string
  ) => void;
  logout: () => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Admin Management
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => void;
  updateProduct: (productOrId: Product | string, update?: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  addService: (service: Omit<SalonService, 'id'>) => void;
  updateService: (serviceOrId: SalonService | string, update?: Partial<SalonService>) => void;
  deleteService: (serviceId: string) => void;
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  deleteCoupon: (couponId: string) => void;
  updateBanner: (banner: HeroBanner) => void;

  // Toasts
  addToast: (title: string, message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: 'usr-1',
  name: 'Lady Genevieve',
  email: 'genevieve@laura-beaute.com',
  phone: '+1 (555) 234-8900',
  role: 'customer',
  loyaltyPoints: 340,
  membershipTier: 'Gold',
  addresses: [
    {
      id: 'addr-1',
      label: 'Primary Residence',
      street: '742 Evergreen Terrace, Suite 4B',
      city: 'Beverly Hills',
      state: 'CA',
      postalCode: '90210',
      country: 'United States',
      isDefault: true,
    },
  ],
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products, Services, Stylists, Banners, Coupons with localStorage backup
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('laura_products_inr_v1');
      if (saved) {
        return JSON.parse(saved);
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [services, setServices] = useState<SalonService[]>(() => {
    try {
      const saved = localStorage.getItem('laura_services_inr_v1');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [stylists, setStylists] = useState<Stylist[]>(() => {
    const saved = localStorage.getItem('laura_stylists');
    return saved ? JSON.parse(saved) : INITIAL_STYLISTS;
  });

  const [banners, setBanners] = useState<HeroBanner[]>(() => {
    try {
      const saved = localStorage.getItem('laura_banners_v4');
      if (saved) {
        return JSON.parse(saved);
      }
      return INITIAL_HERO_BANNERS;
    } catch {
      return INITIAL_HERO_BANNERS;
    }
  });

  const [beforeAfterItems, setBeforeAfterItems] = useState<BeforeAfterShowcase[]>(() => {
    try {
      const saved = localStorage.getItem('laura_before_after');
      return saved ? JSON.parse(saved) : INITIAL_BEFORE_AFTERS;
    } catch {
      return INITIAL_BEFORE_AFTERS;
    }
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('laura_blog_posts');
      return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
    } catch {
      return INITIAL_BLOG_POSTS;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('laura_testimonials');
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('laura_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('laura_cart');
    return saved ? JSON.parse(saved) : [
      { product: INITIAL_PRODUCTS[0], quantity: 1 },
      { product: INITIAL_PRODUCTS[3], quantity: 1 },
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('laura_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-4', 'prod-7'];
  });

  const [bookings, setBookings] = useState<AppointmentBooking[]>(() => {
    const saved = localStorage.getItem('laura_bookings');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'bk-1',
            bookingCode: 'LRA-8492',
            service: INITIAL_SERVICES[0],
            stylist: INITIAL_STYLISTS[0],
            date: '2026-09-05',
            timeSlot: '11:00 AM',
            customerName: 'Lady Genevieve',
            customerEmail: 'genevieve@laura-beaute.com',
            customerPhone: '+1 (555) 234-8900',
            specialInstructions: 'Please prepare the caviar hair mask and light champagne.',
            addons: [
              {
                id: 'add-1',
                name: 'Scalp Massage & Caviar Ampoule (+15 mins)',
                price: 25,
                durationMinutes: 15,
              },
            ],
            totalPrice: 210,
            paymentMethod: 'online',
            paymentStatus: 'paid',
            status: 'confirmed',
            createdAt: '2026-08-20T14:32:00Z',
          },
        ];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('laura_orders');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'ord-101',
            orderNumber: 'LRA-ORD-9024',
            items: [
              { product: INITIAL_PRODUCTS[0], quantity: 1, priceAtPurchase: 68 },
              { product: INITIAL_PRODUCTS[2], quantity: 2, priceAtPurchase: 34 },
            ],
            subtotal: 136,
            discount: 27.2,
            deliveryFee: 0,
            tax: 8.7,
            total: 117.5,
            couponCode: 'LAURA20',
            shippingAddress: {
              fullName: 'Lady Genevieve',
              email: 'genevieve@laura-beaute.com',
              phone: '+1 (555) 234-8900',
              street: '742 Evergreen Terrace, Suite 4B',
              city: 'Beverly Hills',
              state: 'CA',
              postalCode: '90210',
              country: 'United States',
            },
            paymentMethod: 'card',
            paymentStatus: 'paid',
            status: 'Shipped',
            trackingHistory: [
              { status: 'Confirmed', date: '2026-08-22 09:30 AM', description: 'Order verified and packed at Paris Atelier', completed: true },
              { status: 'Processing', date: '2026-08-22 02:15 PM', description: 'Quality inspection & boutique gift packaging completed', completed: true },
              { status: 'Shipped', date: '2026-08-23 10:00 AM', description: 'Handed to express luxury courier (Airway #FR-9042)', completed: true },
              { status: 'Out for Delivery', date: '2026-08-27 (Estimated)', description: 'Scheduled for concierge courier delivery', completed: false },
              { status: 'Delivered', date: 'Pending', description: 'Package signed and delivered', completed: false },
            ],
            createdAt: '2026-08-22T09:30:00Z',
            estimatedDelivery: 'August 27, 2026',
          },
        ];
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('laura_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<SalonService | null>(null);
  const [selectedStylistForBooking, setSelectedStylistForBooking] = useState<Stylist | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('laura_products_inr_v1', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('laura_services_inr_v1', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('laura_stylists', JSON.stringify(stylists));
  }, [stylists]);

  useEffect(() => {
    localStorage.setItem('laura_banners_v4', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('laura_coupons_inr_v1', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('laura_cart_inr_v1', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('laura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('laura_bookings_inr_v1', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('laura_orders_inr_v1', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('laura_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('laura_user');
    }
  }, [currentUser]);

  // Toast System
  const addToast = (title: string, message: string, type: Toast['type'] = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation helpers
  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBlogPost = (blogId: string) => {
    setSelectedBlogPostId(blogId);
    setActiveView('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startBookingFlow = (service?: SalonService, stylist?: Stylist) => {
    if (service) setSelectedServiceForBooking(service);
    if (stylist) setSelectedStylistForBooking(stylist);
    setActiveView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast('Added to Vanity Bag', `${product.name} (x${quantity}) was added.`);
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      addToast('Item Removed', `${item.product.name} removed from your bag.`, 'info');
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', product ? `${product.name} removed.` : 'Item removed.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to Wishlist', product ? `${product.name} saved to your favorites.` : 'Item added.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, 1);
      setWishlist((prev) => prev.filter((id) => id !== productId));
    }
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const cartDiscount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? (cartSubtotal * appliedCoupon.discountValue) / 100
      : Math.min(cartSubtotal, appliedCoupon.discountValue)
    : 0;

  // Free delivery for orders over ₹1,499
  const cartDeliveryFee = cartSubtotal >= 1499 || cartSubtotal === 0 ? 0 : 149;
  const cartTax = Math.round((cartSubtotal - cartDiscount) * 0.05);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryFee + cartTax);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const applyCouponCode = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === clean && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired promotional code.' };
    }
    if (found.minOrderValue && cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `This coupon requires a minimum subtotal of ₹${found.minOrderValue.toLocaleString('en-IN')}.`,
      };
    }
    setAppliedCoupon(found);
    addToast('Promo Code Applied', `${found.code} applied to your vanity bag!`);
    return { success: true, message: `Promo code applied successfully!` };
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
    addToast('Coupon Removed', 'Promotional code has been removed.', 'info');
  };

  // Booking Flow
  const createBooking = (
    bookingData: Omit<AppointmentBooking, 'id' | 'bookingCode' | 'createdAt'>
  ): string => {
    const bookingCode = `LRA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: AppointmentBooking = {
      ...bookingData,
      id: 'bk-' + Date.now(),
      bookingCode,
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);

    // Give loyalty points
    if (currentUser) {
      const earnedPoints = Math.round(newBooking.totalPrice * 2);
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              loyaltyPoints: prev.loyaltyPoints + earnedPoints,
            }
          : null
      );
    }

    addToast(
      'Appointment Confirmed!',
      `Booking ${bookingCode} has been scheduled for ${newBooking.date} at ${newBooking.timeSlot}.`,
      'success'
    );
    return newBooking.id;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
    addToast('Booking Cancelled', 'Your salon appointment has been cancelled.', 'info');
  };

  const updateBookingStatus = (bookingId: string, status: AppointmentBooking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
    addToast('Status Updated', `Booking status changed to ${status}.`, 'info');
  };

  // Order Flow
  const createOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingHistory'>
  ): string => {
    const orderNumber = `LRA-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      orderNumber,
      trackingHistory: [
        {
          status: 'Confirmed',
          date: new Date().toLocaleString(),
          description: 'Payment authorized and order sent to boutique fulfillment team.',
          completed: true,
        },
        {
          status: 'Processing',
          date: 'In Progress',
          description: 'Artisan gift packing and beauty box preparation.',
          completed: false,
        },
        {
          status: 'Shipped',
          date: 'Pending',
          description: 'Dispatched with insured courier delivery.',
          completed: false,
        },
        {
          status: 'Out for Delivery',
          date: 'Pending',
          description: 'Assigned to concierge driver for direct delivery.',
          completed: false,
        },
        {
          status: 'Delivered',
          date: 'Pending',
          description: 'Delivered and confirmed by recipient.',
          completed: false,
        },
      ],
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Loyalty points
    if (currentUser) {
      const earned = Math.round(newOrder.total * 1.5);
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              loyaltyPoints: prev.loyaltyPoints + earned,
            }
          : null
      );
    }

    addToast('Order Placed Successfully!', `Order ${orderNumber} is confirmed and packing.`, 'success');
    return newOrder.id;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const history = (ord.trackingHistory || []).map((step) => {
          if (step.status === status) {
            return { ...step, completed: true, date: new Date().toLocaleString() };
          }
          return step;
        });
        return { ...ord, status, trackingHistory: history };
      })
    );
    addToast('Order Status Updated', `Order status updated to ${status}.`, 'info');
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return { ...ord, status: 'Cancelled' as OrderStatus };
      })
    );
    addToast('Order Cancelled', 'Your order cancellation has been recorded.', 'info');
  };

  // Product Reviews
  const addProductReview = (
    productId: string,
    rating: number,
    comment: string,
    author: string
  ) => {
    const newReview: Review = {
      id: 'rev-' + Date.now(),
      author: author || 'Anonymous Client',
      rating,
      date: new Date().toISOString().split('T')[0],
      comment,
      verifiedPurchase: true,
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const updatedReviews = [newReview, ...(p.reviews || [])];
        const newRating = Number(
          (
            updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length
          ).toFixed(1)
        );
        return {
          ...p,
          reviews: updatedReviews,
          rating: newRating,
          reviewCount: updatedReviews.length,
        };
      })
    );

    addToast('Review Submitted', 'Thank you for sharing your beauty experience!', 'success');
  };

  // Authentication
  const login = (email: string, name = 'Lady Genevieve', role: 'customer' | 'admin' = 'customer') => {
    const user: UserProfile = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone: '+1 (555) 839-2041',
      role,
      loyaltyPoints: role === 'admin' ? 9999 : 500,
      membershipTier: role === 'admin' ? 'VIP Platinum' : 'Gold',
      addresses: DEMO_USER.addresses,
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    addToast('Welcome Back', `Signed in as ${user.name} (${user.role.toUpperCase()})`);
  };

  const signup = (
    name: string,
    email: string,
    phone = '+1 (555) 349-8120',
    role: 'customer' | 'admin' = 'customer',
    _password?: string
  ) => {
    const user: UserProfile = {
      id: 'usr-' + Date.now(),
      name: name.trim() || 'New Member',
      email: email.trim().toLowerCase(),
      phone: phone.trim() || '+1 (555) 000-0000',
      role,
      loyaltyPoints: role === 'admin' ? 9999 : 250,
      membershipTier: role === 'admin' ? 'VIP Platinum' : 'Bronze',
      addresses: [],
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    addToast(
      'Welcome to L\'AURA Privé!',
      `Account created for ${user.name}! 250 bonus loyalty points credited.`,
      'success'
    );
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('Signed Out', 'You have been safely logged out.', 'info');
  };

  const updateUserProfile = (profileUpdate: Partial<UserProfile>) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...profileUpdate } : null));
    addToast('Profile Updated', 'Your beauty profile preferences have been saved.');
  };

  // Admin Management
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'prod-' + Date.now(),
      rating: 5.0,
      reviewCount: 1,
      reviews: [
        {
          id: 'rev-init',
          author: 'L\'AURA Quality Atelier',
          rating: 5,
          date: new Date().toISOString().split('T')[0],
          comment: 'Official formulation test certified pure and effective.',
          verifiedPurchase: true,
        },
      ],
    };
    setProducts((prev) => [newProduct, ...prev]);
    addToast('Product Added', `${newProduct.name} is now live in the catalog.`);
  };

  const updateProduct = (productOrId: Product | string, update?: Partial<Product>) => {
    if (typeof productOrId === 'string') {
      setProducts((prev) =>
        prev.map((p) => (p.id === productOrId ? { ...p, ...(update || {}) } : p))
      );
      addToast('Product Updated', 'Product details saved.');
    } else {
      setProducts((prev) => prev.map((p) => (p.id === productOrId.id ? productOrId : p)));
      addToast('Product Updated', `${productOrId.name} has been updated.`);
    }
  };

  const deleteProduct = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    addToast('Product Removed', target ? `${target.name} deleted.` : 'Product removed.', 'warning');
  };

  const addService = (serviceData: Omit<SalonService, 'id'>) => {
    const newService: SalonService = {
      ...serviceData,
      id: 'srv-' + Date.now(),
    };
    setServices((prev) => [newService, ...prev]);
    addToast('Salon Service Added', `${newService.name} is now open for bookings.`);
  };

  const updateService = (serviceOrId: SalonService | string, update?: Partial<SalonService>) => {
    if (typeof serviceOrId === 'string') {
      setServices((prev) =>
        prev.map((s) => (s.id === serviceOrId ? { ...s, ...(update || {}) } : s))
      );
      addToast('Service Updated', 'Salon service details saved.');
    } else {
      setServices((prev) => prev.map((s) => (s.id === serviceOrId.id ? serviceOrId : s)));
      addToast('Service Updated', `${serviceOrId.name} details saved.`);
    }
  };

  const deleteService = (serviceId: string) => {
    const target = services.find((s) => s.id === serviceId);
    setServices((prev) => prev.filter((s) => s.id !== serviceId));
    addToast('Service Deleted', target ? `${target.name} removed.` : 'Service removed.', 'warning');
  };

  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usageCount'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: 'coup-' + Date.now(),
      usageCount: 0,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    addToast('Coupon Created', `Promo code ${newCoupon.code} is active!`);
  };

  const deleteCoupon = (couponId: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== couponId));
    addToast('Coupon Removed', 'Promo code deactivated.', 'info');
  };

  const updateBanner = (updated: HeroBanner) => {
    setBanners((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    addToast('Banner Updated', 'Promotional hero banner saved.');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        services,
        stylists,
        banners,
        heroBanners: banners,
        beforeAfterItems,
        blogPosts,
        testimonials,
        coupons,
        cart,
        wishlist,
        bookings,
        orders,
        currentUser,
        appliedCoupon,
        activeView,
        selectedProductId,
        selectedBlogPostId,
        selectedServiceForBooking,
        selectedStylistForBooking,
        quickViewProduct,
        isCartOpen,
        isAuthModalOpen,
        isQuizModalOpen,
        toasts,

        setActiveView,
        navigateToProduct,
        navigateToBlogPost,
        startBookingFlow,
        setQuickViewProduct,
        setIsCartOpen,
        setIsAuthModalOpen,
        setIsQuizModalOpen,

        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        applyCouponCode,
        removeCouponCode,
        cartSubtotal,
        cartDiscount,
        cartDeliveryFee,
        cartTax,
        cartTotal,
        cartItemCount,

        createBooking,
        cancelBooking,
        updateBookingStatus,

        createOrder,
        updateOrderStatus,
        cancelOrder,

        addProductReview,

        login,
        signup,
        logout,
        updateUserProfile,

        addProduct,
        updateProduct,
        deleteProduct,
        addService,
        updateService,
        deleteService,
        addCoupon,
        deleteCoupon,
        updateBanner,

        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
