import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, SalonService, ProductCategory, ServiceCategory } from '../types';
import { formatINR } from '../utils/currency';
import {
  Layers,
  ShoppingBag,
  Calendar,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Sparkles,
  Search,
  Package,
  TrendingUp,
  Image,
  X,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    services,
    bookings,
    orders,
    heroBanners,
    addProduct,
    updateProduct,
    deleteProduct,
    addService,
    updateService,
    deleteService,
    updateBookingStatus,
    updateOrderStatus,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'services' | 'bookings' | 'orders' | 'banners'>('products');

  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    brand: "L'AURA Paris",
    category: 'Skincare' as ProductCategory,
    price: 65,
    originalPrice: 85,
    description: '',
    shortDescription: '',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800'],
    stockCount: 25,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
  });

  // Service modal state
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<SalonService | null>(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: 'Hair & Styling' as ServiceCategory,
    durationMinutes: 60,
    price: 120,
    originalPrice: 150,
    description: '',
    shortDescription: '',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    popular: true,
    benefits: ['Deep nourishment', 'Silk shine finish'],
  });

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0) +
    bookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.totalPrice : 0), 0);

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      brand: "L'AURA Paris",
      category: 'Skincare',
      price: 65,
      originalPrice: 85,
      description: 'Luminous botanical formulation designed for skin restoration and daily radiance.',
      shortDescription: 'Restorative peptide and botanical complex.',
      images: ['https://images.unsplash.com/photo-1608248597359-009139a03977?auto=format&fit=crop&q=80&w=800'],
      stockCount: 30,
      isFeatured: true,
      isNew: true,
      isBestSeller: false,
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      description: product.description,
      shortDescription: product.shortDescription || '',
      images: product.images,
      stockCount: product.stockCount,
      isFeatured: !!product.isFeatured,
      isNew: !!product.isNew,
      isBestSeller: !!product.isBestSeller,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
        inStock: productForm.stockCount > 0,
      });
      addToast('Product Updated', `Successfully updated "${productForm.name}"`);
    } else {
      addProduct({
        ...productForm,
        rating: 5.0,
        reviewCount: 1,
        inStock: true,
        ingredients: ['Bio-Cellular Peptides', 'Organic Rose Hydrosol', 'Botanical Squalane'],
        howToUse: ['Apply 2-3 drops morning and evening onto cleansed face and neck.'],
        benefits: ['Deep 48-hour hydration', 'Visible luminous glow', 'Firms skin barrier'],
        tags: ['New', 'CleanBeauty', 'Organic'],
      });
      addToast('Product Added', `Added "${productForm.name}" to the boutique catalogue.`);
    }
    setIsProductModalOpen(false);
  };

  const openNewServiceModal = () => {
    setEditingService(null);
    setServiceForm({
      name: '',
      category: 'Hair & Styling',
      durationMinutes: 60,
      price: 120,
      originalPrice: 150,
      description: 'Full bespoke salon treatment performed in our private suite with botanical infusions.',
      shortDescription: 'Signature salon experience tailored to your hair/skin profile.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
      popular: true,
      benefits: ['Custom formulated masque', 'Complimentary scalp massage'],
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService.id, serviceForm);
      addToast('Service Updated', `Updated "${serviceForm.name}"`);
    } else {
      addService({
        ...serviceForm,
        steps: ['Consultation', 'Treatment Execution', 'Finishing & Styling'],
      });
      addToast('Service Added', `Created new salon suite experience "${serviceForm.name}"`);
    }
    setIsServiceModalOpen(false);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.25em] text-[#88634B] uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              L'AURA Atelier Command Center
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1816] font-normal">
              Salon & Boutique Administration
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openNewProductModal}
              className="px-4 py-2.5 bg-[#26201D] hover:bg-[#88634B] text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
            <button
              onClick={openNewServiceModal}
              className="px-4 py-2.5 bg-[#88634B] hover:bg-[#72523E] text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </button>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-[#EFE8E1] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#7A6F68]">
              <span className="font-bold uppercase tracking-wider">Gross Turnover</span>
              <span className="font-bold text-[#88634B]">₹</span>
            </div>
            <span className="font-serif text-3xl text-[#1C1816] font-normal block">
              {formatINR(totalRevenue)}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.4% from last month
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EFE8E1] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#7A6F68]">
              <span className="font-bold uppercase tracking-wider">Salon Bookings</span>
              <Calendar className="w-4 h-4 text-[#88634B]" />
            </div>
            <span className="font-serif text-3xl text-[#1C1816] font-normal block">
              {bookings.length}
            </span>
            <span className="text-[11px] text-[#7A6F68]">
              {bookings.filter((b) => b.status === 'confirmed').length} Upcoming reservations
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EFE8E1] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#7A6F68]">
              <span className="font-bold uppercase tracking-wider">Boutique Orders</span>
              <Package className="w-4 h-4 text-[#88634B]" />
            </div>
            <span className="font-serif text-3xl text-[#1C1816] font-normal block">
              {orders.length}
            </span>
            <span className="text-[11px] text-[#7A6F68]">
              {orders.filter((o) => o.status === 'Processing' || o.status === 'Confirmed').length} Active fulfillments
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EFE8E1] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#7A6F68]">
              <span className="font-bold uppercase tracking-wider">Catalog Inventory</span>
              <ShoppingBag className="w-4 h-4 text-[#88634B]" />
            </div>
            <span className="font-serif text-3xl text-[#1C1816] font-normal block">
              {products.length} Items
            </span>
            <span className="text-[11px] text-[#7A6F68]">
              Across {services.length} Salon Treatment Experiences
            </span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#EFE8E1] gap-2 sm:gap-6 overflow-x-auto pb-2">
          {[
            { id: 'products', label: `Products Catalog (${products.length})` },
            { id: 'services', label: `Salon Rituals (${services.length})` },
            { id: 'bookings', label: `Bookings (${bookings.length})` },
            { id: 'orders', label: `Store Orders (${orders.length})` },
            { id: 'banners', label: `Hero & Banners (${heroBanners.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#26201D] text-white shadow-sm'
                  : 'text-[#5E5651] hover:text-[#1C1816] hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PRODUCTS TABLE */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-[#EFE8E1] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#F3EFEA] flex justify-between items-center">
              <h2 className="font-serif text-2xl text-[#1C1816]">Boutique Products Management</h2>
              <button
                onClick={openNewProductModal}
                className="px-4 py-2 bg-[#88634B] text-white text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add New Item
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-[#EFE8E1] text-[#7A6F68] uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4 pl-6">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EFEA]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover bg-[#FAF8F5]"
                          />
                          <div>
                            <span className="text-[10px] text-[#88634B] font-bold uppercase">{p.brand}</span>
                            <p className="font-serif text-sm font-semibold text-[#1C1816]">{p.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-[#4A392F]">{p.category}</td>
                      <td className="p-4 font-bold text-[#1C1816]">{formatINR(p.price)}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.stockCount > 5
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {p.stockCount} units
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-[#1C1816]">★ {p.rating}</td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        <button
                          onClick={() => openEditProductModal(p)}
                          className="p-2 text-[#88634B] hover:bg-[#FAF8F5] rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES TABLE */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-3xl border border-[#EFE8E1] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#F3EFEA] flex justify-between items-center">
              <h2 className="font-serif text-2xl text-[#1C1816]">Salon Experiences & Suite Rituals</h2>
              <button
                onClick={openNewServiceModal}
                className="px-4 py-2 bg-[#88634B] text-white text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add New Service
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-[#EFE8E1] text-[#7A6F68] uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4 pl-6">Service</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EFEA]">
                  {services.map((s) => (
                    <tr key={s.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={s.image}
                            alt={s.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <p className="font-serif text-sm font-semibold text-[#1C1816]">{s.name}</p>
                            <span className="text-[10px] text-[#7A6F68]">{s.shortDescription}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-[#4A392F]">{s.category}</td>
                      <td className="p-4 font-semibold text-[#1C1816]">{s.durationMinutes} mins</td>
                      <td className="p-4 font-bold text-[#1C1816]">{formatINR(s.price)}</td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        <button
                          onClick={() => deleteService(s.id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl border border-[#EFE8E1] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#F3EFEA]">
              <h2 className="font-serif text-2xl text-[#1C1816]">Client Reservations</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-[#EFE8E1] text-[#7A6F68] uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4 pl-6">Booking ID & Patron</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Stylist</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EFEA]">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="p-4 pl-6">
                        <span className="font-mono font-bold text-[#88634B]">{b.id}</span>
                        <p className="font-bold text-[#1C1816] mt-0.5">{b.customerName}</p>
                        <span className="text-[10px] text-[#7A6F68]">{b.customerPhone}</span>
                      </td>
                      <td className="p-4 font-semibold text-[#1C1816]">{b.service.name}</td>
                      <td className="p-4 text-[#4A392F]">
                        {b.date} • {b.timeSlot}
                      </td>
                      <td className="p-4 font-medium text-[#2D2825]">
                        {b.stylist?.name || 'Any Stylist'}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-800'
                              : b.status === 'completed'
                              ? 'bg-[#F5ECE5] text-[#88634B]'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                          className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#DAC9BD] rounded-lg text-xs font-semibold text-[#1C1816]"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-[#EFE8E1] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#F3EFEA]">
              <h2 className="font-serif text-2xl text-[#1C1816]">Boutique Order Fulfillments</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-[#EFE8E1] text-[#7A6F68] uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4 pl-6">Order ID & Date</th>
                    <th className="p-4">Recipient</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EFEA]">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="p-4 pl-6">
                        <span className="font-mono font-bold text-[#1C1816]">{o.id}</span>
                        <span className="text-[10px] text-[#7A6F68] block mt-0.5">{o.createdAt}</span>
                      </td>
                      <td className="p-4">
                        <strong className="text-[#1C1816] block">{o.shippingAddress.fullName}</strong>
                        <span className="text-[10px] text-[#7A6F68]">{o.shippingAddress.city}, {o.shippingAddress.country}</span>
                      </td>
                      <td className="p-4 text-[#4A392F]">
                        {o.items.length} items ({o.items.map((i) => i.product.name).join(', ').slice(0, 30)}...)
                      </td>
                      <td className="p-4 font-bold text-[#1C1816]">{formatINR(o.total)}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#26201D] text-[#ECC8AF]">
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                          className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#DAC9BD] rounded-lg text-xs font-semibold text-[#1C1816]"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: BANNERS */}
        {activeTab === 'banners' && (
          <div className="bg-white rounded-3xl p-8 border border-[#EFE8E1] shadow-sm space-y-6">
            <h2 className="font-serif text-2xl text-[#1C1816]">Hero Slider & Promotional Banners</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {heroBanners.map((banner) => (
                <div
                  key={banner.id}
                  className="rounded-2xl border border-[#EFE8E1] overflow-hidden space-y-3 bg-[#FAF8F5] pb-4"
                >
                  <img src={banner.image} alt={banner.title} className="w-full h-40 object-cover" />
                  <div className="px-4 space-y-1">
                    <span className="text-[10px] text-[#88634B] uppercase font-bold">{banner.tagline}</span>
                    <h3 className="font-serif text-base font-bold text-[#1C1816]">{banner.title}</h3>
                    <p className="text-[11px] text-[#7A6F68]">{banner.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#EFE8E1] shadow-2xl relative">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#7A6F68] hover:text-[#1C1816]"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl text-[#1C1816] mb-4">
              {editingProduct ? 'Edit Catalog Formulation' : 'Create New Boutique Product'}
            </h2>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-[#2D2825] mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-[#DAC9BD] rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[#2D2825] mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({ ...productForm, category: e.target.value as ProductCategory })
                    }
                    className="w-full px-3.5 py-2 border border-[#DAC9BD] rounded-xl bg-white"
                  >
                    <option value="Skincare">Skincare</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Fragrances">Fragrances</option>
                    <option value="Body Care">Body Care</option>
                    <option value="Nail Care">Nail Care</option>
                    <option value="Men's Grooming">Men's Grooming</option>
                    <option value="Beauty Tools">Beauty Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#2D2825] mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 border border-[#DAC9BD] rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[#2D2825] mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) =>
                      setProductForm({ ...productForm, originalPrice: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 border border-[#DAC9BD] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#2D2825] mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={productForm.stockCount}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stockCount: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 border border-[#DAC9BD] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-[#2D2825] mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={productForm.images[0]}
                  onChange={(e) =>
                    setProductForm({ ...productForm, images: [e.target.value] })
                  }
                  className="w-full px-3.5 py-2 border border-[#DAC9BD] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-[#2D2825] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 border border-[#DAC9BD] rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#F3EFEA]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-[#DAC9BD] rounded-xl text-[#5E5651]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#26201D] text-white font-bold rounded-xl uppercase tracking-wider"
                >
                  Save Formulation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Add/Edit Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#EFE8E1] shadow-2xl relative">
            <button
              onClick={() => setIsServiceModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#7A6F68] hover:text-[#1C1816]"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl text-[#1C1816] mb-4">
              Add New Salon Treatment Service
            </h2>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-[#2D2825] mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 24K Liquid Gold Facial"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-[#DAC9BD] rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[#2D2825] mb-1">Category</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, category: e.target.value as ServiceCategory })
                    }
                    className="w-full px-3.5 py-2 border border-[#DAC9BD] rounded-xl bg-white"
                  >
                    <option value="Hair & Styling">Hair & Styling</option>
                    <option value="Skin & Facials">Skin & Facials</option>
                    <option value="Bridal & Makeup">Bridal & Makeup</option>
                    <option value="Spa & Wellness">Spa & Wellness</option>
                    <option value="Nails & Hands">Nails & Hands</option>
                    <option value="Men's Grooming">Men's Grooming</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#2D2825] mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    required
                    value={serviceForm.durationMinutes}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, durationMinutes: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 border border-[#DAC9BD] rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[#2D2825] mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={serviceForm.price}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, price: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 border border-[#DAC9BD] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#2D2825] mb-1">Image URL</label>
                  <input
                    type="url"
                    required
                    value={serviceForm.image}
                    onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                    className="w-full px-3.5 py-2 border border-[#DAC9BD] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-[#2D2825] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 border border-[#DAC9BD] rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#F3EFEA]">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 border border-[#DAC9BD] rounded-xl text-[#5E5651]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#88634B] text-white font-bold rounded-xl uppercase tracking-wider"
                >
                  Save Service Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
